import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TabelaChamado from "../components/TabelaChamado";
import ModalChamado from "../components/ModalChamado";
import ToastMensagem from "../components/ToastMensagem";
import ModalConfirmacao from "../components/ModalConfirmacao";
import ModalAtribuirTecnico from "../components/ModalAtribuirTecnico";
import ModalComentarios from "../components/ModalComentarios";
import ModalAtendimento from "../components/ModalAtendimento";
import useAuth from "../hooks/useAuth";
import { FaSearch, FaTicketAlt } from "react-icons/fa";

import {
    listarChamados,
    cadastrarChamado,
    atualizarChamado,
    excluirChamado,
    atribuirTecnico
} from "../services/chamadoService";

function Chamados() {
    const { isTecnico, isUsuario } = useAuth();

    const [chamados, setChamados] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [chamadoEditando, setChamadoEditando] = useState(null);
    const [mostrarModalTecnico, setMostrarModalTecnico] = useState(false);
    const [chamadoSelecionado, setChamadoSelecionado] = useState(null);
    const [mostrarComentarios, setMostrarComentarios] = useState(false);
    const [chamadoComentario, setChamadoComentario] = useState(null);
    const [tituloBusca, setTituloBusca] = useState("");
    const [mostrarToast, setMostrarToast] = useState(false);
    const [mensagemToast, setMensagemToast] = useState("");
    const [tipoToast, setTipoToast] = useState("success");
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
    const [idExcluir, setIdExcluir] = useState(null);
    const [filtroStatus, setFiltroStatus] = useState("");
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [mostrarModalAtendimento, setMostrarModalAtendimento] = useState(false);
    const [chamadoAtendimento, setChamadoAtendimento] = useState(null);

    const abertos = chamados.filter((chamado) => chamado.status === "ABERTO").length;
    const emAndamento = chamados.filter((chamado) => chamado.status === "EM_ANDAMENTO").length;
    const resolvidos = chamados.filter((chamado) => chamado.status === "RESOLVIDO").length;

    const carregarChamados = useCallback(async () => {
        try {
            const response = await listarChamados(filtroStatus, tituloBusca, paginaAtual);
            setChamados(response.data.content || response.data);
            if (response.data.totalPages !== undefined) {
                setTotalPaginas(response.data.totalPages);
            }
        } catch (error) {
            console.error(error);
        }
    }, [filtroStatus, tituloBusca, paginaAtual]);

    useEffect(() => {
        carregarChamados();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paginaAtual, filtroStatus]);

    async function handlePesquisar() {
        setPaginaAtual(0);
        if (tituloBusca.trim() === "") {
            carregarChamados();
            return;
        }
        try {
            const response = await listarChamados(filtroStatus, tituloBusca, 0);
            setChamados(response.data.content || response.data);
            if (response.data.totalPages !== undefined) {
                setTotalPaginas(response.data.totalPages);
            }
            if ((response.data.content || response.data).length === 0) {
                mostrarMensagem("Nenhum chamado encontrado.", "warning");
            }
        } catch (error) {
            mostrarMensagem("Erro ao pesquisar chamados.", "danger");
        }
    }

    function mostrarMensagem(mensagem, tipo) {
        setMensagemToast(mensagem);
        setTipoToast(tipo);
        setMostrarToast(true);
        setTimeout(() => setMostrarToast(false), 3000);
    }

    async function handleSalvarChamado(chamado) {
        try {
            if (chamado.id) {
                await atualizarChamado(chamado.id, chamado);
                mostrarMensagem("Chamado atualizado com sucesso!", "success");
            } else {
                await cadastrarChamado(chamado);
                mostrarMensagem("Chamado aberto com sucesso!", "success");
            }
            setMostrarFormulario(false);
            setChamadoEditando(null);
            await carregarChamados();
        } catch (error) {
            const mensagem =
                error.response?.data?.message ||
                error.response?.data?.erro ||
                "Erro ao salvar chamado!";
            mostrarMensagem(mensagem, "danger");
        }
    }

    function handleExcluirChamado(id) {
        setIdExcluir(id);
        setMostrarConfirmacao(true);
    }

    async function confirmarExclusao() {
        try {
            await excluirChamado(idExcluir);
            mostrarMensagem("Chamado excluído com sucesso!", "warning");
            await carregarChamados();
        } catch (error) {
            const mensagem =
                error.response?.data?.message ||
                error.response?.data?.erro ||
                "Erro ao excluir chamado!";
            mostrarMensagem(mensagem, "danger");
        }
        setMostrarConfirmacao(false);
        setIdExcluir(null);
    }

    function handleEditarChamado(chamado) {
        setChamadoEditando(chamado);
        setMostrarFormulario(true);
    }

    function handleAbrirModalTecnico(chamado) {
        setChamadoSelecionado(chamado);
        setMostrarModalTecnico(true);
    }

    function handleAbrirComentarios(chamado) {
        setChamadoComentario(chamado);
        setMostrarComentarios(true);
    }

    function handleAbrirAtendimento(chamado) {
        setChamadoAtendimento(chamado);
        setMostrarModalAtendimento(true);
    }

    async function handleSalvarAtribuicao(chamadoId, tecnicoId) {
        try {
            await atribuirTecnico(chamadoId, Number(tecnicoId));
            mostrarMensagem("Técnico atribuído com sucesso! Status alterado para Em Andamento.", "success");
            setMostrarModalTecnico(false);
            setChamadoSelecionado(null);
            await carregarChamados();
        } catch (error) {
            const mensagem =
                error.response?.data?.message ||
                error.response?.data?.erro ||
                "Erro ao atribuir técnico!";
            mostrarMensagem(mensagem, "danger");
        }
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar paginaAtual="chamados" />
            <main className="container py-5 flex-grow-1">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center align-items-start mb-4 gap-3">
                    <div>
                        <h2 className="titulo-pagina">
                            {isUsuario ? "🎫 Meus Chamados" : "🎫 Gerenciamento de Chamados"}
                        </h2>
                        <p className="subtitulo-pagina mb-0">
                            {isUsuario
                                ? "Acompanhe e gerencie seus chamados de suporte."
                                : "Acompanhe, edite e gerencie os chamados de suporte do DeskFlow."}
                        </p>
                    </div>
                    {!isTecnico && (
                        <button className="btn btn-custom shadow fw-bold px-4"
                            onClick={() => { setChamadoEditando(null); setMostrarFormulario(true); }}>
                            ➕ Novo Chamado
                        </button>
                    )}
                </div>

                <div className="tecnicos-hero glass-card mb-4 p-4">
                    <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
                        <div className="d-flex align-items-center gap-3">
                            <div className="hero-icon-badge">
                                <FaTicketAlt />
                            </div>
                            <div>
                                <h4 className="mb-1">Painel premium de chamados</h4>
                                <p className="mb-0">Organize e acompanhe os tickets com mais clareza e elegância.</p>
                            </div>
                        </div>
                        <div className="d-flex flex-wrap gap-2">
                            <span className="chip chip-cyan">Abertos: {abertos}</span>
                            <span className="chip chip-violet">Andamento: {emAndamento}</span>
                            <span className="chip chip-cyan">Resolvidos: {resolvidos}</span>
                        </div>
                    </div>
                </div>

                <div className="tecnicos-search glass-card p-3 mb-4">
                    <div className="d-flex gap-2 mb-2 flex-wrap flex-md-nowrap align-items-center">
                        <select
                            className="form-select w-auto"
                            value={filtroStatus}
                            onChange={(e) => {
                                setFiltroStatus(e.target.value);
                                setPaginaAtual(0);
                            }}
                            style={{ cursor: "pointer" }}
                        >
                            <option value="">Todos os Status</option>
                            <option value="ABERTO">Aberto</option>
                            <option value="EM_ANDAMENTO">Em Andamento</option>
                            <option value="RESOLVIDO">Resolvido</option>
                        </select>

                        <div className="input-group flex-grow-1">
                            <span className="input-group-text">
                                <FaSearch />
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Pesquisar por título..."
                                value={tituloBusca}
                                onChange={(e) => {
                                    const valor = e.target.value;
                                    setTituloBusca(valor);
                                    if (valor.trim() === "") {
                                        setPaginaAtual(0);
                                        carregarChamados();
                                    }
                                }}
                                onKeyDown={(e) => e.key === "Enter" && handlePesquisar()}
                            />
                        </div>
                        <button className="btn btn-custom px-4" onClick={handlePesquisar}>
                            Pesquisar
                        </button>
                    </div>
                </div>

                <TabelaChamado
                    dados={chamados}
                    aoExcluir={handleExcluirChamado}
                    aoEditar={handleEditarChamado}
                    aoAtribuirTecnico={handleAbrirModalTecnico}
                    aoComentarios={handleAbrirComentarios}
                    aoAtender={handleAbrirAtendimento}
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

                <ModalChamado mostrar={mostrarFormulario}
                    fechar={() => { setMostrarFormulario(false); setChamadoEditando(null); }}
                    aoSalvar={handleSalvarChamado} chamado={chamadoEditando} />

                <ToastMensagem mostrar={mostrarToast} mensagem={mensagemToast} tipo={tipoToast} />

                <ModalConfirmacao mostrar={mostrarConfirmacao}
                    fechar={() => { setMostrarConfirmacao(false); setIdExcluir(null); }}
                    aoConfirmar={confirmarExclusao}
                    titulo="Confirmar Exclusão"
                    mensagem="Tem certeza que deseja excluir este chamado?" />

                <ModalAtribuirTecnico
                    mostrar={mostrarModalTecnico}
                    fechar={() => { setMostrarModalTecnico(false); setChamadoSelecionado(null); }}
                    chamado={chamadoSelecionado}
                    aoSalvar={handleSalvarAtribuicao}
                />

                <ModalComentarios
                    mostrar={mostrarComentarios}
                    fechar={() => {
                        setMostrarComentarios(false);
                        setChamadoComentario(null);
                    }}
                    chamado={chamadoComentario}
                    mostrarMensagem={mostrarMensagem}
                />

                <ModalAtendimento
                    mostrar={mostrarModalAtendimento}
                    fechar={() => {
                        setMostrarModalAtendimento(false);
                        setChamadoAtendimento(null);
                        carregarChamados();
                    }}
                    chamado={chamadoAtendimento}
                    mostrarMensagem={mostrarMensagem}
                />
            </main>
            <Footer />
        </div>
    );
}

export default Chamados;