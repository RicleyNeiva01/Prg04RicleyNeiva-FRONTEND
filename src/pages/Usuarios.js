import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Tabela from "../components/Tabela";
import ModalUsuario from "../components/ModalUsuario";
import ToastMensagem from "../components/ToastMensagem";
import ModalConfirmacao from "../components/ModalConfirmacao";
import { FaUndo, FaSearch, FaUsers } from "react-icons/fa";

import {
    listarUsuarios,
    buscarUsuarioPorNome,
    cadastrarUsuario,
    atualizarUsuario,
    excluirUsuario,
    reativarUsuario
} from "../services/usuarioService";

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [usuarioEditando, setUsuarioEditando] = useState(null);
    const [nomeBusca, setNomeBusca] = useState("");
    const [mostrarToast, setMostrarToast] = useState(false);
    const [mensagemToast, setMensagemToast] = useState("");
    const [tipoToast, setTipoToast] = useState("success");
    const [mostrarInativos, setMostrarInativos] = useState(false);
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);

    // Estados do Modal de Exclusão
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
    const [idExcluir, setIdExcluir] = useState(null);

    // Novos Estados do Modal de Reativação
    const [mostrarConfirmacaoReativar, setMostrarConfirmacaoReativar] = useState(false);
    const [idReativar, setIdReativar] = useState(null);

    const ativos = usuarios.filter((usuario) => usuario.ativo).length;
    const inativos = usuarios.filter((usuario) => !usuario.ativo).length;

    const carregarUsuarios = useCallback(async () => {
        try {
            const response = await listarUsuarios(mostrarInativos, paginaAtual);
            setUsuarios(response.data.content || response.data);
            if (response.data.totalPages !== undefined) {
                setTotalPaginas(response.data.totalPages);
            }
        } catch (error) {
            console.error(error);
        }
    }, [mostrarInativos, paginaAtual]);

    useEffect(() => {
        carregarUsuarios();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paginaAtual, mostrarInativos]);

    async function handlePesquisar() {
        if (nomeBusca.trim() === "") {
            setPaginaAtual(0);
            carregarUsuarios();
            return;
        }
        try {
            const response = await buscarUsuarioPorNome(nomeBusca, mostrarInativos, 0);
            setUsuarios(response.data.content || response.data);
            if (response.data.totalPages !== undefined) {
                setTotalPaginas(response.data.totalPages);
            }
            if ((response.data.content || response.data).length === 0) {
                mostrarMensagem("Nenhum usuário encontrado.", "warning");
            }
        } catch (error) {
            mostrarMensagem("Erro ao pesquisar usuários.", "danger");
        }
    }

    function mostrarMensagem(mensagem, tipo) {
        setMensagemToast(mensagem);
        setTipoToast(tipo);
        setMostrarToast(true);
        setTimeout(() => setMostrarToast(false), 3000);
    }

    async function handleSalvarUsuario(usuario) {
        try {
            const usuarioFormatado = {
                ...usuario,
                cpf: usuario.cpf ? usuario.cpf.replace(/\D/g, "") : null,
                telefone: usuario.telefone ? usuario.telefone.replace(/\D/g, "") : null
            };
            if (usuario.id) {
                await atualizarUsuario(usuario.id, usuarioFormatado);
                mostrarMensagem("Usuário atualizado com sucesso!", "success");
            } else {
                await cadastrarUsuario(usuarioFormatado);
                mostrarMensagem("Usuário cadastrado com sucesso!", "success");
            }
            setMostrarFormulario(false);
            setUsuarioEditando(null);
            carregarUsuarios();
        } catch (error) {
            const mensagem =
                error.response?.data?.message ||
                error.response?.data?.erro ||
                "Erro ao salvar usuário!";
            mostrarMensagem(mensagem, "danger");
        }
    }

    // Ações de Exclusão
    function handleExcluirUsuario(id) {
        setIdExcluir(id);
        setMostrarConfirmacao(true);
    }

    async function confirmarExclusao() {
        try {
            await excluirUsuario(idExcluir);
            mostrarMensagem("Usuário excluído com sucesso!", "warning");
            carregarUsuarios();
        } catch (error) {
            const mensagem =
                error.response?.data?.message ||
                error.response?.data?.erro ||
                "Erro ao excluir usuário!";
            mostrarMensagem(mensagem, "danger");
        }
        setMostrarConfirmacao(false);
        setIdExcluir(null);
    }

    // Ações de Reativação
    function handleReativarUsuarioClicado(id) {
        setIdReativar(id);
        setMostrarConfirmacaoReativar(true); // Abre o modal de reativação
    }

    async function confirmarReativacao() {
        try {
            await reativarUsuario(idReativar);
            mostrarMensagem("Usuário reativado com sucesso!", "success");
            carregarUsuarios();
        } catch (error) {
            const mensagem =
                error.response?.data?.message ||
                error.response?.data?.erro ||
                "Erro ao reativar usuário!";
            mostrarMensagem(mensagem, "danger");
        }
        setMostrarConfirmacaoReativar(false); // Fecha o modal
        setIdReativar(null);
    }

    function handleEditarUsuario(usuario) {
        setUsuarioEditando(usuario);
        setMostrarFormulario(true);
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar paginaAtual="usuarios" />
            <main className="container py-5 flex-grow-1">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center align-items-start mb-4 gap-3">
                    <div>
                        <h2 className="titulo-pagina">👥 Gerenciamento de Usuários</h2>
                        <p className="subtitulo-pagina mb-0">
                            Cadastre, edite e gerencie os usuários do sistema DeskFlow.
                        </p>
                    </div>
                    <button className="btn btn-custom shadow fw-bold px-4"
                        onClick={() => { setUsuarioEditando(null); setMostrarFormulario(true); }}>
                        ➕ Novo Usuário
                    </button>
                </div>

                <div className="tecnicos-hero glass-card mb-4 p-4">
                    <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
                        <div className="d-flex align-items-center gap-3">
                            <div className="hero-icon-badge">
                                <FaUsers />
                            </div>
                            <div>
                                <h4 className="mb-1">Painel premium de usuários</h4>
                                <p className="mb-0">Acompanhe os acessos da plataforma com uma experiência mais elegante.</p>
                            </div>
                        </div>
                        <div className="d-flex flex-wrap gap-2">
                            <span className="chip chip-cyan">Ativos: {ativos}</span>
                            <span className="chip chip-violet">Inativos: {inativos}</span>
                        </div>
                    </div>
                </div>

                <div className="tecnicos-search glass-card p-3 mb-4">
                    <div className="d-flex flex-column flex-md-row gap-2 mb-3">
                        <div className="input-group">
                            <span className="input-group-text">
                                <FaSearch />
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Pesquisar por nome..."
                                value={nomeBusca}
                                onChange={(e) => {
                                    setNomeBusca(e.target.value);
                                    if (e.target.value === "") {
                                        setPaginaAtual(0);
                                        carregarUsuarios();
                                    }
                                }}
                                onKeyDown={(e) => e.key === "Enter" && handlePesquisar()}
                            />
                        </div>
                        <button className="btn btn-custom px-4" onClick={handlePesquisar}>
                            Pesquisar
                        </button>
                    </div>
                    <div className="form-check text-start ms-1">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="mostrarInativosUsuario"
                            checked={mostrarInativos}
                            onChange={(e) => { setMostrarInativos(e.target.checked); setPaginaAtual(0); }}
                            style={{ cursor: "pointer" }}
                        />
                        <label className="form-check-label ms-2 text-white" htmlFor="mostrarInativosUsuario"
                            style={{ cursor: "pointer" }}>
                            Mostrar inativos
                        </label>
                    </div>
                </div>

                <Tabela 
                    dados={usuarios} 
                    aoExcluir={handleExcluirUsuario} 
                    aoEditar={handleEditarUsuario} 
                    aoReativar={handleReativarUsuarioClicado} // Passamos a função que abre o modal
                />

                {totalPaginas > 1 && (
                    <nav className="d-flex justify-content-center mt-4">
                        <ul className="pagination pagination-deskflow">
                            <li className={`page-item ${paginaAtual === 0 ? "disabled" : ""}`}>
                                <button className="page-link" onClick={() => setPaginaAtual(paginaAtual - 1)}>
                                    Anterior
                                </button>
                            </li>
                            <li className="page-item disabled">
                                <span className="page-link page-link-text">
                                    Página {paginaAtual + 1} de {totalPaginas}
                                </span>
                            </li>
                            <li className={`page-item ${paginaAtual === totalPaginas - 1 ? "disabled" : ""}`}>
                                <button className="page-link" onClick={() => setPaginaAtual(paginaAtual + 1)}>
                                    Próxima
                                </button>
                            </li>
                        </ul>
                    </nav>
                )}

                <ModalUsuario mostrar={mostrarFormulario}
                    fechar={() => { setMostrarFormulario(false); setUsuarioEditando(null); }}
                    aoSalvar={handleSalvarUsuario} usuario={usuarioEditando} />

                <ToastMensagem mostrar={mostrarToast} mensagem={mensagemToast} tipo={tipoToast} />

                {/* Modal de Exclusão Original */}
                <ModalConfirmacao 
                    mostrar={mostrarConfirmacao}
                    fechar={() => { setMostrarConfirmacao(false); setIdExcluir(null); }}
                    aoConfirmar={confirmarExclusao}
                    titulo="Confirmar Exclusão"
                    mensagem="Tem certeza que deseja desativar este usuário?" 
                />

                {/* NOVO Modal de Reativação COM AS PROPS NOVAS */}
                <ModalConfirmacao 
                    mostrar={mostrarConfirmacaoReativar}
                    fechar={() => { setMostrarConfirmacaoReativar(false); setIdReativar(null); }}
                    aoConfirmar={confirmarReativacao}
                    titulo="Confirmar Reativação"
                    mensagem="Tem certeza que deseja reativar o acesso deste usuário?" 
                    textoBotaoConfirmar="Reativar"
                    iconeBotaoConfirmar={<FaUndo className="me-2" />}
                    classeBotaoConfirmar="btn btn-success"
                />
            </main>
            <Footer />
        </div>
    );
}

export default Usuarios;