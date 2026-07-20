import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUserAlt, FaLock, FaTools } from "react-icons/fa";
import api from "../services/api";
import ToastMensagem from "./ToastMensagem";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erros, setErros] = useState({});
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [toast, setToast] = useState({ mostrar: false, mensagem: "", tipo: "" });
    const navigate = useNavigate();

    function exibirToast(mensagem, tipo) {
        setToast({ mostrar: true, mensagem, tipo });
        setTimeout(() => setToast({ mostrar: false, mensagem: "", tipo: "" }), 3000);
    }

    function validar() {
        const novosErros = {};

        if (!email.trim())
            novosErros.email = "O e-mail é obrigatório.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            novosErros.email = "Informe um e-mail válido.";

        if (!senha.trim())
            novosErros.senha = "A senha é obrigatória.";
        else if (senha.length < 6)
            novosErros.senha = "A senha deve ter pelo menos 6 caracteres.";

        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!validar()) return;

        setCarregando(true);
        try {
            const resposta = await api.post("/auth/login", { email, senha });
            localStorage.setItem("token", resposta.data.token);
            exibirToast("Login realizado com sucesso!", "success");
            setTimeout(() => navigate("/painel"), 1000);
        } catch (err) {
            exibirToast("Email ou senha inválidos.", "danger");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <>
            <ToastMensagem mostrar={toast.mostrar} mensagem={toast.mensagem} tipo={toast.tipo} />

            {/* Início do Card de Vidro (flutuando sobre o fundo principal) */}
            <div className="login-glass-card mx-auto w-100" style={{ maxWidth: "420px" }}>
                
                {/* Logo e Título (Trouxemos o título de fora para dentro do card) */}
                <div className="mb-4 text-center">
                    <FaTools style={{ fontSize: "2.5rem", color: "#05BBD0", marginBottom: "10px" }} />
                    <h2 className="fw-bold text-white mb-0 text-glow">DeskFlow</h2>
                    <p className="text-light opacity-75 mt-1" style={{ fontSize: "0.9rem" }}>Acesse sua conta para continuar</p>
                </div>

                <form onSubmit={handleSubmit}>

                    {/* Campo E-mail */}
                    <div className="mb-4 text-start">
                        <label htmlFor="email" className="form-label text-light fw-bold mb-1" style={{ fontSize: "0.85rem" }}>E-mail:</label>
                        <div className="input-group position-relative">
                            <span className="position-absolute d-flex align-items-center justify-content-center text-info" style={{ width: "40px", height: "100%", zIndex: 10 }}>
                                <FaUserAlt />
                            </span>
                            <input
                                type="text"
                                className={`form-control input-glass ${erros.email ? "is-invalid border-danger" : ""}`}
                                id="email"
                                placeholder="Digite seu email"
                                style={{ paddingLeft: "40px" }}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (erros.email) setErros({ ...erros, email: "" });
                                }}
                            />
                        </div>
                        {erros.email && <small className="text-danger mt-1 d-block fw-bold">{erros.email}</small>}
                    </div>

                    {/* Campo Senha */}
                    <div className="mb-4 text-start">
                        <label htmlFor="senha" className="form-label text-light fw-bold mb-1" style={{ fontSize: "0.85rem" }}>Senha:</label>
                        <div className="input-group position-relative">
                            <span className="position-absolute d-flex align-items-center justify-content-center text-info" style={{ width: "40px", height: "100%", zIndex: 10 }}>
                                <FaLock />
                            </span>
                            <input
                                type={mostrarSenha ? "text" : "password"}
                                className={`form-control input-glass ${erros.senha ? "is-invalid border-danger" : ""}`}
                                id="senha"
                                placeholder="Digite sua senha"
                                style={{ paddingLeft: "40px", paddingRight: "45px" }}
                                value={senha}
                                onChange={(e) => {
                                    setSenha(e.target.value);
                                    if (erros.senha) setErros({ ...erros, senha: "" });
                                }}
                            />
                            {/* Botão de Olhinho (Mostrar/Ocultar Senha) */}
                            <button
                                type="button"
                                className="btn position-absolute end-0 top-50 translate-middle-y border-0 text-info"
                                style={{ zIndex: 10, boxShadow: "none" }}
                                onClick={() => setMostrarSenha(!mostrarSenha)}
                                tabIndex={-1}
                            >
                                {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {erros.senha && <small className="text-danger mt-1 d-block fw-bold">{erros.senha}</small>}
                    </div>

                    {/* Botão de Submit (btn-login customizado) */}
                    <div className="d-grid mt-2">
                        <button type="submit" className="btn-login" disabled={carregando}>
                            {carregando ? "Entrando..." : "ENTRAR NO SISTEMA"}
                        </button>
                    </div>

                </form>

                {/* Link para Cadastro */}
                <p className="text-center mt-4 mb-0" style={{ color: "var(--texto-claro)", fontSize: "0.9rem" }}>
                    Não tem conta?{" "}
                    <Link to="/cadastro" style={{ color: "#05BBD0", fontWeight: "bold", textDecoration: "none" }}>
                        Criar conta
                    </Link>
                </p>

            </div>
        </>
    );
}

export default LoginForm;