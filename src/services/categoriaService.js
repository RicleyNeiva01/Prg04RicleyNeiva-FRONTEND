import api from "./api";

export const listarCategorias = (pagina = 0, tamanho = 50) =>
    api.get(`/categorias?page=${pagina}&size=${tamanho}&sort=nome,asc`);

export const buscarCategoriaPorId = (id) =>
    api.get(`/categorias/${id}`);

export const buscarCategoriaPorNome = (nome, pagina = 0, tamanho = 5) =>
    api.get(`/categorias?nome=${nome}&page=${pagina}&size=${tamanho}&sort=nome,asc`);

export const cadastrarCategoria = (categoria) =>
    api.post(`/categorias`, categoria);

export const atualizarCategoria = (id, categoria) =>
    api.put(`/categorias/${id}`, categoria);

export const excluirCategoria = (id) =>
    api.delete(`/categorias/${id}`);