import React from "react";

function TabelaChamado({ dados, aoExcluir, aoEditar }) {

    function badgeStatus(status) {

        switch (status) {

            case "ABERTO":
                return "badge-aberto";

            case "EM_ANDAMENTO":
                return "badge-andamento";

            case "RESOLVIDO":
                return "badge-resolvido";

            default:
                return "bg-secondary";

        }

    }

    function badgePrioridade(prioridade) {
        switch (prioridade) {
            case "URGENTE":
                return "badge-urgente";
            case "ALTA":
                return "badge-alta";
            case "MEDIA":
                return "badge-media";
            case "BAIXA":
                return "badge-baixa";
            default:
                return "bg-secondary";
        }
    }

    return (

        <div className="card shadow-lg">

            <div className="card-header card-header-custom">

                <h5 className="mb-0">
                    🎫 Lista de Chamados
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
                                                className="btn btn-editar btn-sm px-3"
                                                onClick={() => aoEditar(chamado)}
                                            >
                                                ✏️ Editar
                                            </button>

                                            <button
                                                className="btn btn-excluir btn-sm px-3"
                                                onClick={() => aoExcluir(chamado.id)}
                                            >
                                                🗑 Excluir
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="9"
                                    className="text-center py-5"
                                >

                                    <h5>
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