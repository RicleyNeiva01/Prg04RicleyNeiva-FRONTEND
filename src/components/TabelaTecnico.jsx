import React from "react";
import { FaEdit, FaTrashAlt, FaTools, FaInbox, FaUndo } from 'react-icons/fa';

function TabelaTecnico({ dados, aoExcluir, aoEditar, aoReativar }) {
    return (
        <div className="card shadow-lg">
            <div className="card-header card-header-custom">
                <h5 className="mb-0">
                    <FaTools className="me-2" /> Lista de Técnicos
                </h5>
            </div>
            <div className="card-body p-0 table-responsive">
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
                                            className={`badge ${tecnico.ativo
                                                ? "badge-ativo"
                                                : "badge-inativo"
                                                }`}
                                        >
                                            {tecnico.ativo ? "Ativo" : "Inativo"}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center gap-2">
                                            {/* Renderização Condicional Idêntica a de Usuários */}
                                            {tecnico.ativo ? (
                                                <>
                                                    {/* Técnico Ativo: Mostra Editar e Lixeira */}
                                                    <button
                                                        className="btn btn-editar btn-sm"
                                                        onClick={() => aoEditar(tecnico)}
                                                        title="Editar"
                                                    >
                                                        <FaEdit />
                                                    </button>

                                                    <button
                                                        className="btn btn-excluir excluir btn-sm"
                                                        onClick={() => aoExcluir(tecnico.id)}
                                                        title="Excluir"
                                                    >
                                                        <FaTrashAlt />
                                                    </button>
                                                </>
                                            ) : (
                                                /* Técnico Inativo: Mostra SOMENTE o Botão Reativar estilizado */
                                                <button
                                                    className="btn btn-outline-success btn-sm px-3 py-1 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                                                    onClick={() => aoReativar(tecnico.id)}
                                                    title="Reativar Técnico"
                                                    style={{ fontWeight: "600", borderRadius: "20px", transition: "0.2s" }}
                                                >
                                                    <FaUndo size={13} /> Reativar
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-5 text-muted">
                                    <FaInbox size={50} className="mb-3 opacity-50" />
                                    <h5 className="text-secondary">
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