import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaSave } from "react-icons/fa";
import api from "../services/api";
import ToastMensagem from "../components/ToastMensagem";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Cadastro() {
    const [dados, setDados] = useState({
        nome: "", cpf: "", telefone: "", email: "", senha: ""
    });
    const [erros, setErros] = useState({});
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [toast, setToast] = useState({ mostrar: false, mensagem: "", tipo: "" });
    const navigate = useNavigate();

    function exibirToast(mensagem, tipo) {
        setToast({ mostrar: true, mensagem, tipo });
        setTimeout(() => setToast({ mostrar: false, mensagem: "", tipo: "" }), 3000);
    }

    function aplicarMascaraCPF(valor) {
        valor = valor.replace(/\D/g, "").slice(0, 11);
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        return valor;
    }

    function aplicarMascaraTelefone(valor) {
        valor = valor.replace(/\D/g, "").slice(0, 11);
        if (valor.length <= 10) {
            valor = valor.replace(/(\d{2})(\d)/, "($1) $2");
            valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
        } else {
            valor = valor.replace(/(\d{2})(\d)/, "($1) $2");
            valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
        }
        return valor;
    }

    function handleChange(e) {
        let { name, value } = e.target;
        if (name === "cpf") value = aplicarMascaraCPF(value);
        if (name === "telefone") value = aplicarMascaraTelefone(value);
        setDados({ ...dados, [name]: value });
        if (erros[name]) setErros({ ...erros, [name]: "" });
    }

    function validar() {
        const novosErros = {};

        if (!dados.nome.trim()) novosErros.nome = "O nome é obrigatório.";
        else if (dados.nome.trim().length < 3) novosErros.nome = "Mínimo 3 caracteres.";

        const cpf = dados.cpf.replace(/\D/g, "");
        if (!cpf) novosErros.cpf = "O CPF é obrigatório.";
        else if (cpf.length !== 11) novosErros.cpf = "CPF deve conter 11 dígitos.";

        const telefone = dados.telefone.replace(/\D/g, "");
        if (!telefone) novosErros.telefone = "O telefone é obrigatório.";
        else if (telefone.length < 10) novosErros.telefone = "Telefone inválido.";

        if (!dados.email.trim()) novosErros.email = "O e-mail é obrigatório.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email))
            novosErros.email = "E-mail inválido.";

        if (!dados.senha.trim()) novosErros.senha = "A senha é obrigatória.";
        else if (dados.senha.length < 6) novosErros.senha = "Mínimo 6 caracteres.";

        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!validar()) return;

        setCarregando(true);
        try {
            await api.post("/usuarios", {
                nome: dados.nome,
                cpf: dados.cpf.replace(/\D/g, ""),
                telefone: dados.telefone.replace(/\D/g, ""),
                email: dados.email,
                senha: dados.senha,
                perfil: "USUARIO_COMUM"
            });

            exibirToast("Conta criada com sucesso! Redirecionando...", "success");
            setTimeout(() => navigate("/login"), 1500);
        } catch (error) {
            const mensagem =
                error.response?.data?.erro ||
                error.response?.data?.message ||
                "Erro ao criar conta.";
            exibirToast(mensagem, "danger");
        } finally {
            setCarregando(false);
        }
    }

    return (
        /* Mesma estrutura da tela de Login para garantir o fundo igual */
        <div className="login-bg min-vh-100">
            <Navbar paginaAtual="cadastro" />
            <ToastMensagem mostrar={toast.mostrar} mensagem={toast.mensagem} tipo={toast.tipo} />

            {/* O main empurra o form para o centro da tela disponível usando Flexbox */}
            <main className="container flex-grow-1 d-flex align-items-center justify-content-center py-5">
                
                {/* O Cartão de Vidro - deixei um pouco mais largo (450px) pois tem mais campos */}
                <div className="login-glass-card mx-auto w-100" style={{ maxWidth: "450px" }}>
                    
                    {/* Título */}
                    <div className="mb-4 text-center">
                        <h2 className="fw-bold text-white mb-0 text-glow">CRIAR CONTA</h2>
                        <p className="text-light opacity-75 mt-1" style={{ fontSize: "0.9rem" }}>
                            Preencha os dados abaixo para se cadastrar.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>

                        {/* Nome Completo */}
                        <div className="mb-3 text-start">
                            <label className="form-label text-light fw-bold mb-1" style={{ fontSize: "0.85rem" }}>Nome Completo</label>
                            <input type="text"
                                className={`form-control input-glass ${erros.nome ? "is-invalid border-danger" : ""}`}
                                name="nome" value={dados.nome} onChange={handleChange} />
                            {erros.nome && <small className="text-danger mt-1 d-block fw-bold">{erros.nome}</small>}
                        </div>

                        {/* CPF */}
                        <div className="mb-3 text-start">
                            <label className="form-label text-light fw-bold mb-1" style={{ fontSize: "0.85rem" }}>CPF</label>
                            <input type="text"
                                className={`form-control input-glass ${erros.cpf ? "is-invalid border-danger" : ""}`}
                                name="cpf" value={dados.cpf} onChange={handleChange} />
                            {erros.cpf && <small className="text-danger mt-1 d-block fw-bold">{erros.cpf}</small>}
                        </div>

                        {/* Telefone */}
                        <div className="mb-3 text-start">
                            <label className="form-label text-light fw-bold mb-1" style={{ fontSize: "0.85rem" }}>Telefone</label>
                            <input type="text"
                                className={`form-control input-glass ${erros.telefone ? "is-invalid border-danger" : ""}`}
                                name="telefone" value={dados.telefone} onChange={handleChange} />
                            {erros.telefone && <small className="text-danger mt-1 d-block fw-bold">{erros.telefone}</small>}
                        </div>

                        {/* Email */}
                        <div className="mb-3 text-start">
                            <label className="form-label text-light fw-bold mb-1" style={{ fontSize: "0.85rem" }}>Email</label>
                            <input type="text"
                                className={`form-control input-glass ${erros.email ? "is-invalid border-danger" : ""}`}
                                name="email" value={dados.email} onChange={handleChange} />
                            {erros.email && <small className="text-danger mt-1 d-block fw-bold">{erros.email}</small>}
                        </div>

                        {/* Senha */}
                        <div className="mb-4 text-start">
                            <label className="form-label text-light fw-bold mb-1" style={{ fontSize: "0.85rem" }}>Senha</label>
                            <div className="input-group position-relative">
                                <input
                                    type={mostrarSenha ? "text" : "password"}
                                    className={`form-control input-glass ${erros.senha ? "is-invalid border-danger" : ""}`}
                                    style={{ paddingRight: "45px" }}
                                    name="senha" value={dados.senha} onChange={handleChange}
                                />
                                {/* Botão de Mostrar/Ocultar Senha */}
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

                        {/* Botão de Enviar */}
                        <div className="d-grid mt-2">
                            <button type="submit" className="btn-login" disabled={carregando}>
                                <FaSave className="me-2" />
                                {carregando ? "Criando conta..." : "CRIAR CONTA"}
                            </button>
                        </div>

                    </form>

                    {/* Link para Login */}
                    <p className="text-center mt-4 mb-0" style={{ color: "var(--texto-claro)", fontSize: "0.9rem" }}>
                        Já tem conta?{" "}
                        <Link to="/login" style={{ color: "#05BBD0", fontWeight: "bold", textDecoration: "none" }}>
                            Entrar
                        </Link>
                    </p>

                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Cadastro;