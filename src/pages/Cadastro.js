import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
    FaEye, FaEyeSlash, FaSave, FaUser, 
    FaIdCard, FaPhoneAlt, FaEnvelope, FaLock 
} from "react-icons/fa";
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
        if (!dados.nome.trim()) novosErros.nome = "Obrigatório.";
        else if (dados.nome.trim().length < 3) novosErros.nome = "Mínimo 3 letras.";

        const cpf = dados.cpf.replace(/\D/g, "");
        if (!cpf) novosErros.cpf = "Obrigatório.";
        else if (cpf.length !== 11) novosErros.cpf = "CPF inválido.";

        const telefone = dados.telefone.replace(/\D/g, "");
        if (!telefone) novosErros.telefone = "Obrigatório.";
        else if (telefone.length < 10) novosErros.telefone = "Telefone inválido.";

        if (!dados.email.trim()) novosErros.email = "Obrigatório.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email)) novosErros.email = "E-mail inválido.";

        if (!dados.senha.trim()) novosErros.senha = "Obrigatória.";
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
            const mensagem = error.response?.data?.erro || error.response?.data?.message || "Erro ao criar conta.";
            exibirToast(mensagem, "danger");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className="login-bg min-vh-100 d-flex flex-column">
            
            {/* INJEÇÃO DE ESTILOS EXTRAS */}
            <style>
                {`
                    .input-group-text.glass-icon {
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid rgba(5, 187, 208, 0.4);
                        border-right: none;
                        color: #05BBD0;
                    }
                    .form-control.input-glass-icon {
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid rgba(5, 187, 208, 0.4);
                        border-left: none;
                        color: white;
                    }
                    .form-control.input-glass-icon:focus {
                        background: rgba(255, 255, 255, 0.1);
                        border-color: #05BBD0;
                        box-shadow: none;
                        color: white;
                    }
                    .split-card {
                        background: rgba(15, 12, 41, 0.6);
                        backdrop-filter: blur(15px);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 20px;
                        overflow: hidden;
                        box-shadow: 0 15px 35px rgba(0,0,0,0.5);
                    }
                    .image-panel {
                        background-image: url('${process.env.PUBLIC_URL}/suporteHome.jpg');
                        background-size: cover;
                        background-position: center;
                        position: relative;
                    }
                    .image-panel::after {
                        content: '';
                        position: absolute;
                        top: 0; left: 0; right: 0; bottom: 0;
                        background: linear-gradient(to right, rgba(8,5,28,0.2), rgba(8,5,28,0.9));
                    }
                `}
            </style>

            <Navbar paginaAtual="cadastro" />
            <ToastMensagem mostrar={toast.mostrar} mensagem={toast.mensagem} tipo={toast.tipo} />

            <main className="container flex-grow-1 d-flex align-items-center justify-content-center py-5">
                
                {/* CARTÃO DUPLO (SPLIT CARD) */}
                <div className="row split-card mx-auto w-100" style={{ maxWidth: "900px" }}>
                    
                    {/* Metade Esquerda: Imagem */}
                    <div className="col-md-5 d-none d-md-block image-panel">
                        {/* A imagem é definida no CSS acima. O gradiente escurece ela na borda para fundir com o form */}
                    </div>

                    {/* Metade Direita: Formulário */}
                    <div className="col-md-7 p-4 p-sm-5 position-relative z-1">
                        
                        <div className="mb-4 text-center text-md-start">
                            <h2 className="fw-bold text-white mb-0 text-glow">CRIAR CONTA</h2>
                            <p className="text-light opacity-75 mt-1" style={{ fontSize: "0.9rem" }}>
                                Junte-se ao DeskFlow. É rápido e fácil.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            
                            {/* LINHA 1: Nome e CPF */}
                            <div className="row">
                                <div className="col-sm-6 mb-3">
                                    <div className="input-group">
                                        <span className="input-group-text glass-icon"><FaUser /></span>
                                        <input type="text" className={`form-control input-glass-icon ${erros.nome ? "is-invalid" : ""}`}
                                            name="nome" value={dados.nome} onChange={handleChange} placeholder="Nome Completo" />
                                    </div>
                                    {erros.nome && <small className="text-danger fw-bold">{erros.nome}</small>}
                                </div>

                                <div className="col-sm-6 mb-3">
                                    <div className="input-group">
                                        <span className="input-group-text glass-icon"><FaIdCard /></span>
                                        <input type="text" className={`form-control input-glass-icon ${erros.cpf ? "is-invalid" : ""}`}
                                            name="cpf" value={dados.cpf} onChange={handleChange} placeholder="CPF" />
                                    </div>
                                    {erros.cpf && <small className="text-danger fw-bold">{erros.cpf}</small>}
                                </div>
                            </div>

                            {/* LINHA 2: Telefone e Email */}
                            <div className="row">
                                <div className="col-sm-6 mb-3">
                                    <div className="input-group">
                                        <span className="input-group-text glass-icon"><FaPhoneAlt /></span>
                                        <input type="text" className={`form-control input-glass-icon ${erros.telefone ? "is-invalid" : ""}`}
                                            name="telefone" value={dados.telefone} onChange={handleChange} placeholder="Telefone" />
                                    </div>
                                    {erros.telefone && <small className="text-danger fw-bold">{erros.telefone}</small>}
                                </div>

                                <div className="col-sm-6 mb-3">
                                    <div className="input-group">
                                        <span className="input-group-text glass-icon"><FaEnvelope /></span>
                                        <input type="email" className={`form-control input-glass-icon ${erros.email ? "is-invalid" : ""}`}
                                            name="email" value={dados.email} onChange={handleChange} placeholder="E-mail" />
                                    </div>
                                    {erros.email && <small className="text-danger fw-bold">{erros.email}</small>}
                                </div>
                            </div>

                            {/* LINHA 3: Senha */}
                            <div className="mb-4">
                                <div className="input-group position-relative">
                                    <span className="input-group-text glass-icon"><FaLock /></span>
                                    <input type={mostrarSenha ? "text" : "password"}
                                        className={`form-control input-glass-icon ${erros.senha ? "is-invalid" : ""}`}
                                        name="senha" value={dados.senha} onChange={handleChange} placeholder="Crie uma senha" 
                                        style={{ paddingRight: "45px" }} />
                                    
                                    <button type="button" className="btn position-absolute end-0 top-50 translate-middle-y border-0 text-info"
                                        style={{ zIndex: 10 }} onClick={() => setMostrarSenha(!mostrarSenha)} tabIndex={-1}>
                                        {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {erros.senha && <small className="text-danger fw-bold">{erros.senha}</small>}
                            </div>

                            {/* Botão de Enviar */}
                            <div className="d-grid mt-2">
                                <button type="submit" className="btn-login py-2 fs-5 d-flex justify-content-center align-items-center" disabled={carregando}>
                                    {carregando ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                                            Criando conta...
                                        </>
                                    ) : (
                                        <>
                                            <FaSave className="me-2" />
                                            CADASTRAR
                                        </>
                                    )}
                                </button>
                            </div>

                        </form>

                        <p className="text-center mt-4 mb-0" style={{ color: "var(--texto-claro)", fontSize: "0.95rem" }}>
                            Já tem conta?{" "}
                            <Link to="/login" style={{ color: "#05BBD0", fontWeight: "bold", textDecoration: "none" }}>
                                Fazer Login
                            </Link>
                        </p>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Cadastro;