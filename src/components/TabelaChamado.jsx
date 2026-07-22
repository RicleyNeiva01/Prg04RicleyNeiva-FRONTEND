import React from "react";
import { FaEye, FaEdit, FaCommentDots, FaUserPlus, FaTools, FaTrashAlt, FaTicketAlt, FaInbox, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import useAuth from "../hooks/useAuth";

function TabelaChamado({
    dados,
    aoExcluir,
    aoEditar,
    aoAtribuirTecnico,
    aoComentarios,
    aoAtender
}) {
    const { isAdmin, isTecnico, isUsuario } = useAuth();

    function badgeStatus(status) {
        switch (status) {
            case "ABERTO": return "status-aberto";
            case "EM_ANDAMENTO": return "status-andamento";
            case "RESOLVIDO": return "status-resolvido";
            default: return "status-default";
        }
    }

    function badgePrioridade(prioridade) {
        switch (prioridade) {
            case "URGENTE": return "priority-urgente";
            case "ALTA": return "priority-alta";
            case "MEDIA": return "priority-media";
            case "BAIXA": return "priority-baixa";
            default: return "status-default";
        }
    }

    const totalChamados = dados?.length || 0;
    const abertos = dados?.filter((chamado) => chamado.status === "ABERTO").length || 0;
    const emAndamento = dados?.filter((chamado) => chamado.status === "EM_ANDAMENTO").length || 0;

    return (
        <div className="table-premium-card glass-card">
            <div className="table-premium-header">
                <div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                        <div className="table-icon-badge">
                            <FaTicketAlt />
                        </div>
                        <h5 className="mb-0">Central de chamados</h5>
                    </div>
                    <p className="mb-0">Uma visão elegante e organizada dos tickets em andamento.</p>
                </div>
                <div className="d-flex flex-wrap gap-2">
                    <span className="chip chip-cyan">Abertos: {abertos}</span>
                    <span className="chip chip-violet">Andamento: {emAndamento}</span>
                    <span className="chip chip-cyan">Total: {totalChamados}</span>
                </div>
            </div>

            <div className="card-body p-0 table-responsive">
                <table className="table table-custom table-hover align-middle mb-0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Categoria</th>
                            <th>Solicitante</th>
                            <th>Técnico</th>
                            <th>Prioridade</th>
                            <th>Status</th>
                            <th>Abertura</th>
                            <th className="text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dados && dados.length > 0 ? (
                            dados.map((chamado) => (
                                <tr key={chamado.id} className="table-row-premium">
                                    <td className="id-custom">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="tecnico-avatar">
                                                {chamado.titulo?.charAt(0)?.toUpperCase() || "C"}
                                            </div>
                                            <div>
                                                <div className="fw-semibold text-white">#{chamado.id}</div>
                                                <small className="text-muted">Ticket</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="fw-semibold text-white">{chamado.titulo}</div>
                                        <small className="text-muted">Chamado ativo</small>
                                    </td>
                                    <td>{chamado.categoria?.nome || "-"}</td>
                                    <td>{chamado.usuario?.nome || "-"}</td>
                                    <td>{chamado.tecnico?.nome || "-"}</td>
                                    <td>
                                        <span className={`priority-pill ${badgePrioridade(chamado.prioridade)}`}>
                                            {chamado.prioridade === "URGENTE" ? "Urgente"
                                                : chamado.prioridade === "ALTA" ? "Alta"
                                                    : chamado.prioridade === "MEDIA" ? "Média"
                                                        : "Baixa"}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-pill ${badgeStatus(chamado.status)}`}>
                                            {chamado.status === "ABERTO" ? <><FaTimesCircle className="me-1" /> Aberto</>
                                                : chamado.status === "EM_ANDAMENTO" ? <><FaTools className="me-1" /> Em Andamento</>
                                                    : <><FaCheckCircle className="me-1" /> Resolvido</>}
                                        </span>
                                    </td>
                                    <td>
                                        {chamado.dataAbertura
                                            ? new Date(chamado.dataAbertura).toLocaleDateString("pt-BR")
                                            : "-"}
                                    </td>
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center gap-2">
                                            {(isAdmin || (isUsuario && chamado.status === "ABERTO")) && (
                                                <button
                                                    className="btn premium-action btn-editar"
                                                    onClick={() => aoEditar(chamado)}
                                                    title={chamado.status === "RESOLVIDO" ? "Visualizar" : "Editar"}
                                                >
                                                    {chamado.status === "RESOLVIDO" ? <FaEye /> : <FaEdit />}
                                                </button>
                                            )}

                                            <button
                                                className="btn premium-action btn-comentario"
                                                onClick={() => aoComentarios(chamado)}
                                                title="Comentários"
                                            >
                                                <FaCommentDots />
                                            </button>

                                            {isAdmin && chamado.status === "ABERTO" && (
                                                <button
                                                    className="btn premium-action btn-atribuir"
                                                    onClick={() => aoAtribuirTecnico(chamado)}
                                                    title="Atribuir Técnico"
                                                >
                                                    <FaUserPlus />
                                                </button>
                                            )}

                                            {isTecnico && chamado.status === "EM_ANDAMENTO" && (
                                                <button
                                                    className="btn premium-action btn-atendimento"
                                                    onClick={() => aoAtender(chamado)}
                                                    title="Registrar Atendimento"
                                                >
                                                    <FaTools />
                                                </button>
                                            )}

                                            {chamado.status === "RESOLVIDO" && (
                                                <button
                                                    className="btn premium-action btn-atendimento"
                                                    onClick={() => aoAtender(chamado)}
                                                    title="Visualizar Atendimento"
                                                >
                                                    <FaEye />
                                                </button>
                                            )}

                                            {isAdmin && chamado.status !== "RESOLVIDO" && (
                                                <button
                                                    className="btn premium-action btn-excluir"
                                                    onClick={() => aoExcluir(chamado.id)}
                                                    title="Excluir"
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center py-5">
                                    <div className="empty-state">
                                        <FaInbox size={46} className="mb-3 opacity-75" />
                                        <h5 className="mb-2">Nenhum chamado encontrado.</h5>
                                        <p className="mb-0">Tente ajustar a busca ou abrir um novo ticket.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TabelaChamado;    