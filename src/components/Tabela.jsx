import React from "react";
import { FaEdit, FaTrashAlt, FaUsers, FaInbox, FaUndo, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function Tabela({ dados, aoExcluir, aoEditar, aoReativar }) {
    const totalUsuarios = dados?.length || 0;
    const ativos = dados?.filter((usuario) => usuario.ativo).length || 0;

    return (
        <div className="table-premium-card glass-card">
            <div className="table-premium-header">
                <div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                        <div className="table-icon-badge">
                            <FaUsers />
                        </div>
                        <h5 className="mb-0">Lista de usuários</h5>
                    </div>
                    <p className="mb-0">Uma visão premium, clara e organizada dos acessos do sistema.</p>
                </div>
                <div className="d-flex flex-wrap gap-2">
                    <span className="chip chip-cyan">Ativos: {ativos}</span>
                    <span className="chip chip-violet">Total: {totalUsuarios}</span>
                </div>
            </div>

            <div className="card-body p-0 table-responsive">
                <table className="table table-custom table-hover align-middle mb-0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Perfil</th>
                            <th>Status</th>
                            <th className="text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dados && dados.length > 0 ? (
                            dados.map((usuario) => (
                                <tr key={usuario.id} className="table-row-premium">
                                    <td className="id-custom">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="user-avatar">
                                                {usuario.nome?.charAt(0)?.toUpperCase() || "U"}
                                            </div>
                                            <div>
                                                <div className="fw-semibold text-white">#{usuario.id}</div>
                                                <small className="text-muted">Cadastro</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="fw-semibold text-white">{usuario.nome}</div>
                                        <small className="text-muted">Usuário do sistema</small>
                                    </td>
                                    <td>{usuario.email}</td>
                                    <td>
                                        <span className={`profile-pill ${usuario.perfil === "ADMIN" ? "profile-admin" : usuario.perfil === "TECNICO" ? "profile-tecnico" : "profile-user"}`}>
                                            {usuario.perfil === "ADMIN"
                                                ? "Administrador"
                                                : usuario.perfil === "TECNICO"
                                                    ? "Técnico"
                                                    : "Usuário"}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-pill ${usuario.ativo ? "status-ativo" : "status-inativo"}`}>
                                            {usuario.ativo ? <><FaCheckCircle className="me-1" /> Ativo</> : <><FaTimesCircle className="me-1" /> Inativo</>}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center gap-2">
                                            {usuario.ativo ? (
                                                <>
                                                    <button
                                                        className="btn premium-action btn-editar"
                                                        onClick={() => aoEditar(usuario)}
                                                        title="Editar"
                                                    >
                                                        <FaEdit />
                                                    </button>

                                                    <button
                                                        className="btn premium-action btn-excluir"
                                                        onClick={() => aoExcluir(usuario.id)}
                                                        title="Excluir"
                                                    >
                                                        <FaTrashAlt />
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    className="btn premium-action btn-reactivar"
                                                    onClick={() => aoReativar(usuario.id)}
                                                    title="Reativar Usuário"
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
                                        <h5 className="mb-2">Nenhum usuário encontrado.</h5>
                                        <p className="mb-0">Tente ajustar a busca ou cadastrar um novo usuário.</p>
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

export default Tabela;