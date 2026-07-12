import axios from "axios";
import API_URL from "./api";

export const listarUsuarios = () => {
    return axios.get(`${API_URL}/usuarios`);
};

export const buscarUsuarioPorId = (id) => {
    return axios.get(`${API_URL}/usuarios/${id}`);
};

export const buscarUsuarioPorNome = (nome) => {
    return axios.get(`${API_URL}/usuarios?nome=${nome}`);
};

export const cadastrarUsuario = (usuario) => {
    return axios.post(`${API_URL}/usuarios`, usuario);
};

export const atualizarUsuario = (id, usuario) => {
    return axios.put(`${API_URL}/usuarios/${id}`, usuario);
};

export const excluirUsuario = (id) => {
    return axios.delete(`${API_URL}/usuarios/${id}`);
};