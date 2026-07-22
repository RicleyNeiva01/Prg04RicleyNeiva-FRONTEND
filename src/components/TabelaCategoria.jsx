import React from "react";
import { FaEdit, FaTrashAlt, FaTags, FaInbox } from 'react-icons/fa';

function TabelaCategoria({ dados, aoExcluir, aoEditar }) {
    const totalCategorias = dados?.length || 0;

    return (
        <div className="table-premium-card glass-card">
            <div className="table-premium-header">
                <div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                        <div className="table-icon-badge">
                            <FaTags />
                        </div>
                        <h5 className="mb-0">Catálogo de categorias</h5>
                    </div>
                    <p className="mb-0">Uma visão premium e organizada das categorias do sistema.</p>
                </div>
                <div className="d-flex flex-wrap gap-2">
                    <span className="chip chip-cyan">Total: {totalCategorias}</span>
                </div>
            </div>

            <div className="card-body p-0 table-responsive">
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
                                <tr key={categoria.id} className="table-row-premium">
                                    <td className="id-custom">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="tecnico-avatar">
                                                {categoria.nome?.charAt(0)?.toUpperCase() || "C"}
                                            </div>
                                            <div>
                                                <div className="fw-semibold text-white">#{categoria.id}</div>
                                                <small className="text-muted">Categoria</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="fw-semibold text-white">{categoria.nome}</div>
                                        <small className="text-muted">Classificação</small>
                                    </td>
                                    <td>{categoria.descricao || "Sem descrição"}</td>
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center gap-2">
                                            <button
                                                className="btn premium-action btn-editar"
                                                onClick={() => aoEditar(categoria)}
                                                title="Editar"
                                            >
                                                <FaEdit />
                                            </button>

                                            <button
                                                className="btn premium-action btn-excluir"
                                                onClick={() => aoExcluir(categoria.id)}
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
                                <td colSpan="4" className="text-center py-5">
                                    <div className="empty-state">
                                        <FaInbox size={46} className="mb-3 opacity-75" />
                                        <h5 className="mb-2">Nenhuma categoria encontrada.</h5>
                                        <p className="mb-0">Tente ajustar a busca ou cadastrar uma nova categoria.</p>
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

export default TabelaCategoria;