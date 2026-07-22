import React, { useEffect, useState, useCallback } from "react";
import {
    listarComentariosPorChamado,
    cadastrarComentario,
    excluirComentario
} from "../services/comentarioService";
import ModalConfirmacao from "./ModalConfirmacao";
import { FaTrashAlt, FaComments, FaPaperPlane } from 'react-icons/fa';
import useAuth from "../hooks/useAuth";

function ModalComentarios({ mostrar, fechar, chamado, mostrarMensagem }) {
    const { usuario, isAdmin } = useAuth();

    const [comentarios, setComentarios] = useState([]);
    const [mensagem, setMensagem] = useState("");
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
    const [comentarioExcluir, setComentarioExcluir] = useState(null);
    const [carregandoComentarios, setCarregandoComentarios] = useState(false);
    const [processandoComentario, setProcessandoComentario] = useState(false);

    const carregarComentarios = useCallback(async () => {
        if (!chamado) return;
        setCarregandoComentarios(true);
        try {
            const response = await listarComentariosPorChamado(chamado.id);
            setComentarios(response.data.content || response.data);
        } catch (error) {
            console.error("Erro ao carregar comentários", error);
            mostrarMensagem("Erro ao carregar comentários.", "danger");
        } finally {
            setCarregandoComentarios(false);
        }
    }, [chamado, mostrarMensagem]);

    useEffect(() => {
        if (mostrar && chamado) {
            setMensagem("");
            carregarComentarios();
        }
    }, [mostrar, chamado, carregarComentarios]);

    async function handleSalvarComentario() {
        if (mensagem.trim() === "") return;

        setProcessandoComentario(true);
        try {
            const comentario = {
                mensagem: mensagem,
                usuarioId: usuario?.id,
                chamadoId: chamado.id
            };

            await cadastrarComentario(comentario);
            mostrarMensagem("Comentário adicionado com sucesso!", "success");
            setMensagem("");
            await carregarComentarios();
        } catch (error) {
            console.error(error);
            mostrarMensagem("Erro ao enviar comentário.", "danger");
        } finally {
            setProcessandoComentario(false);
        }
    }

    async function handleExcluirComentario() {
        setProcessandoComentario(true);
        try {
            await excluirComentario(comentarioExcluir);
            mostrarMensagem("Comentário excluído com sucesso!", "warning");
            setMostrarConfirmacao(false);
            setComentarioExcluir(null);
            await carregarComentarios();
        } catch (error) {
            console.error(error);
            mostrarMensagem("Erro ao excluir comentário.", "danger");
        } finally {
            setProcessandoComentario(false);
        }
    }

    if (!mostrar) return null;

    const isResolvido = chamado?.status === "RESOLVIDO";

    return (
        <div
            className="modal-overlay"
            onClick={fechar}
        >
            <div
                className="modal-glass-card custom-scrollbar text-start"
                style={{ width: "780px", maxWidth: "95%", maxHeight: "88vh" }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header-custom d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center gap-2">
                        <div className="hero-icon-badge" style={{ width: "42px", height: "42px" }}>
                            <FaComments />
                        </div>
                        <div>
                            <h3 className="titulo-pagina m-0" style={{ fontSize: "1.25rem" }}>
                                Comentários do chamado
                            </h3>
                            <p className="mb-0 texto-ajuda">Histórico e troca de mensagens</p>
                        </div>
                    </div>
                    <button className="fechar-modal" onClick={fechar} title="Fechar">
                        &times;
                    </button>
                </div>

                <div className="p-3 rounded-4 mb-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-start gap-3">
                        <div>
                            <h4 className="fw-bold mb-2 text-white" style={{ fontSize: "1.15rem" }}>
                                {chamado?.titulo}
                            </h4>
                            <div className="d-flex flex-wrap gap-2 mt-2">
                                <span className="chip chip-cyan">Chamado #{chamado?.id}</span>
                                <span className="chip chip-violet">{chamado?.categoria?.nome || "Suporte Geral"}</span>
                            </div>
                        </div>

                        {isResolvido && (
                            <span className="badge rounded-pill" style={{ backgroundColor: "rgba(40, 167, 69, 0.15)", color: "#6EE7B7", border: "1px solid rgba(40, 167, 69, 0.3)", padding: "8px 12px" }}>
                                Resolvido
                            </span>
                        )}
                    </div>
                </div>

                <div className="custom-scrollbar" style={{ overflowY: "auto", flexGrow: 1, paddingRight: "8px", display: "flex", flexDirection: "column", gap: "14px", marginBottom: "18px" }}>
                    {carregandoComentarios ? (
                        <div className="text-center py-5 rounded-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px dashed rgba(255,255,255,0.12)" }}>
                            <div className="spinner-border text-info mb-3" role="status" />
                            <div className="text-white">Carregando comentários...</div>
                        </div>
                    ) : comentarios.length === 0 ? (
                        <div className="text-center py-5 rounded-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px dashed rgba(255,255,255,0.12)" }}>
                            <h5 className="text-white mb-2">Nenhum comentário ainda.</h5>
                            <p className="mb-0 texto-ajuda">Seja o primeiro a comentar neste chamado.</p>
                        </div>
                    ) : (
                        comentarios.map((comentario) => {
                            const isMeuComentario = comentario.usuario?.id === usuario?.id;

                            return (
                                <div key={comentario.id} style={{ display: "flex", justifyContent: isMeuComentario ? "flex-end" : "flex-start" }}>
                                    <div
                                        style={{
                                            background: isMeuComentario ? "rgba(5, 187, 208, 0.14)" : "rgba(255, 255, 255, 0.05)",
                                            border: isMeuComentario ? "1px solid rgba(5, 187, 208, 0.35)" : "1px solid rgba(255, 255, 255, 0.1)",
                                            borderRadius: isMeuComentario ? "16px 16px 0 16px" : "16px 16px 16px 0",
                                            padding: "14px 15px",
                                            maxWidth: "86%",
                                            position: "relative",
                                            opacity: isResolvido ? 0.9 : 1
                                        }}
                                    >
                                        <div className="d-flex justify-content-between align-items-center mb-2 gap-3">
                                            <strong style={{ color: isMeuComentario ? "#05BBD0" : "#E2E2E2" }}>
                                                {isMeuComentario ? "Você" : comentario.usuario?.nome}
                                            </strong>

                                            <div className="d-flex align-items-center gap-2">
                                                <small style={{ color: "#A09EBD", fontSize: "0.75rem" }}>
                                                    {new Date(comentario.dataComentario).toLocaleString("pt-BR", {
                                                        day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit"
                                                    })}
                                                </small>
                                                {!isResolvido && (isAdmin || isMeuComentario) && (
                                                    <button
                                                        onClick={() => {
                                                            setComentarioExcluir(comentario.id);
                                                            setMostrarConfirmacao(true);
                                                        }}
                                                        className="btn btn-link p-0"
                                                        style={{ color: "#FF7B7B", textDecoration: "none" }}
                                                        title="Excluir comentário"
                                                    >
                                                        <FaTrashAlt size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <p className="mb-0" style={{ color: "#E2E2E2", fontSize: "0.95rem", lineHeight: "1.5" }}>
                                            {comentario.mensagem}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {isResolvido ? (
                    <div className="mt-auto">
                        <div className="p-3 rounded-4 text-center mb-3" style={{ background: "rgba(5, 187, 208, 0.1)", border: "1px solid rgba(5, 187, 208, 0.3)", color: "#05BBD0" }}>
                            <strong>Chamado fechado:</strong> este histórico é somente leitura.
                        </div>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-cancelar px-4 py-2" onClick={fechar}>Fechar</button>
                        </div>
                    </div>
                ) : (
                    <div className="mt-auto p-3 rounded-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                        <textarea
                            className="form-control input-glass custom-scrollbar"
                            rows="3"
                            placeholder="Escreva sua mensagem aqui..."
                            value={mensagem}
                            onChange={(e) => setMensagem(e.target.value)}
                            style={{ resize: "none" }}
                        />
                        <div className="d-flex justify-content-end mt-3 gap-2">
                            <button className="btn btn-cancelar px-4" onClick={fechar}>
                                Cancelar
                            </button>
                            <button
                                className="btn btn-custom px-4 d-flex align-items-center justify-content-center"
                                onClick={handleSalvarComentario}
                                disabled={!mensagem.trim() || processandoComentario}
                            >
                                {processandoComentario ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                                        Enviando...
                                    </>
                                ) : (
                                    <>
                                        <FaPaperPlane className="me-2" /> Enviar
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}

                <ModalConfirmacao
                    mostrar={mostrarConfirmacao}
                    fechar={() => {
                        setMostrarConfirmacao(false);
                        setComentarioExcluir(null);
                    }}
                    aoConfirmar={handleExcluirComentario}
                    titulo="Confirmar Exclusão"
                    mensagem="Tem certeza que deseja apagar esta mensagem?"
                />
            </div>
        </div>
    );
}

export default ModalComentarios;