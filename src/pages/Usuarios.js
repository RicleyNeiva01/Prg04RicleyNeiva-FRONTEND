import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Tabela from "../components/Tabela";
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

    async function carregarUsuarios() {

        try {

            const response = await listarUsuarios();

            setUsuarios(response.data.content);

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

            const response = await buscarUsuarioPorNome(nomeBusca);

            setUsuarios(response.data.content);

            if (response.data.content.length === 0) {

                mostrarMensagem(
                    "Nenhum usuário encontrado.",
                    "warning"
                );

            }

        } catch (error) {

            console.error(error);

            const mensagem =
                error.response?.data?.message ||
                "Erro ao pesquisar usuários.";

            mostrarMensagem(
                mensagem,
                "danger"
            );

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

        setTimeout(() => {

            setMostrarToast(false);

        }, 3000);

    }

    useEffect(() => {

        carregarUsuarios();

    }, []);

    async function handleSalvarUsuario(usuario) {

        try {

            if (usuario.id) {

                await atualizarUsuario(usuario.id, usuario);
                mostrarMensagem("Usuário atualizado com sucesso!", "success");

            } else {

                await cadastrarUsuario(usuario);
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

            mostrarMensagem(
                "Usuário excluído com sucesso!",
                "warning"
            );

            carregarUsuarios();

        } catch (error) {

            if (error.response?.status === 400) {
            mostrarMensagem("Usuário já está inativo!", "warning");
        } else {
            mostrarMensagem("Erro ao excluir usuário!", "danger");
        }

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
                    <button className="btn btn-custom shadow fw-bold px-4" onClick={() => setMostrarFormulario(true)}>
                        ➕ Cadastrar Usuário
                    </button>
                </div>
                <div className="d-flex gap-2 mb-4">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Pesquisar por nome..."
                        value={nomeBusca}
                        onChange={(e) => {
                            setNomeBusca(e.target.value);
                            if (e.target.value === "") {
                                carregarUsuarios();
                            }
                        }}
                        onKeyDown={handleEnter}
                    />

                    <button
                        className="btn btn-custom btn-sm px-3"
                        onClick={pesquisarUsuarios}
                    >
                        🔍 Pesquisar
                    </button>

                </div>

                <Tabela dados={usuarios}
                    aoExcluir={handleExcluirUsuario}
                    aoEditar={handleEditarUsuario}
                />

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