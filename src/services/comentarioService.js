import axios from "axios";

const API_URL = "http://localhost:8080";

export const listarComentariosPorChamado = (
    chamadoId,
    pagina = 0,
    tamanho = 100
) => {
    return axios.get(
        `${API_URL}/comentarios/chamado/${chamadoId}?page=${pagina}&size=${tamanho}`
    );
};

export const cadastrarComentario = (comentario) => {
    return axios.post(`${API_URL}/comentarios`, comentario);
};

export const excluirComentario = (id) => {
    return axios.delete(`${API_URL}/comentarios/${id}`);
};