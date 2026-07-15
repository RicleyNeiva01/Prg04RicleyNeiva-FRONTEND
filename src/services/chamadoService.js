import axios from "axios";
import API_URL from "./api";

export const listarChamados = (
    status = "",
    titulo = "",
    pagina = 0,
    tamanho = 6
) => {
    let params = `?page=${pagina}&size=${tamanho}&sort=dataAbertura,desc`;

    if (status) {
        params += `&status=${status}`;
    }

    if (titulo) {
        params += `&titulo=${encodeURIComponent(titulo)}`;
    }

    return axios.get(`${API_URL}/chamados${params}`);
};

export const buscarChamadoPorId = (id) => {
    return axios.get(`${API_URL}/chamados/${id}`);
};

export const cadastrarChamado = (chamado) => {
    return axios.post(`${API_URL}/chamados`, chamado);
};

export const atualizarChamado = (id, chamado) => {
    return axios.put(`${API_URL}/chamados/${id}`, chamado);
};

export const atualizarStatus = (id, status) => {
    return axios.patch(`${API_URL}/chamados/${id}/status?status=${status}`);
};

export const atribuirTecnico = (id, tecnicoId) => {
    return axios.patch(`${API_URL}/chamados/${id}/tecnico?tecnicoId=${tecnicoId}`);
};

export const excluirChamado = (id) => {
    return axios.delete(`${API_URL}/chamados/${id}`);
};