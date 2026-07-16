import axios from "axios";
import API_URL from "./api";

export const listarCategorias = (pagina = 0, tamanho = 50) => {
    // O sort=nome,asc avisa o Spring Boot para ordenar de A-Z!
    return axios.get(`${API_URL}/categorias?page=${pagina}&size=${tamanho}&sort=nome,asc`);
};

export const buscarCategoriaPorId = (id) => {
    return axios.get(`${API_URL}/categorias/${id}`);
};

export const buscarCategoriaPorNome = (nome, pagina = 0, tamanho = 5) => {
    return axios.get(`${API_URL}/categorias?nome=${nome}&page=${pagina}&size=${tamanho}&sort=nome,asc`);
};

export const cadastrarCategoria = (categoria) => {
    return axios.post(`${API_URL}/categorias`, categoria);
};

export const atualizarCategoria = (id, categoria) => {
    return axios.put(`${API_URL}/categorias/${id}`, categoria);
};

export const excluirCategoria = (id) => {
    return axios.delete(`${API_URL}/categorias/${id}`);
};