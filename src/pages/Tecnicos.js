import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TabelaTecnico from "../components/TabelaTecnico";
import ModalTecnico from "../components/ModalTecnico";
import ToastMensagem from "../components/ToastMensagem";
import ModalConfirmacao from "../components/ModalConfirmacao";
import { FaUndo, FaSearch, FaTools } from "react-icons/fa";

import {
    listarTecnicos,
    buscarTecnicoPorNome,
    cadastrarTecnico,
    atualizarTecnico,
    excluirTecnico,
    reativarTecnico
} from "../services/tecnicoService";

function Tecnicos() {
    const [tecnicos, setTecnicos] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [tecnicoEditando, setTecnicoEditando] = useState(null);
    const [nomeBusca, setNomeBusca] = useState("");
    const [mostrarToast, setMostrarToast] = useState(false);
    const [mensagemToast, setMensagemToast] = useState("");
    const [tipoToast, setTipoToast] = useState("success");
    const [mostrarInativos, setMostrarInativos] = useState(false);
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [carregando, setCarregando] = useState(true);

    // Estados do Modal de Exclusão
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
    const [idExcluir, setIdExcluir] = useState(null);
    const [processandoExclusao, setProcessandoExclusao] = useState(false);

    // Novos Estados do Modal de Reativação
    const [mostrarConfirmacaoReativar, setMostrarConfirmacaoReativar] = useState(false);
    const [idReativar, setIdReativar] = useState(null);
    const [processandoReativacao, setProcessandoReativacao] = useState(false);

    const ativos = tecnicos.filter((tecnico) => tecnico.ativo).length;
    const inativos = tecnicos.filter((tecnico) => !tecnico.ativo).length;

    const carregarTecnicos = useCallback(async () => {
        setCarregando(true);
        try {
            const response = await listarTecnicos(mostrarInativos, paginaAtual);
            setTecnicos(response.data.content || response.data);
            if (response.data.totalPages !== undefined) {
                setTotalPaginas(response.data.totalPages);
            }
        } catch (error) {
            console.error(error);
            mostrarMensagem("Erro ao carregar técnicos.", "danger");
        } finally {
            setCarregando(false);
        }
    }, [mostrarInativos, paginaAtual]);

    useEffect(() => {
        carregarTecnicos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paginaAtual, mostrarInativos]);

    async function handlePesquisar() {
        setCarregando(true);
        if (nomeBusca.trim() === "") {
            setPaginaAtual(0);
            await carregarTecnicos();
            return;
        }
        try {
            const response = await buscarTecnicoPorNome(nomeBusca, mostrarInativos, 0);
            setTecnicos(response.data.content || response.data);
            if (response.data.totalPages !== undefined) {
                setTotalPaginas(response.data.totalPages);
            }
            if ((response.data.content || response.data).length === 0) {
                mostrarMensagem("Nenhum técnico encontrado.", "warning");
            }
        } catch (error) {
            mostrarMensagem("Erro ao pesquisar técnicos.", "danger");
        } finally {
            setCarregando(false);
        }
    }

    function mostrarMensagem(mensagem, tipo) {
        setMensagemToast(mensagem);
        setTipoToast(tipo);
        setMostrarToast(true);
        setTimeout(() => setMostrarToast(false), 3000);
    }

    async function handleSalvarTecnico(tecnico) {
        try {
            const tecnicoFormatado = {
                ...tecnico,
                cpf: tecnico.cpf ? tecnico.cpf.replace(/\D/g, "") : null,
                telefone: tecnico.telefone ? tecnico.telefone.replace(/\D/g, "") : null
            };
            if (tecnico.id) {
                await atualizarTecnico(tecnico.id, tecnicoFormatado);
                mostrarMensagem("Técnico atualizado com sucesso!", "success");
            } else {
                await cadastrarTecnico(tecnicoFormatado);
                mostrarMensagem("Técnico cadastrado com sucesso!", "success");
            }
            setMostrarFormulario(false);
            setTecnicoEditando(null);
            carregarTecnicos();
        } catch (error) {
            const mensagem =
                error.response?.data?.message ||
                error.response?.data?.erro ||
                "Erro ao salvar técnico!";
            mostrarMensagem(mensagem, "danger");
        }
    }

    // Ações de Exclusão
    function handleExcluirTecnico(id) {
        setIdExcluir(id);
        setMostrarConfirmacao(true);
    }

    async function confirmarExclusao() {
        setProcessandoExclusao(true);
        try {
            await excluirTecnico(idExcluir);
            mostrarMensagem("Técnico desativado com sucesso!", "warning");
            await carregarTecnicos();
        } catch (error) {
            const mensagem =
                error.response?.data?.message ||
                error.response?.data?.erro ||
                "Erro ao desativar técnico!";
            mostrarMensagem(mensagem, "danger");
        } finally {
            setMostrarConfirmacao(false);
            setIdExcluir(null);
            setProcessandoExclusao(false);
        }
    }

    // Ações de Reativação
    function handleReativarTecnicoClicado(id) {
        setIdReativar(id);
        setMostrarConfirmacaoReativar(true); // Abre o modal de reativação
    }

    async function confirmarReativacao() {
        setProcessandoReativacao(true);
        try {
            await reativarTecnico(idReativar);
            mostrarMensagem("Técnico reativado com sucesso!", "success");
            await carregarTecnicos();
        } catch (error) {
            const mensagem =
                error.response?.data?.message ||
                error.response?.data?.erro ||
                "Erro ao reativar técnico!";
            mostrarMensagem(mensagem, "danger");
        } finally {
            setMostrarConfirmacaoReativar(false);
            setIdReativar(null);
            setProcessandoReativacao(false);
        }
    }

    function handleEditarTecnico(tecnico) {
        setTecnicoEditando(tecnico);
        setMostrarFormulario(true);
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar paginaAtual="tecnicos" />
            <main className="container py-5 flex-grow-1">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center align-items-start mb-4 gap-3">
                    <div>
                        <h2 className="titulo-pagina">🛠️ Gerenciamento de Técnicos</h2>
                        <p className="subtitulo-pagina mb-0">
                            Cadastre, edite e gerencie os técnicos do sistema DeskFlow.
                        </p>
                    </div>
                    <button className="btn btn-custom shadow fw-bold px-4"
                        onClick={() => { setTecnicoEditando(null); setMostrarFormulario(true); }}>
                        ➕ Novo Técnico
                    </button>
                </div>

                <div className="tecnicos-hero glass-card mb-4 p-4">
                    <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
                        <div className="d-flex align-items-center gap-3">
                            <div className="hero-icon-badge">
                                <FaTools />
                            </div>
                            <div>
                                <h4 className="mb-1">Painel premium de técnicos</h4>
                                <p className="mb-0">Gerencie a equipe com mais clareza, velocidade e estilo.</p>
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
                                        carregarTecnicos();
                                    }
                                }}
                                onKeyDown={(e) => e.key === "Enter" && handlePesquisar()}
                            />
                        </div>
                        <button className="btn btn-custom px-4" onClick={handlePesquisar}>
                            Pesquisar
                        </button>
                    </div>
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
                        <div className="form-check text-start ms-1">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="mostrarInativosTecnico"
                                checked={mostrarInativos}
                                onChange={(e) => { setMostrarInativos(e.target.checked); setPaginaAtual(0); }}
                                style={{ cursor: "pointer" }}
                            />
                            <label className="form-check-label ms-2 text-white" htmlFor="mostrarInativosTecnico"
                                style={{ cursor: "pointer" }}>
                                Mostrar inativos
                            </label>
                        </div>
                    </div>
                </div>

                {carregando ? (
                    <div className="text-center py-5 text-light">
                        <div className="spinner-border text-info mb-3" role="status" />
                        <div>Carregando técnicos...</div>
                    </div>
                ) : (
                    <TabelaTecnico 
                        dados={tecnicos} 
                        aoExcluir={handleExcluirTecnico} 
                        aoEditar={handleEditarTecnico} 
                        aoReativar={handleReativarTecnicoClicado}
                    />
                )}

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

                <ModalTecnico mostrar={mostrarFormulario}
                    fechar={() => { setMostrarFormulario(false); setTecnicoEditando(null); }}
                    aoSalvar={handleSalvarTecnico} tecnico={tecnicoEditando} />

                <ToastMensagem mostrar={mostrarToast} mensagem={mensagemToast} tipo={tipoToast} />

                {/* Modal de Exclusão Original */}
                <ModalConfirmacao 
                    mostrar={mostrarConfirmacao}
                    fechar={() => { setMostrarConfirmacao(false); setIdExcluir(null); }}
                    aoConfirmar={confirmarExclusao}
                    titulo="Confirmar Exclusão"
                    mensagem="Tem certeza que deseja desativar este técnico?" 
                    textoBotaoConfirmar={processandoExclusao ? "Desativando..." : "Confirmar"}
                    iconeBotaoConfirmar={processandoExclusao ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" /> : null}
                    classeBotaoConfirmar={processandoExclusao ? "btn btn-danger disabled" : "btn btn-danger"}
                    desabilitarConfirmar={processandoExclusao}
                />

                {/* NOVO Modal de Reativação COM AS PROPS NOVAS IGUAL USUARIOS */}
                <ModalConfirmacao 
                    mostrar={mostrarConfirmacaoReativar}
                    fechar={() => { setMostrarConfirmacaoReativar(false); setIdReativar(null); }}
                    aoConfirmar={confirmarReativacao}
                    titulo="Confirmar Reativação"
                    mensagem="Tem certeza que deseja reativar o acesso deste técnico?" 
                    textoBotaoConfirmar={processandoReativacao ? "Reativando..." : "Reativar"}
                    iconeBotaoConfirmar={processandoReativacao ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" /> : <FaUndo className="me-2" />}
                    classeBotaoConfirmar={processandoReativacao ? "btn btn-atendimento disabled" : "btn btn-atendimento"}
                    desabilitarConfirmar={processandoReativacao}
                />
            </main>
            <Footer />
        </div>
    );
}

export default Tecnicos;