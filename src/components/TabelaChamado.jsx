import React from "react";
import { FaEye, FaEdit, FaCommentDots, FaUserPlus, FaCheckCircle, FaTrashAlt, FaTicketAlt, FaInbox } from 'react-icons/fa';

function TabelaChamado({
    dados,
    aoExcluir,
    aoEditar,
    aoAtribuirTecnico,
    aoComentarios,
    aoResolver
}) {

    function badgeStatus(status) {
        switch (status) {
            case "ABERTO": return "badge-aberto";
            case "EM_ANDAMENTO": return "badge-andamento";
            case "RESOLVIDO": return "badge-resolvido";
            default: return "bg-secondary";
        }
    }

    function badgePrioridade(prioridade) {
        switch (prioridade) {
            case "URGENTE": return "badge-urgente";
            case "ALTA": return "badge-alta";
            case "MEDIA": return "badge-media";
            case "BAIXA": return "badge-baixa";
            default: return "bg-secondary";
        }
    }

    return (
        <div className="card shadow-lg">
            <div className="card-header card-header-custom">
                <h5 className="mb-0">
                    <FaTicketAlt className="me-2" /> Lista de Chamados
                </h5>
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
                                <tr key={chamado.id}>
                                    <td className="id-custom">
                                        #{chamado.id}
                                    </td>
                                    <td>{chamado.titulo}</td>
                                    <td>{chamado.categoria?.nome || "-"}</td>
                                    <td>{chamado.usuario?.nome || "-"}</td>
                                    <td>
                                        {chamado.tecnico?.nome || "-"}
                                    </td>
                                    <td>
                                        <span className={`badge ${badgePrioridade(chamado.prioridade)}`}>
                                            {chamado.prioridade === "URGENTE"
                                                ? "Urgente"
                                                : chamado.prioridade === "ALTA"
                                                    ? "Alta"
                                                    : chamado.prioridade === "MEDIA"
                                                        ? "Média"
                                                        : "Baixa"}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge ${badgeStatus(chamado.status)}`}>
                                            {chamado.status === "ABERTO"
                                                ? "Aberto"
                                                : chamado.status === "EM_ANDAMENTO"
                                                    ? "Em Andamento"
                                                    : "Resolvido"}
                                        </span>
                                    </td>
                                    <td>
                                        {chamado.dataAbertura
                                            ? new Date(chamado.dataAbertura).toLocaleDateString("pt-BR")
                                            : "-"}
                                    </td>
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center gap-2">
                                            <button
                                                className="btn btn-editar btn-sm"
                                                onClick={() => aoEditar(chamado)}
                                                title={chamado.status === "RESOLVIDO" ? "Visualizar" : "Editar"}
                                            >
                                                {chamado.status === "RESOLVIDO" ? (
                                                    <FaEye />
                                                ) : (
                                                    <FaEdit />
                                                )}
                                            </button>

                                            <button
                                                className="btn btn-comentario btn-sm"
                                                onClick={() => aoComentarios(chamado)}
                                                title="Comentários"
                                            >
                                                <FaCommentDots />
                                            </button>

                                            {chamado.status === "ABERTO" && (
                                                <button
                                                    className="btn btn-atribuir btn-sm"
                                                    onClick={() => aoAtribuirTecnico(chamado)}
                                                    title="Atribuir Técnico"
                                                >
                                                    <FaUserPlus />
                                                </button>
                                            )}

                                            {chamado.status === "EM_ANDAMENTO" && (
                                                <button
                                                    className="btn btn-resolver btn-sm"
                                                    onClick={() => aoResolver(chamado.id)}
                                                    title="Resolver Chamado"
                                                >
                                                    <FaCheckCircle />
                                                </button>
                                            )}

                                            <button
                                                className="btn btn-excluir btn-sm"
                                                onClick={() => aoExcluir(chamado.id)}
                                                title="Excluir"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="9"
                                    className="text-center py-5 text-muted"
                                >
                                    <FaInbox size={50} className="mb-3 opacity-50" />
                                    <h5 className="text-secondary">
                                        Nenhum chamado encontrado.
                                    </h5>
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