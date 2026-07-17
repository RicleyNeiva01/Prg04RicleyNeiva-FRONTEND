import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TabelaChamado from "../components/TabelaChamado";
import ModalChamado from "../components/ModalChamado";
import ToastMensagem from "../components/ToastMensagem";
import ModalConfirmacao from "../components/ModalConfirmacao";
import ModalAtribuirTecnico from "../components/ModalAtribuirTecnico";
import ModalComentarios from "../components/ModalComentarios";

import {
    listarChamados,
    cadastrarChamado,
    atualizarChamado,
    excluirChamado,
    atualizarStatus,
    atribuirTecnico
} from "../services/chamadoService";

function Chamados() {
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

    const carregarChamados = useCallback(async () => {
        try {
            const response = await listarChamados(
                filtroStatus,
                tituloBusca,
                paginaAtual
            );

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

            const response = await listarChamados(
                filtroStatus,
                tituloBusca,
                0
            );

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

    async function handleSalvarAtribuicao(chamadoId, tecnicoId) {
        try {
            await atribuirTecnico(chamadoId, Number(tecnicoId));

            mostrarMensagem(
                "Técnico atribuído com sucesso! Status alterado para Em Andamento.",
                "success"
            );

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

    async function handleResolverChamado(id) {
        try {
            await atualizarStatus(id, "RESOLVIDO");
            mostrarMensagem("Chamado resolvido com sucesso!", "success");
            await carregarChamados();
        } catch (error) {
            mostrarMensagem("Erro ao resolver chamado!", "danger");
        }
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar paginaAtual="chamados" />
            <main className="container py-5 flex-grow-1">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center align-items-start mb-4 gap-3">
                    <div>
                        <h2 className="titulo-pagina">🎫 Gerenciamento de Chamados</h2>
                        <p className="subtitulo-pagina mb-0">
                            Acompanhe, edite e gerencie os chamados de suporte do DeskFlow.
                        </p>
                    </div>
                    <button className="btn btn-custom shadow fw-bold px-4"
                        onClick={() => { setChamadoEditando(null); setMostrarFormulario(true); }}>
                        ➕ Novo Chamado
                    </button>
                </div>

                <div className="mb-4">
                    <div className="d-flex gap-2 mb-2 flex-wrap flex-md-nowrap align-items-center">
                        {/* Dropdown de Status no lugar do Checkbox */}
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
                        <button className="btn btn-custom px-4 btn-pesquisar-mobile" onClick={handlePesquisar}>
                            🔍 Pesquisar
                        </button>
                    </div>
                </div>

                <TabelaChamado
                    dados={chamados}
                    aoExcluir={handleExcluirChamado}
                    aoEditar={handleEditarChamado}
                    aoAtribuirTecnico={handleAbrirModalTecnico}
                    aoComentarios={handleAbrirComentarios}
                    aoResolver={handleResolverChamado}
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
            </main>
            <Footer />
        </div>
    );
}

export default Chamados;