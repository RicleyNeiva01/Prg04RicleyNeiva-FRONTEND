import api from "./api";

export const listarComentariosPorChamado = (chamadoId, pagina = 0, tamanho = 100) =>
    api.get(`/comentarios/chamado/${chamadoId}?page=${pagina}&size=${tamanho}`);

export const cadastrarComentario = (comentario) =>
    api.post(`/comentarios`, comentario);

export const excluirComentario = (id) =>
    api.delete(`/comentarios/${id}`);