import React, { useState, useEffect, useCallback } from "react";
import {
    cadastrarAtendimento,
    buscarAtendimentoPorChamado
} from "../services/atendimentoService";

function ModalAtendimento({
    mostrar,
    fechar,
    chamado,
    mostrarMensagem
}) {
    const [descricaoSolucao, setDescricaoSolucao] = useState("");
    const [atendimento, setAtendimento] = useState(null);
    const [carregando, setCarregando] = useState(false);

    const carregarAtendimento = useCallback(async () => {
        if (!chamado) return;

        try {
            setCarregando(true);
            const response = await buscarAtendimentoPorChamado(chamado.id);
            setAtendimento(response.data);
        } catch (error) {
            console.error(error);
            setAtendimento(null);
        } finally {
            setCarregando(false);
        }
    }, [chamado]);

    useEffect(() => {
        if (mostrar && chamado) {
            setDescricaoSolucao("");
            setAtendimento(null);
            if (chamado.status === "RESOLVIDO") {
                carregarAtendimento();
            }
        }
    }, [mostrar, chamado, carregarAtendimento]);

    async function handleFinalizarAtendimento() {
        if (!descricaoSolucao.trim()) return;

        try {
            const novoAtendimento = {
                descricaoSolucao,
                tecnicoId: chamado.tecnico?.id,
                chamadoId: chamado.id
            };

            await cadastrarAtendimento(novoAtendimento);
            await carregarAtendimento();

            mostrarMensagem("Atendimento registrado com sucesso!", "success");
            setDescricaoSolucao("");
            fechar();
        } catch (error) {
            console.error(error);
            const mensagem =
                error.response?.data?.message ||
                error.response?.data?.erro ||
                "Erro ao registrar atendimento!";
            mostrarMensagem(mensagem, "danger");
        }
    }

    if (!mostrar) return null;

    const isResolvido = chamado?.status === "RESOLVIDO";

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(8, 5, 28, 0.75)",
                backdropFilter: "blur(6px)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
                padding: "20px"
            }}
            onClick={fechar}
        >
            <style>
                {`
                    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                    .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); border-radius: 10px; }
                    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(5, 187, 208, 0.4); border-radius: 10px; }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #05BBD0; }
                    
                    .glow-textarea:focus {
                        outline: none !important;
                        box-shadow: 0 0 15px rgba(5, 187, 208, 0.25) !important;
                        border-color: #05BBD0 !important;
                        background: rgba(0, 0, 0, 0.25) !important;
                    }

                    .btn-glass-secondary {
                        border: 1px solid rgba(255, 255, 255, 0.15) !important;
                        background: rgba(255, 255, 255, 0.04) !important;
                        color: #E2E2E2 !important;
                        transition: all 0.3s ease;
                    }
                    .btn-glass-secondary:hover {
                        background: rgba(255, 255, 255, 0.1) !important;
                        color: #fff !important;
                        border-color: rgba(255, 255, 255, 0.3) !important;
                    }

                    .btn-neon-submit {
                        background: #05BBD0 !important;
                        color: #1D164D !important;
                        border: none !important;
                        box-shadow: 0 4px 14px rgba(5, 187, 208, 0.3) !important;
                        transition: all 0.3s ease;
                    }
                    .btn-neon-submit:hover:not(:disabled) {
                        background: #06d4ec !important;
                        box-shadow: 0 4px 20px rgba(5, 187, 208, 0.5) !important;
                        transform: translateY(-1px);
                    }
                `}
            </style>

            <div
                className="shadow-lg"
                style={{
                    background: "linear-gradient(145deg, #1D164D 0%, #120E32 100%)",
                    border: "1px solid rgba(5, 187, 208, 0.35)",
                    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255,255,255,0.05)",
                    borderRadius: "16px",
                    padding: "32px",
                    color: "white",
                    width: "720px",
                    maxWidth: "100%",
                    maxHeight: "90vh",
                    display: "flex",
                    flexDirection: "column"
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* CABEÇALHO DO MODAL */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="mb-0 d-flex align-items-center gap-2" style={{ color: "#05BBD0", fontWeight: "600", letterSpacing: "0.5px", fontSize: "1.4rem" }}>
                        {isResolvido ? "📄 Detalhes do Atendimento" : "🛠 Finalizar Atendimento"}
                    </h3>
                    <button
                        onClick={fechar}
                        style={{
                            border: "none",
                            background: "rgba(255, 255, 255, 0.05)",
                            color: "#A09EBD",
                            fontSize: "18px",
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            transition: "0.2s ease"
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(235, 64, 52, 0.2)"; }}
                        onMouseOut={(e) => { e.currentTarget.style.color = "#A09EBD"; e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)"; }}
                    >
                        ✕
                    </button>
                </div>

                {/* SEÇÃO DE INFORMAÇÕES DO CHAMADO */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 pb-4" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
                    <div>
                        <h4 className="fw-bold mb-2 text-white" style={{ fontSize: "1.2rem", letterSpacing: "0.3px" }}>{chamado?.titulo}</h4>
                        <div className="d-flex gap-2 mt-2">
                            <span style={{ backgroundColor: "rgba(5, 187, 208, 0.12)", color: "#05BBD0", border: "1px solid rgba(5, 187, 208, 0.3)", padding: "4px 12px", borderRadius: "20px", fontSize: "0.78rem", fontWeight: "500" }}>
                                Chamado #{chamado?.id}
                            </span>
                            <span style={{ backgroundColor: "rgba(255, 255, 255, 0.06)", color: "#D1CFe3", border: "1px solid rgba(255, 255, 255, 0.1)", padding: "4px 12px", borderRadius: "20px", fontSize: "0.78rem" }}>
                                {chamado?.categoria?.nome || "Suporte Geral"}
                            </span>
                        </div>
                    </div>
                    
                    <div className="p-3 rounded" style={{ background: "rgba(0, 0, 0, 0.25)", border: "1px solid rgba(255, 255, 255, 0.04)", minWidth: "240px" }}>
                        <div className="d-flex flex-column gap-1" style={{ fontSize: "0.85rem" }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <span style={{ color: "#A09EBD" }}>Técnico Responsável:</span>
                                <strong style={{ color: "#05BBD0", marginLeft: "8px" }}>
                                    {isResolvido ? (atendimento?.tecnico?.nome || "-") : (chamado?.tecnico?.nome || "-")}
                                </strong>
                            </div>
                            {isResolvido && atendimento?.dataAtendimento && (
                                <div className="d-flex justify-content-between align-items-center mt-1">
                                    <span style={{ color: "#A09EBD" }}>Finalizado em:</span>
                                    <span style={{ color: "#E2E2E2", fontWeight: "500", marginLeft: "8px" }}>
                                        {new Date(atendimento.dataAtendimento).toLocaleString("pt-BR", {
                                            day: "2-digit", month: "2-digit", year: "numeric",
                                            hour: "2-digit", minute: "2-digit"
                                        })}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* CORPO: ÁREA DA SOLUÇÃO */}
                <div className="mb-4 d-flex flex-column flex-grow-1">
                    <label className="form-label mb-2" style={{ color: "#A09EBD", fontWeight: "500", fontSize: "0.95rem", letterSpacing: "0.5px" }}>
                        Descrição da solução aplicada
                    </label>
                    
                    {isResolvido ? (
                        carregando ? (
                            <div className="text-center py-5 rounded" style={{ background: "rgba(0, 0, 0, 0.15)", border: "1px solid rgba(255,255,255,0.02)" }}>
                                <div className="spinner-border text-info mb-2" role="status" style={{ width: "1.5rem", height: "1.5rem" }}></div>
                                <p className="mb-0" style={{ color: "#A09EBD", fontSize: "0.9rem" }}>Buscando dados do atendimento...</p>
                            </div>
                        ) : (
                            <div
                                className="p-3 rounded custom-scrollbar"
                                style={{
                                    background: "rgba(0, 0, 0, 0.2)",
                                    border: "1px solid rgba(255, 255, 255, 0.02)",
                                    borderLeft: "4px solid #05BBD0",
                                    minHeight: "150px",
                                    maxHeight: "260px",
                                    overflowY: "auto",
                                    whiteSpace: "pre-wrap",
                                    color: "#E2E2E2",
                                    fontSize: "0.95rem",
                                    lineHeight: "1.6"
                                }}
                            >
                                {atendimento ? atendimento.descricaoSolucao : "Nenhum dado de fechamento registrado."}
                            </div>
                        )
                    ) : (
                        <textarea
                            className="form-control text-white custom-scrollbar glow-textarea"
                            rows="5"
                            placeholder="Descreva detalhadamente os procedimentos técnicos realizados para a resolução deste chamado..."
                            value={descricaoSolucao}
                            onChange={(e) => setDescricaoSolucao(e.target.value)}
                            style={{
                                background: "rgba(0, 0, 0, 0.15)",
                                border: "1px solid rgba(5, 187, 208, 0.2)",
                                color: "white",
                                minHeight: "150px",
                                borderRadius: "8px",
                                padding: "14px",
                                resize: "none",
                                fontSize: "0.95rem",
                                lineHeight: "1.5"
                            }}
                        />
                    )}
                </div>

                {/* RODAPÉ DO MODAL (BOTÕES DE AÇÃO) */}
                <div className="d-flex justify-content-end mt-2 gap-3">
                    {isResolvido ? (
                        <button className="btn btn-glass-secondary px-5 py-2" onClick={fechar} style={{ borderRadius: "8px", fontWeight: "500", fontSize: "0.95rem" }}>
                            Fechar
                        </button>
                    ) : (
                        <>
                            <button className="btn btn-glass-secondary px-4 py-2" onClick={fechar} style={{ borderRadius: "8px", fontWeight: "500", fontSize: "0.95rem" }}>
                                Cancelar
                            </button>
                            <button
                                className="btn btn-neon-submit px-4 py-2"
                                disabled={!descricaoSolucao.trim()}
                                onClick={handleFinalizarAtendimento}
                                style={{ 
                                    borderRadius: "8px", 
                                    fontWeight: "600",
                                    fontSize: "0.95rem",
                                    opacity: descricaoSolucao.trim() ? 1 : 0.4,
                                    cursor: descricaoSolucao.trim() ? "pointer" : "not-allowed"
                                }}
                            >
                                ✔ Concluir Atendimento
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ModalAtendimento;