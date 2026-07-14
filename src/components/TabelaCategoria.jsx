import React from "react";

function TabelaCategoria({ dados, aoExcluir, aoEditar }) {

    return (

        <div className="card shadow-lg">

            <div className="card-header card-header-custom">
                <h5 className="mb-0">
                    🏷️ Lista de Categorias
                </h5>
            </div>

            <div className="card-body p-0">

                <table className="table table-custom table-hover align-middle mb-0">

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th className="text-center">Ações</th>

                        </tr>

                    </thead>

                    <tbody>

                        {dados && dados.length > 0 ? (

                            dados.map((categoria) => (

                                <tr key={categoria.id}>

                                    <td className="id-custom">
                                        #{categoria.id}
                                    </td>

                                    <td>{categoria.nome}</td>

                                    <td>{categoria.descricao}</td>

                                    <td className="text-center">

                                        <div className="d-flex justify-content-center gap-2">

                                            <button
                                                className="btn btn-editar btn-sm px-3"
                                                onClick={() => aoEditar(categoria)}
                                            >
                                                ✏️ Editar
                                            </button>

                                            <button
                                                className="btn btn-excluir excluir btn-sm px-3"
                                                onClick={() => aoExcluir(categoria.id)}
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
                                    colSpan="4"
                                    className="text-center py-5"
                                >

                                    <h5>
                                        Nenhuma categoria encontrada.
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

export default TabelaCategoria;