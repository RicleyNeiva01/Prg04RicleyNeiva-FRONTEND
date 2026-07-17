import React, { useEffect, useState, useCallback } from "react";
import {
    listarComentariosPorChamado,
    cadastrarComentario,
    excluirComentario
} from "../services/comentarioService";
import ModalConfirmacao from "./ModalConfirmacao";
import { FaTrashAlt } from 'react-icons/fa';

function ModalComentarios({
    mostrar,
    fechar,
    chamado,
    mostrarMensagem }) {

    const [comentarios, setComentarios] = useState([]);
    const [mensagem, setMensagem] = useState("");
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
    const [comentarioExcluir, setComentarioExcluir] = useState(null);

    const carregarComentarios = useCallback(async () => {
        if (!chamado) return;

        try {
            const response = await listarComentariosPorChamado(chamado.id);
            setComentarios(response.data.content || response.data);
        } catch (error) {
            console.error("Erro ao carregar comentários", error);
        }
    }, [chamado]);

    useEffect(() => {
        if (mostrar && chamado) {
            setMensagem("");
            carregarComentarios();
        }
    }, [mostrar, chamado, carregarComentarios]);

    async function handleSalvarComentario() {

        if (mensagem.trim() === "") {
            return;
        }

        try {

            const comentario = {
                mensagem: mensagem,
                usuarioId: 1, // TODO: substituir pelo usuário autenticado após implementar o login
                chamadoId: chamado.id
            };

            await cadastrarComentario(comentario);

            mostrarMensagem("Comentário adicionado com sucesso!", "success");

            setMensagem("");

            await carregarComentarios();

        } catch (error) {

            console.error(error);

        }

    }

    async function handleExcluirComentario() {

        try {

            await excluirComentario(comentarioExcluir);
            mostrarMensagem("Comentário excluído com sucesso!", "warning");

            setMostrarConfirmacao(false);
            setComentarioExcluir(null);

            await carregarComentarios();

        } catch (error) {

            console.error(error);

        }

    }

    if (!mostrar) return null;

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,.6)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
                padding: "20px"
            }}
            onClick={fechar}
        >

            <div
                style={{
                    background: "#1D164D",
                    border: "1px solid #05BBD0",
                    borderRadius: "15px",
                    padding: "25px",
                    color: "white",
                    width: "700px",
                    maxWidth: "100%",
                    maxHeight: "80vh",
                    overflowY: "auto"
                }}
                onClick={(e) => e.stopPropagation()}
            >

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px"
                    }}
                >

                    <h3 className="titulo-pagina">
                        💬 Comentários do Chamado
                    </h3>

                    <button
                        onClick={fechar}
                        style={{
                            border: "none",
                            background: "transparent",
                            color: "#fff",
                            fontSize: "30px",
                            cursor: "pointer"
                        }}
                    >
                        ×
                    </button>

                </div>

                <div className="mb-4">

                    <h5>{chamado?.titulo}</h5>

                    <small className="text-light">
                        ID do Chamado: #{chamado?.id}
                    </small>

                </div>

                <hr />

                {comentarios.length === 0 ? (

                    <div className="text-center py-5">

                        <h5>Nenhum comentário encontrado.</h5>

                        <p className="text-light">
                            Este chamado ainda não possui comentários.
                        </p>

                    </div>

                ) : (

                    comentarios.map((comentario) => (

                        <div
                            key={comentario.id}
                            className="mb-3 p-3"
                            style={{
                                border: "1px solid #05BBD0",
                                borderRadius: "10px"
                            }}
                        >

                            <div className="d-flex justify-content-between align-items-start">

                                <div>

                                    <strong>{comentario.usuario?.nome}</strong>

                                    <br />

                                    <small className="text-light">
                                        {new Date(comentario.dataComentario)
                                            .toLocaleString("pt-BR")}
                                    </small>

                                </div>

                                <button
                                    className="btn btn-outline-danger btn-sm rounded-pill"
                                    style={{
                                        border: 'none',
                                        padding: '5px 10px',
                                        fontSize: '1.1rem', // Aumenta levemente o tamanho do ícone
                                        transition: 'all 0.2s ease', // Animação suave no hover
                                    }}
                                    onClick={() => {
                                        setComentarioExcluir(comentario.id);
                                        setMostrarConfirmacao(true);
                                    }}
                                    title="Excluir comentário" // Dica de texto no mouse over
                                >
                                    <FaTrashAlt />
                                </button>

                            </div>

                            <p className="mt-2 mb-0">
                                {comentario.mensagem}
                            </p>

                        </div>

                    ))

                )}

                <hr />

                <div className="mb-3">

                    <label className="form-label">
                        Novo comentário
                    </label>

                    <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Digite um comentário..."
                        value={mensagem}
                        onChange={(e) => setMensagem(e.target.value)}
                    />

                </div>

                <div className="d-flex justify-content-between">

                    <button
                        className="btn btn-custom"
                        onClick={handleSalvarComentario}
                        disabled={!mensagem.trim()}
                    >
                        💬 Adicionar Comentário
                    </button>

                    <button
                        className="btn btn-secondary"
                        onClick={fechar}
                    >
                        Fechar
                    </button>

                </div>

                <ModalConfirmacao
                    mostrar={mostrarConfirmacao}
                    fechar={() => {
                        setMostrarConfirmacao(false);
                        setComentarioExcluir(null);
                    }}
                    aoConfirmar={handleExcluirComentario}
                    titulo="Confirmar Exclusão"
                    mensagem="Tem certeza que deseja excluir este comentário?"
                />

            </div>

        </div>
    );
}

export default ModalComentarios;