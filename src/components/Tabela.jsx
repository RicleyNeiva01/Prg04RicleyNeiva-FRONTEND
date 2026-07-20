import React from "react";
// 1. Importado o ícone FaUndo para simbolizar a reativação
import { FaEdit, FaTrashAlt, FaUsers, FaInbox, FaUndo } from 'react-icons/fa';

// 2. Adicionado o prop 'aoReativar' na assinatura do componente
function Tabela({ dados, aoExcluir, aoEditar, aoReativar }) {
    return (
        <div className="card shadow-lg">
            <div className="card-header card-header-custom">
                <h5 className="mb-0">
                    <FaUsers className="me-2" /> Lista de Usuários
                </h5>
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
                                <tr key={usuario.id}>
                                    <td className="id-custom">
                                        #{usuario.id}
                                    </td>
                                    <td>{usuario.nome}</td>
                                    <td>{usuario.email}</td>
                                    <td>
                                        <span
                                            className={`badge ${usuario.perfil === "ADMIN"
                                                ? "badge-admin"
                                                : usuario.perfil === "TECNICO"
                                                    ? "badge-tecnico"
                                                    : "badge-usuario"
                                                }`}
                                        >
                                            {usuario.perfil === "ADMIN"
                                                ? "Administrador"
                                                : usuario.perfil === "TECNICO"
                                                    ? "Técnico"
                                                    : "Usuário"}
                                        </span>
                                    </td>
                                    <td>
                                        <span
                                            className={`badge ${usuario.ativo
                                                ? "badge-ativo"
                                                : "badge-inativo"
                                                }`}
                                        >
                                            {usuario.ativo
                                                ? "Ativo"
                                                : "Inativo"}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center gap-2">
                                            {/* 3. Renderização Condicional Inteligente baseada no status 'ativo' */}
                                            {usuario.ativo ? (
                                                <>
                                                    {/* Usuário Ativo: Mostra Editar e Lixeira */}
                                                    <button
                                                        className="btn btn-editar btn-sm"
                                                        onClick={() => aoEditar(usuario)}
                                                        title="Editar"
                                                    >
                                                        <FaEdit />
                                                    </button>

                                                    <button
                                                        className="btn btn-excluir excluir btn-sm"
                                                        onClick={() => aoExcluir(usuario.id)}
                                                        title="Excluir"
                                                    >
                                                        <FaTrashAlt />
                                                    </button>
                                                </>
                                            ) : (
                                                /* Usuário Inativo: Mostra SOMENTE o Botão Reativar */
                                                <button
                                                    className="btn btn-outline-success btn-sm px-3 py-1 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                                                    onClick={() => aoReativar(usuario.id)}
                                                    title="Reativar Usuário"
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
                                        Nenhum usuário encontrado.
                                    </h5>
                                </td>s
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Tabela;