import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TabelaCategoria from "../components/TabelaCategoria";
import ModalCategoria from "../components/ModalCategoria";
import ToastMensagem from "../components/ToastMensagem";
import ModalConfirmacao from "../components/ModalConfirmacao";

import {
    listarCategorias,
    buscarCategoriaPorNome,
    cadastrarCategoria,
    atualizarCategoria,
    excluirCategoria
} from "../services/categoriaService";

function Categorias() {

    const [categorias, setCategorias] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [categoriaEditando, setCategoriaEditando] = useState(null);
    const [nomeBusca, setNomeBusca] = useState("");
    const [mostrarToast, setMostrarToast] = useState(false);
    const [mensagemToast, setMensagemToast] = useState("");
    const [tipoToast, setTipoToast] = useState("success");
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
    const [idExcluir, setIdExcluir] = useState(null);
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);

    const carregarCategorias = useCallback(async () => {
        try {
            const response = await listarCategorias(paginaAtual);
            setCategorias(response.data.content || response.data);
            if (response.data.totalPages !== undefined) {
                setTotalPaginas(response.data.totalPages);
            }
        } catch (error) {
            console.error(error);
        }
    }, [paginaAtual]);

    useEffect(() => {
        carregarCategorias();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paginaAtual]);

    async function handlePesquisar() {
        if (nomeBusca.trim() === "") {
            setPaginaAtual(0);
            carregarCategorias();
            return;
        }
        try {
            const response = await buscarCategoriaPorNome(nomeBusca, 0);
            setCategorias(response.data.content || response.data);
            if (response.data.totalPages !== undefined) {
                setTotalPaginas(response.data.totalPages);
            }
            if ((response.data.content || response.data).length === 0) {
                mostrarMensagem("Nenhuma categoria encontrada.", "warning");
            }
        } catch (error) {
            mostrarMensagem("Erro ao pesquisar categorias.", "danger");
        }
    }

    function mostrarMensagem(mensagem, tipo) {
        setMensagemToast(mensagem);
        setTipoToast(tipo);
        setMostrarToast(true);
        setTimeout(() => setMostrarToast(false), 3000);
    }

    async function handleSalvarCategoria(categoria) {
        try {
            if (categoria.id) {
                await atualizarCategoria(categoria.id, categoria);
                mostrarMensagem("Categoria atualizada com sucesso!", "success");
            } else {
                await cadastrarCategoria(categoria);
                mostrarMensagem("Categoria cadastrada com sucesso!", "success");
            }
            setMostrarFormulario(false);
            setCategoriaEditando(null);
            carregarCategorias();
        } catch (error) {
            console.error(error);
            const mensagem =
                error.response?.data?.message ||
                error.response?.data?.erro ||
                "Erro ao salvar categoria!";
            mostrarMensagem(mensagem, "danger");
        }
    }

    function handleExcluirCategoria(id) {
        setIdExcluir(id);
        setMostrarConfirmacao(true);
    }

    async function confirmarExclusao() {
        try {
            await excluirCategoria(idExcluir);
            mostrarMensagem("Categoria excluída com sucesso!", "warning");
            carregarCategorias();
        } catch (error) {
            const mensagem =
                error.response?.data?.message ||
                "Erro ao excluir categoria!";
            mostrarMensagem(mensagem, "danger");
        }
        setMostrarConfirmacao(false);
        setIdExcluir(null);
    }

    function handleEditarCategoria(categoria) {
        setCategoriaEditando(categoria);
        setMostrarFormulario(true);
    }

    return (
        <div className="d-flex flex-column min-vh-100">

            <Navbar paginaAtual="categorias" />

            <main className="container py-5 flex-grow-1">

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center align-items-start mb-4 gap-3">
                    <div>
                        <h2 className="titulo-pagina">
                            🏷️ Gerenciamento de Categorias
                        </h2>
                        <p className="subtitulo-pagina mb-0">
                            Cadastre, edite e gerencie as categorias dos chamados.
                        </p>
                    </div>
                    <button
                        className="btn btn-custom shadow fw-bold px-4"
                        onClick={() => {
                            setCategoriaEditando(null);
                            setMostrarFormulario(true);
                        }}
                    >
                        ➕ Nova Categoria
                    </button>
                </div>

                <div className="d-flex gap-2 mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Pesquisar por nome..."
                        value={nomeBusca}
                        onChange={(e) => setNomeBusca(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handlePesquisar()}
                    />
                    <button
                        className="btn btn-custom px-4"
                        onClick={handlePesquisar}
                    >
                        🔍 Pesquisar
                    </button>
                </div>

                <TabelaCategoria
                    dados={categorias}
                    aoExcluir={handleExcluirCategoria}
                    aoEditar={handleEditarCategoria}
                />

                {totalPaginas > 1 && (
                    <nav className="d-flex justify-content-center mt-4">
                        <ul className="pagination pagination-deskflow">
                            <li className={`page-item ${paginaAtual === 0 ? "disabled" : ""}`}>
                                <button
                                    className="page-link"
                                    onClick={() => setPaginaAtual(paginaAtual - 1)}
                                >
                                    Anterior
                                </button>
                            </li>
                            <li className="page-item disabled">
                                <span className="page-link page-link-text">
                                    Página {paginaAtual + 1} de {totalPaginas}
                                </span>
                            </li>
                            <li className={`page-item ${paginaAtual === totalPaginas - 1 ? "disabled" : ""}`}>
                                <button
                                    className="page-link"
                                    onClick={() => setPaginaAtual(paginaAtual + 1)}
                                >
                                    Próxima
                                </button>
                            </li>
                        </ul>
                    </nav>
                )}

                <ModalCategoria
                    mostrar={mostrarFormulario}
                    fechar={() => {
                        setMostrarFormulario(false);
                        setCategoriaEditando(null);
                    }}
                    aoSalvar={handleSalvarCategoria}
                    categoria={categoriaEditando}
                />

                <ToastMensagem
                    mostrar={mostrarToast}
                    mensagem={mensagemToast}
                    tipo={tipoToast}
                />

                <ModalConfirmacao
                    mostrar={mostrarConfirmacao}
                    fechar={() => {
                        setMostrarConfirmacao(false);
                        setIdExcluir(null);
                    }}
                    aoConfirmar={confirmarExclusao}
                    titulo="Confirmar Exclusão"
                    mensagem="Tem certeza que deseja excluir esta categoria?"
                />

            </main>

            <Footer />

        </div>
    );
}

export default Categorias;