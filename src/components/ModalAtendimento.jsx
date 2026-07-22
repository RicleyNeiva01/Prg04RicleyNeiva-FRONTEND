import React, { useState, useEffect, useCallback } from "react";
import {
    cadastrarAtendimento,
    buscarAtendimentoPorChamado
} from "../services/atendimentoService";
import { FaTimes, FaCheck, FaClipboardList, FaUserCog, FaCalendarAlt } from "react-icons/fa";

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
            <div className="modal-glass-card text-start" onClick={(e) => e.stopPropagation()} style={{ width: "780px", maxWidth: "95%" }}>
                <div className="modal-header-custom d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center gap-2">
                        <div className="hero-icon-badge" style={{ width: "42px", height: "42px" }}>
                            <FaClipboardList />
                        </div>
                        <div>
                            <h3 className="titulo-pagina m-0" style={{ fontSize: "1.25rem" }}>
                                {isResolvido ? "Detalhes do Atendimento" : "Finalizar Atendimento"}
                            </h3>
                            <p className="mb-0 texto-ajuda">Registro profissional da solução aplicada</p>
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

                        <div className="p-3 rounded-4" style={{ minWidth: "260px", background: "rgba(5, 187, 208, 0.08)", border: "1px solid rgba(5, 187, 208, 0.2)" }}>
                            <div className="d-flex align-items-center gap-2 mb-2">
                                <FaUserCog className="text-cyan" />
                                <span className="texto-ajuda m-0">Técnico responsável</span>
                            </div>
                            <div className="fw-semibold text-white">
                                {isResolvido ? (atendimento?.tecnico?.nome || "-") : (chamado?.tecnico?.nome || "-")}
                            </div>
                            {isResolvido && atendimento?.dataAtendimento && (
                                <div className="d-flex align-items-center gap-2 mt-3">
                                    <FaCalendarAlt className="text-cyan" />
                                    <span className="texto-ajuda m-0">
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

                <div className="mb-4 d-flex flex-column flex-grow-1">
                    <label className="form-label fw-semibold mb-2 text-white">
                        Descrição da solução aplicada
                    </label>

                    {isResolvido ? (
                        carregando ? (
                            <div className="text-center py-5 rounded-4 input-glass d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "180px" }}>
                                <div className="spinner-border text-info mb-2" role="status"></div>
                                <span className="texto-ajuda">Buscando dados do atendimento...</span>
                            </div>
                        ) : (
                            <div
                                className="p-3 rounded-4 input-glass custom-scrollbar"
                                style={{ minHeight: "180px", maxHeight: "280px", overflowY: "auto", whiteSpace: "pre-wrap", borderLeft: "4px solid #05BBD0" }}
                            >
                                {atendimento ? atendimento.descricaoSolucao : "Nenhum dado de fechamento registrado."}
                            </div>
                        )
                    ) : (
                        <textarea
                            className="form-control input-glass custom-scrollbar"
                            rows="6"
                            placeholder="Descreva detalhadamente os procedimentos técnicos realizados para a resolução deste chamado..."
                            value={descricaoSolucao}
                            onChange={(e) => setDescricaoSolucao(e.target.value)}
                            style={{ minHeight: "180px", resize: "none" }}
                        />
                    )}
                </div>

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