import React from "react";

function TabelaTecnico({ dados, aoExcluir, aoEditar }) {

    return (

        <div className="card shadow-lg">

            <div className="card-header card-header-custom">
                <h5 className="mb-0">
                    🛠️ Lista de Técnicos
                </h5>
            </div>

            <div className="card-body p-0">

                <table className="table table-custom table-hover align-middle mb-0">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Especialidade</th>
                            <th>Status</th>
                            <th className="text-center">Ações</th>
                        </tr>
                    </thead>

                    <tbody>

                        {dados && dados.length > 0 ? (

                            dados.map((tecnico) => (

                                <tr key={tecnico.id}>

                                    <td className="id-custom">
                                        #{tecnico.id}
                                    </td>

                                    <td>{tecnico.nome}</td>

                                    <td>{tecnico.email}</td>

                                    <td>{tecnico.especialidade}</td>

                                    <td>

                                        <span
                                            className={`badge ${
                                                tecnico.ativo
                                                    ? "badge-ativo"
                                                    : "badge-inativo"
                                            }`}
                                        >
                                            {tecnico.ativo ? "Ativo" : "Inativo"}
                                        </span>

                                    </td>

                                    <td className="text-center">

                                        <div className="d-flex justify-content-center gap-2">

                                            <button
                                                className="btn btn-editar btn-sm px-3"
                                                onClick={() => aoEditar(tecnico)}
                                            >
                                                ✏️ Editar
                                            </button>

                                            <button
                                                className="btn btn-excluir excluir btn-sm px-3"
                                                onClick={() => aoExcluir(tecnico.id)}
                                            >
                                                🗑 Excluir
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td colSpan="6" className="text-center py-5">

                                    <h5>
                                        Nenhum técnico encontrado.
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

export default TabelaTecnico;