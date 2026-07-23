import React, { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaKey, FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";

function ModalEsqueciSenha({ mostrar, fechar, mostrarMensagem }) {
    const [etapa, setEtapa] = useState(1); // 1 = Digitar E-mail | 2 = Digitar Código e Nova Senha
    const [email, setEmail] = useState("");
    const [codigo, setCodigo] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [mostrarSenha, setMostrarSenha] = useState(false);

    // Ajuste a URL base se necessário (se já tiver um axios configurado, use-o)
    const apiUrl = "http://localhost:8080/auth";

    if (!mostrar) return null;

    async function handleEnviarEmail() {
        if (!email.trim()) return;
        setCarregando(true);
        try {
            await axios.post(`${apiUrl}/esqueci-senha`, { email });
            mostrarMensagem("Um código foi gerado! (Olhe o console do Java)", "success");
            setEtapa(2);
        } catch (error) {
            const mensagem = error.response?.data?.message || "Erro ao buscar e-mail.";
            mostrarMensagem(mensagem, "danger");
        } finally {
            setCarregando(false);
        }
    }

    async function handleSalvarNovaSenha() {
        if (!codigo.trim() || !novaSenha.trim()) return;
        setCarregando(true);
        try {
            await axios.post(`${apiUrl}/resetar-senha`, { email, codigo, novaSenha });
            mostrarMensagem("Senha alterada com sucesso! Você já pode fazer login.", "success");
            fecharModal();
        } catch (error) {
            const mensagem = error.response?.data?.message || "Código inválido.";
            mostrarMensagem(mensagem, "danger");
        } finally {
            setCarregando(false);
        }
    }

    function fecharModal() {
        setEtapa(1);
        setEmail("");
        setCodigo("");
        setNovaSenha("");
        fechar();
    }

    return (
        <div className="modal-overlay" onClick={fecharModal}>
            <div
                className="modal-glass-card text-start p-4"
                onClick={(e) => e.stopPropagation()}
                style={{ width: "450px", maxWidth: "95%" }}
            >
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="titulo-pagina m-0" style={{ fontSize: "1.25rem" }}>
                        🔒 Recuperar Senha
                    </h3>
                    <button className="fechar-modal" onClick={fecharModal} title="Fechar">
                        <FaTimes />
                    </button>
                </div>

                {etapa === 1 ? (
                    <div>
                        <p className="texto-ajuda mb-4">
                            Digite seu e-mail cadastrado. Vamos gerar um código de segurança para você criar uma nova senha.
                        </p>
                        <div className="mb-3">
                            <label className="form-label text-white">E-mail</label>
                            <div className="input-group">
                                <span className="input-group-text"><FaEnvelope /></span>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="exemplo@email.com"
                                />
                            </div>
                        </div>
                        <button
                            className="btn btn-custom w-100 mt-3 py-2"
                            onClick={handleEnviarEmail}
                            disabled={carregando || !email}
                        >
                            {carregando ? <span className="spinner-border spinner-border-sm me-2" /> : null}
                            {carregando ? "Buscando..." : "Avançar"}
                        </button>
                    </div>
                ) : (
                    <div>
                        <p className="texto-ajuda mb-4">
                            Verifique o código de 6 dígitos que geramos e escolha sua nova senha.
                        </p>

                        <div className="mb-3">
                            <label className="form-label text-white">Código de Recuperação</label>
                            <div className="input-group">
                                <span className="input-group-text"><FaKey /></span>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={codigo}
                                    onChange={(e) => setCodigo(e.target.value)}
                                    placeholder="Ex: 123456"
                                    maxLength="6"
                                />
                            </div>
                        </div>

                        <div className="mb-3 text-start">
                            <label htmlFor="novaSenha" className="form-label text-light fw-bold mb-1" style={{ fontSize: "0.85rem" }}>Nova Senha:</label>
                            <div className="input-group position-relative">
                                <input
                                    type={mostrarSenha ? "text" : "password"}
                                    className="form-control input-glass"
                                    id="novaSenha"
                                    placeholder="Digite a nova senha"
                                    style={{ paddingRight: "45px" }} // Espaço para o botão não ficar em cima do texto
                                    value={novaSenha} // Ajuste para o nome da variável que você está usando
                                    onChange={(e) => setNovaSenha(e.target.value)} // Ajuste para o seu onChange
                                />
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
                        </div>

                        <button
                            className="btn btn-custom w-100 mt-3 py-2"
                            onClick={handleSalvarNovaSenha}
                            disabled={carregando || !codigo || !novaSenha}
                        >
                            {carregando ? <span className="spinner-border spinner-border-sm me-2" /> : null}
                            {carregando ? "Salvando..." : "Salvar Nova Senha"}
                        </button>
                        <button className="btn btn-link w-100 mt-2 text-muted text-decoration-none" onClick={() => setEtapa(1)}>
                            Voltar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ModalEsqueciSenha;