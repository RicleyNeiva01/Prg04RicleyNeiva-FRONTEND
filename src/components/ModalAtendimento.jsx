import React, { useState, useEffect, useCallback } from "react";
import {
    cadastrarAtendimento,
    buscarAtendimentoPorChamado
} from "../services/atendimentoService";
import { FaTimes, FaCheck } from "react-icons/fa";

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
        <div className="modal-overlay" onClick={fechar}>
            
            <div className="modal-glass-card text-start" onClick={(e) => e.stopPropagation()} style={{ width: "750px", maxWidth: "95%" }}>
                
                {/* CABEÇALHO DO MODAL */}
                <div className="modal-header-custom d-flex justify-content-between align-items-center mb-4">
                    <h3 className="titulo-pagina m-0">
                        {isResolvido ? "📄 Detalhes do Atendimento" : "🛠 Finalizar Atendimento"}
                    </h3>
                    <button className="fechar-modal" onClick={fechar} title="Fechar">
                        &times;
                    </button>
                </div>

                {/* SEÇÃO DE INFORMAÇÕES DO CHAMADO */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 pb-4" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                    <div>
                        <h4 className="fw-bold mb-2 text-white" style={{ fontSize: "1.2rem", letterSpacing: "0.3px" }}>
                            {chamado?.titulo}
                        </h4>
                        <div className="d-flex gap-2 mt-2">
                            <span className="badge" style={{ backgroundColor: "rgba(5, 187, 208, 0.15)", color: "#05BBD0", border: "1px solid rgba(5, 187, 208, 0.3)" }}>
                                Chamado #{chamado?.id}
                            </span>
                            <span className="badge" style={{ backgroundColor: "rgba(255, 255, 255, 0.06)", color: "#D1CFe3", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
                                {chamado?.categoria?.nome || "Suporte Geral"}
                            </span>
                        </div>
                    </div>
                    
                    <div className="p-3 rounded input-glass" style={{ minWidth: "250px" }}>
                        <div className="d-flex flex-column gap-2" style={{ fontSize: "0.85rem" }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="texto-ajuda m-0">Técnico Responsável:</span>
                                <strong style={{ color: "#05BBD0" }}>
                                    {isResolvido ? (atendimento?.tecnico?.nome || "-") : (chamado?.tecnico?.nome || "-")}
                                </strong>
                            </div>
                            {isResolvido && atendimento?.dataAtendimento && (
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="texto-ajuda m-0">Finalizado em:</span>
                                    <span className="text-white fw-medium">
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
                    <label className="form-label">
                        Descrição da solução aplicada
                    </label>
                    
                    {isResolvido ? (
                        carregando ? (
                            <div className="text-center py-5 rounded input-glass d-flex flex-column align-items-center justify-content-center">
                                <div className="spinner-border text-info mb-2" role="status"></div>
                                <span className="texto-ajuda">Buscando dados do atendimento...</span>
                            </div>
                        ) : (
                            <div 
                                className="p-3 rounded input-glass custom-scrollbar" 
                                style={{ minHeight: "150px", maxHeight: "260px", overflowY: "auto", whiteSpace: "pre-wrap", borderLeft: "4px solid #05BBD0" }}
                            >
                                {atendimento ? atendimento.descricaoSolucao : "Nenhum dado de fechamento registrado."}
                            </div>
                        )
                    ) : (
                        <textarea
                            className="form-control input-glass custom-scrollbar"
                            rows="5"
                            placeholder="Descreva detalhadamente os procedimentos técnicos realizados para a resolução deste chamado..."
                            value={descricaoSolucao}
                            onChange={(e) => setDescricaoSolucao(e.target.value)}
                            style={{ minHeight: "150px", resize: "none" }}
                        />
                    )}
                </div>

                {/* RODAPÉ DO MODAL (BOTÕES DE AÇÃO) */}
                <div className="acoes-formulario pt-3 mt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                    {isResolvido ? (
                        <button className="btn btn-cancelar d-flex align-items-center justify-content-center ms-auto" onClick={fechar}>
                            <FaTimes className="me-2" /> Fechar
                        </button>
                    ) : (
                        <>
                            <button className="btn btn-cancelar d-flex align-items-center justify-content-center" onClick={fechar}>
                                <FaTimes className="me-2" /> Cancelar
                            </button>
                            
                            <button
                                className="btn btn-custom d-flex align-items-center justify-content-center"
                                disabled={!descricaoSolucao.trim()}
                                onClick={handleFinalizarAtendimento}
                            >
                                <FaCheck className="me-2" /> Concluir Atendimento
                            </button>
                        </>
                    )}
                </div>

            </div>
            
        </div>
    );
}

export default ModalAtendimento;