import api from "./api";

export const listarUsuarios = (mostrarInativos = false, pagina = 0, tamanho = 6) =>
    api.get(`/usuarios?mostrarInativos=${mostrarInativos}&page=${pagina}&size=${tamanho}&sort=nome,asc`);

export const buscarUsuarioPorId = (id) =>
    api.get(`/usuarios/${id}`);

export const buscarUsuarioPorNome = (nome, mostrarInativos = false, pagina = 0, tamanho = 6) =>
    api.get(`/usuarios?nome=${nome}&mostrarInativos=${mostrarInativos}&page=${pagina}&size=${tamanho}&sort=nome,asc`);

export const cadastrarUsuario = (usuario) =>
    api.post(`/usuarios`, usuario);

export const atualizarUsuario = (id, usuario) =>
    api.put(`/usuarios/${id}`, usuario);

export const excluirUsuario = (id) =>
    api.delete(`/usuarios/${id}`);

export const reativarUsuario = (id) =>
    api.put(`/usuarios/${id}/reativar`);