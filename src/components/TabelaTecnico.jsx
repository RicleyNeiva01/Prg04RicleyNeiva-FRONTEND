import React from "react";
import { FaEdit, FaTrashAlt, FaTools, FaInbox, FaUndo, FaUserCog, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function TabelaTecnico({ dados, aoExcluir, aoEditar, aoReativar }) {
    const totalTecnicos = dados?.length || 0;
    const ativos = dados?.filter((tecnico) => tecnico.ativo).length || 0;

    return (
        <div className="table-premium-card glass-card">
            <div className="table-premium-header">
                <div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                        <div className="table-icon-badge">
                            <FaUserCog />
                        </div>
                        <h5 className="mb-0">Equipe técnica</h5>
                    </div>
                    <p className="mb-0">Uma visão elegante e organizada dos técnicos do sistema.</p>
                </div>
                <div className="d-flex flex-wrap gap-2">
                    <span className="chip chip-cyan">Ativos: {ativos}</span>
                    <span className="chip chip-violet">Total: {totalTecnicos}</span>
                </div>
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
                                <tr key={tecnico.id} className="table-row-premium">
                                    <td className="id-custom">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="tecnico-avatar">
                                                {tecnico.nome?.charAt(0)?.toUpperCase() || "T"}
                                            </div>
                                            <div>
                                                <div className="fw-semibold text-white">#{tecnico.id}</div>
                                                <small className="text-muted">Cadastro</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="fw-semibold text-white">{tecnico.nome}</div>
                                        <small className="text-muted">Técnico especializado</small>
                                    </td>
                                    <td>{tecnico.email}</td>
                                    <td>
                                        <span className="specialty-pill">{tecnico.especialidade || "Não informada"}</span>
                                    </td>
                                    <td>
                                        <span className={`status-pill ${tecnico.ativo ? "status-ativo" : "status-inativo"}`}>
                                            {tecnico.ativo ? <><FaCheckCircle className="me-1" /> Ativo</> : <><FaTimesCircle className="me-1" /> Inativo</>}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center gap-2">
                                            {tecnico.ativo ? (
                                                <>
                                                    <button
                                                        className="btn premium-action btn-editar"
                                                        onClick={() => aoEditar(tecnico)}
                                                        title="Editar"
                                                    >
                                                        <FaEdit />
                                                    </button>

                                                    <button
                                                        className="btn premium-action btn-excluir"
                                                        onClick={() => aoExcluir(tecnico.id)}
                                                        title="Excluir"
                                                    >
                                                        <FaTrashAlt />
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    className="btn premium-action btn-reactivar"
                                                    onClick={() => aoReativar(tecnico.id)}
                                                    title="Reativar Técnico"
                                                >
                                                    <FaUndo className="me-2" /> Reativar
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-5">
                                    <div className="empty-state">
                                        <FaInbox size={46} className="mb-3 opacity-75" />
                                        <h5 className="mb-2">Nenhum técnico encontrado.</h5>
                                        <p className="mb-0">Tente ajustar a busca ou cadastrar um novo técnico.</p>
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

export default TabelaTecnico;