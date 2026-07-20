import React, { useEffect, useState, useCallback } from "react";
import {
    listarComentariosPorChamado,
    cadastrarComentario,
    excluirComentario
} from "../services/comentarioService";
import ModalConfirmacao from "./ModalConfirmacao";
import { FaTrashAlt } from 'react-icons/fa';
import useAuth from "../hooks/useAuth";

function ModalComentarios({ mostrar, fechar, chamado, mostrarMensagem }) {
    const { usuario, isAdmin } = useAuth();

    const [comentarios, setComentarios] = useState([]);
    const [mensagem, setMensagem] = useState("");   
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
    const [comentarioExcluir, setComentarioExcluir] = useState(null);

    const carregarComentarios = useCallback(async () => {
        if (!chamado) return;
        try {
            const response = await listarComentariosPorChamado(chamado.id);
            setComentarios(response.data.content || response.data);
        } catch (error) {
            console.error("Erro ao carregar comentários", error);
        }
    }, [chamado]);

    useEffect(() => {
        if (mostrar && chamado) {
            setMensagem("");
            carregarComentarios();
        }
    }, [mostrar, chamado, carregarComentarios]);

    async function handleSalvarComentario() {
        if (mensagem.trim() === "") return;
    
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
        }
    }

    async function handleExcluirComentario() {
        try {
            await excluirComentario(comentarioExcluir);
            mostrarMensagem("Comentário excluído com sucesso!", "warning");
            setMostrarConfirmacao(false);
            setComentarioExcluir(null);
            await carregarComentarios();
        } catch (error) {
            console.error(error);
        }
    }

    if (!mostrar) return null;

    const isResolvido = chamado?.status === "RESOLVIDO";

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,.7)",
                backdropFilter: "blur(3px)", // Efeito de desfoque no fundo
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
                padding: "20px"
            }}
            onClick={fechar}
        >
            {/* Injeção de estilos para scrollbar e input focus */}
            <style>
                {`
                    .custom-scrollbar::-webkit-scrollbar { width: 8px; }
                    .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
                    .custom-scrollbar::-webkit-scrollbar-thumb { background: #05BBD0; border-radius: 10px; }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #0498a8; }
                    .glow-input:focus {
                        outline: none !important;
                        box-shadow: 0 0 10px rgba(5, 187, 208, 0.5) !important;
                        border-color: #05BBD0 !important;
                        background: rgba(255, 255, 255, 0.1) !important;
                    }
                `}
            </style>

            <div
                className="shadow-lg custom-scrollbar"
                style={{
                    background: "linear-gradient(145deg, #1D164D 0%, #15103A 100%)",
                    border: "1px solid #05BBD0",
                    borderRadius: "15px",
                    padding: "30px",
                    color: "white",
                    width: "750px",
                    maxWidth: "100%",
                    maxHeight: "85vh",
                    display: "flex",
                    flexDirection: "column",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* CABEÇALHO */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="mb-0" style={{ color: "#05BBD0", fontWeight: "600" }}>💬 Comentários</h3>
                    <button
                        onClick={fechar}
                        style={{
                            border: "none",
                            background: "transparent",
                            color: "#fff",
                            fontSize: "28px",
                            lineHeight: "1",
                            cursor: "pointer",
                            opacity: "0.7",
                            transition: "0.2s"
                        }}
                        onMouseOver={(e) => (e.target.style.opacity = "1")}
                        onMouseOut={(e) => (e.target.style.opacity = "0.7")}
                    >
                        ×
                    </button>
                </div>

                <div className="mb-3 d-flex justify-content-between align-items-center bg-dark p-3 rounded" style={{ background: "rgba(0,0,0,0.2) !important", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <div>
                        <h5 className="mb-1 text-white">{chamado?.titulo}</h5>
                        <small style={{ color: "#A09EBD" }}>ID do Chamado: #{chamado?.id}</small>
                    </div>
                    {isResolvido && (
                        <span className="badge" style={{ backgroundColor: "rgba(25, 135, 84, 0.2)", color: "#28a745", border: "1px solid #28a745", padding: "8px 12px", fontSize: "14px" }}>
                            Resolvido
                        </span>
                    )}
                </div>

                <hr style={{ borderColor: "rgba(255,255,255,0.1)" }} />

                {/* ÁREA DE COMENTÁRIOS COM SCROLL */}
                <div className="custom-scrollbar" style={{ overflowY: "auto", flexGrow: 1, paddingRight: "10px", display: "flex", flexDirection: "column", gap: "15px", marginBottom: "20px" }}>
                    {comentarios.length === 0 ? (
                        <div className="text-center py-5">
                            <h5 style={{ color: "#A09EBD" }}>Nenhum comentário ainda.</h5>
                            <p style={{ color: "#6c757d" }}>Seja o primeiro a comentar neste chamado!</p>
                        </div>
                    ) : (
                        comentarios.map((comentario) => {
                            const isMeuComentario = comentario.usuario?.id === usuario?.id;
                            
                            return (
                                <div key={comentario.id} style={{ display: "flex", justifyContent: isMeuComentario ? "flex-end" : "flex-start" }}>
                                    <div
                                        style={{
                                            background: isMeuComentario ? "rgba(5, 187, 208, 0.15)" : "rgba(255, 255, 255, 0.05)",
                                            border: isMeuComentario ? "1px solid rgba(5, 187, 208, 0.5)" : "1px solid rgba(255, 255, 255, 0.1)",
                                            borderRadius: isMeuComentario ? "15px 15px 0 15px" : "15px 15px 15px 0",
                                            padding: "15px",
                                            maxWidth: "85%",
                                            position: "relative",
                                            opacity: isResolvido ? 0.8 : 1
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
                                                        style={{
                                                            background: "transparent",
                                                            border: "none",
                                                            color: "#dc3545",
                                                            padding: "0",
                                                            cursor: "pointer",
                                                            opacity: "0.7",
                                                            transition: "0.2s"
                                                        }}
                                                        onMouseOver={(e) => (e.target.style.opacity = "1")}
                                                        onMouseOut={(e) => (e.target.style.opacity = "0.7")}
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

                {/* ÁREA DE INPUT DE NOVO COMENTÁRIO */}
                {isResolvido ? (
                    <div className="mt-auto">
                        <div className="p-3 rounded text-center mb-3" style={{ background: "rgba(5, 187, 208, 0.1)", border: "1px solid #05BBD0", color: "#05BBD0" }}>
                            🔒 <strong>Chamado Fechado:</strong> Este histórico é apenas para leitura.
                        </div>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-secondary px-4 py-2" onClick={fechar} style={{ borderRadius: "8px" }}>Fechar</button>
                        </div>
                    </div>
                ) : (
                    <div className="mt-auto p-3 rounded" style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.05)" }}>
                        <textarea
                            className="form-control text-white glow-input custom-scrollbar"
                            rows="2"
                            placeholder="Escreva sua mensagem aqui..."
                            value={mensagem}
                            onChange={(e) => setMensagem(e.target.value)}
                            style={{
                                background: "rgba(255, 255, 255, 0.05)",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                borderRadius: "8px",
                                resize: "none"
                            }}
                        />
                        <div className="d-flex justify-content-end mt-3 gap-2">
                            <button className="btn btn-secondary px-4" onClick={fechar} style={{ borderRadius: "8px" }}>
                                Cancelar
                            </button>
                            <button
                                className="btn btn-custom px-4"
                                onClick={handleSalvarComentario}
                                disabled={!mensagem.trim()}
                                style={{ borderRadius: "8px", fontWeight: "bold", background: "#05BBD0", color: "#1D164D", border: "none" }}
                            >
                                Enviar 🚀
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