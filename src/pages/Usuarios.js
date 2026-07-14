import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Tabela from "../components/Tabela"; // Sua tabela de usuários
import ModalUsuario from "../components/ModalUsuario";
import ToastMensagem from "../components/ToastMensagem";
import ModalConfirmacao from "../components/ModalConfirmacao";

import {
    listarUsuarios,
    buscarUsuarioPorNome,
    cadastrarUsuario,
    atualizarUsuario,
    excluirUsuario
} from "../services/usuarioService";

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [usuarioEditando, setUsuarioEditando] = useState(null);
    const [nomeBusca, setNomeBusca] = useState("");
    const [mostrarToast, setMostrarToast] = useState(false);
    const [mensagemToast, setMensagemToast] = useState("");
    const [tipoToast, setTipoToast] = useState("success");
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
    const [idExcluir, setIdExcluir] = useState(null);
    
    // Filtro de inativos
    const [mostrarInativos, setMostrarInativos] = useState(false);

    // NOVOS ESTADOS PARA PAGINAÇÃO
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);

    async function carregarUsuarios() {
        try {
            // Passando mostrarInativos e paginaAtual para o service
            const response = await listarUsuarios(mostrarInativos, paginaAtual);
            setUsuarios(response.data.content || response.data);
            
            // Armazena o total de páginas retornado pelo Spring Boot
            if (response.data.totalPages !== undefined) {
                setTotalPaginas(response.data.totalPages);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function pesquisarUsuarios() {
        try {
            if (nomeBusca.trim() === "") {
                carregarUsuarios();
                return;
            }

            // Pesquisa também paginada e ordenada
            const response = await buscarUsuarioPorNome(nomeBusca, mostrarInativos, paginaAtual);
            setUsuarios(response.data.content || response.data);

            if (response.data.totalPages !== undefined) {
                setTotalPaginas(response.data.totalPages);
            }

            if ((response.data.content || response.data).length === 0) {
                mostrarMensagem("Nenhum usuário encontrado.", "warning");
            }

        } catch (error) {
            console.error(error);
            const mensagem = error.response?.data?.message || "Erro ao pesquisar usuários.";
            mostrarMensagem(mensagem, "danger");
        }
    }

    function handleEnter(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            pesquisarUsuarios();
        }
    }

    function mostrarMensagem(mensagem, tipo) {
        setMensagemToast(mensagem);
        setTipoToast(tipo);
        setMostrarToast(true);
        setTimeout(() => setMostrarToast(false), 3000);
    }

    // Monitora tanto o filtro de inativos quanto a troca de página
    useEffect(() => {
        carregarUsuarios();
    }, [mostrarInativos, paginaAtual]); 

    // Garante que ao mudar o filtro de inativos, a paginação volte para o início (página 0)
    function handleInativosChange(e) {
        setMostrarInativos(e.target.checked);
        setPaginaAtual(0); 
    }

    async function handleSalvarUsuario(usuario) {
        try {
            // Remove formatações/máscaras indesejadas se houver (ex: CPF, Telefone)
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
            console.error(error);
            const mensagem =
                error.response?.data?.message ||
                error.response?.data?.erro ||
                "Erro ao salvar usuário!";
            mostrarMensagem(mensagem, "danger");
        }
    }

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
            console.error(error); 
            const mensagem =
                error.response?.data?.message ||
                error.response?.data?.erro ||
                "Erro ao excluir usuário!";
            mostrarMensagem(mensagem, "danger");
        }

        setMostrarConfirmacao(false);
        setIdExcluir(null);
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
                        <h2 className="titulo-pagina">
                            👥 Gerenciamento de Usuários
                        </h2>
                        <p className="subtitulo-pagina mb-0">
                            Cadastre, edite e gerencie os usuários do sistema DeskFlow.
                        </p>
                    </div>
                    <button
                        className="btn btn-custom shadow fw-bold px-4"
                        onClick={() => {
                            setUsuarioEditando(null);
                            setMostrarFormulario(true);
                        }}
                    >
                        ➕ Novo Usuário
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
                                    setTimeout(() => carregarUsuarios(), 100); 
                                }
                            }}
                            onKeyDown={handleEnter}
                        />
                        <button
                            className="btn btn-custom px-4"
                            onClick={pesquisarUsuarios}
                        >
                            🔍 Pesquisar
                        </button>
                    </div>

                    <div className="form-check text-start ms-1">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="mostrarInativosUsuario"
                            checked={mostrarInativos}
                            onChange={handleInativosChange} // Usando a função de reset
                            style={{ cursor: "pointer" }}
                        />
                        <label
                            className="form-check-label ms-2 text-white"
                            htmlFor="mostrarInativosUsuario"
                            style={{ cursor: "pointer" }}
                        >
                            Mostrar inativos
                        </label>
                    </div>
                </div>

                <Tabela
                    dados={usuarios}
                    aoExcluir={handleExcluirUsuario}
                    aoEditar={handleEditarUsuario}
                />

                {/* Bloco de Paginação Estilizado */}
                {totalPaginas > 1 && (
                    <nav className="d-flex justify-content-center mt-4">
                        {/* AQUI: adicionamos a classe pagination-deskflow na ul */}
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
                                {/* AQUI: tiramos o text-dark e colocamos a classe page-link-text */}
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

                <ModalUsuario
                    mostrar={mostrarFormulario}
                    fechar={() => {
                        setMostrarFormulario(false);
                        setUsuarioEditando(null);
                    }}
                    aoSalvar={handleSalvarUsuario}
                    usuario={usuarioEditando}
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
                    mensagem="Tem certeza que deseja excluir este usuário?"
                />

            </main>

            <Footer />
        </div>
    );
}

export default Usuarios;