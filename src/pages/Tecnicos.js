import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TabelaTecnico from "../components/TabelaTecnico";
import ModalTecnico from "../components/ModalTecnico";
import ToastMensagem from "../components/ToastMensagem";
import ModalConfirmacao from "../components/ModalConfirmacao";

import {
    listarTecnicos,
    buscarTecnicoPorNome,
    cadastrarTecnico,
    atualizarTecnico,
    excluirTecnico
} from "../services/tecnicoService";

function Tecnicos() {
    const [tecnicos, setTecnicos] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [tecnicoEditando, setTecnicoEditando] = useState(null);
    const [nomeBusca, setNomeBusca] = useState("");
    const [mostrarToast, setMostrarToast] = useState(false);
    const [mensagemToast, setMensagemToast] = useState("");
    const [tipoToast, setTipoToast] = useState("success");
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
    const [idExcluir, setIdExcluir] = useState(null);

    // Filtros
    const [mostrarInativos, setMostrarInativos] = useState(false);

    // Paginação
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);

    async function carregarTecnicos() {
        try {
            const response = await listarTecnicos(mostrarInativos, paginaAtual);
            setTecnicos(response.data.content || response.data);

            if (response.data.totalPages !== undefined) {
                setTotalPaginas(response.data.totalPages);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function pesquisarTecnicos() {
        try {
            if (nomeBusca.trim() === "") {
                carregarTecnicos();
                return;
            }

            const response = await buscarTecnicoPorNome(nomeBusca, mostrarInativos, paginaAtual);
            setTecnicos(response.data.content || response.data);

            if (response.data.totalPages !== undefined) {
                setTotalPaginas(response.data.totalPages);
            }

            if ((response.data.content || response.data).length === 0) {
                mostrarMensagem("Nenhum técnico encontrado.", "warning");
            }

        } catch (error) {
            console.error(error);
            const mensagem = error.response?.data?.message || "Erro ao pesquisar técnicos.";
            mostrarMensagem(mensagem, "danger");
        }
    }

    function handleEnter(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            pesquisarTecnicos();
        }
    }

    function mostrarMensagem(mensagem, tipo) {
        setMensagemToast(mensagem);
        setTipoToast(tipo);
        setMostrarToast(true);
        setTimeout(() => setMostrarToast(false), 3000);
    }

    // Recarrega sempre que mudar a página ou a opção de inativos
    useEffect(() => {
        carregarTecnicos();
    }, [mostrarInativos, paginaAtual]);

    // Função auxiliar para resetar a paginação ao trocar o filtro de inativos
    function handleInativosChange(e) {
        setMostrarInativos(e.target.checked);
        setPaginaAtual(0);
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
            console.error(error);
            const mensagem =
                error.response?.data?.message ||
                error.response?.data?.erro ||
                "Erro ao salvar técnico!";
            mostrarMensagem(mensagem, "danger");
        }
    }

    function handleExcluirTecnico(id) {
        setIdExcluir(id);
        setMostrarConfirmacao(true);
    }

    async function confirmarExclusao() {
        try {
            await excluirTecnico(idExcluir);
            mostrarMensagem("Técnico excluído com sucesso!", "warning");
            carregarTecnicos();
        } catch (error) {
            console.error(error);
            const mensagem =
                error.response?.data?.message ||
                error.response?.data?.erro ||
                "Erro ao excluir técnico!";
            mostrarMensagem(mensagem, "danger");
        }

        setMostrarConfirmacao(false);
        setIdExcluir(null);
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
                        <h2 className="titulo-pagina">
                            🛠️ Gerenciamento de Técnicos
                        </h2>
                        <p className="subtitulo-pagina mb-0">
                            Cadastre, edite e gerencie os técnicos do sistema DeskFlow.
                        </p>
                    </div>
                    <button
                        className="btn btn-custom shadow fw-bold px-4"
                        onClick={() => {
                            setTecnicoEditando(null);
                            setMostrarFormulario(true);
                        }}
                    >
                        ➕ Novo Técnico
                    </button>
                </div>

                <div className="mb-4">
                    <div className="d-flex gap-2 mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Pesquisar por nome..."
                            value={nomeBusca}
                            onChange={(e) => {
                                setNomeBusca(e.target.value);
                                if (e.target.value === "") {
                                    setTimeout(() => carregarTecnicos(), 100);
                                }
                            }}
                            onKeyDown={handleEnter}
                        />
                        <button
                            className="btn btn-custom px-4"
                            onClick={pesquisarTecnicos}
                        >
                            🔍 Pesquisar
                        </button>
                    </div>

                    <div className="form-check text-start ms-1">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="mostrarInativosTecnico"
                            checked={mostrarInativos}
                            onChange={handleInativosChange} // Usando a nova função
                            style={{ cursor: "pointer" }}
                        />
                        <label
                            className="form-check-label ms-2 text-white"
                            htmlFor="mostrarInativosTecnico"
                            style={{ cursor: "pointer" }}
                        >
                            Mostrar inativos
                        </label>
                    </div>
                </div>

                <TabelaTecnico
                    dados={tecnicos}
                    aoExcluir={handleExcluirTecnico}
                    aoEditar={handleEditarTecnico}
                />

                {/* Controles de Paginação */}
                {totalPaginas > 1 && (
                    <nav className="d-flex justify-content-center mt-4">
                        {/* Adicionando a classe pagination-deskflow */}
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
                                {/* Trocando text-dark por page-link-text */}
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

                <ModalTecnico
                    mostrar={mostrarFormulario}
                    fechar={() => {
                        setMostrarFormulario(false);
                        setTecnicoEditando(null);
                    }}
                    aoSalvar={handleSalvarTecnico}
                    tecnico={tecnicoEditando}
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
                    mensagem="Tem certeza que deseja excluir este técnico?"
                />

            </main>

            <Footer />
        </div>
    );
}

export default Tecnicos;