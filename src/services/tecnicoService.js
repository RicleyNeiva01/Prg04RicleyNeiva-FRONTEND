import api from "./api";

export const listarTecnicos = (mostrarInativos = false, pagina = 0, tamanho = 6) =>
    api.get(`/tecnicos?mostrarInativos=${mostrarInativos}&page=${pagina}&size=${tamanho}&sort=nome,asc`);

export const buscarTecnicoPorId = (id) =>
    api.get(`/tecnicos/${id}`);

export const buscarTecnicoPorNome = (nome, mostrarInativos = false, pagina = 0) =>
    api.get(`/tecnicos?nome=${nome}&mostrarInativos=${mostrarInativos}&page=${pagina}`);

export const cadastrarTecnico = (tecnico) =>
    api.post(`/tecnicos`, tecnico);

export const atualizarTecnico = (id, tecnico) =>
    api.put(`/tecnicos/${id}`, tecnico);

export const excluirTecnico = (id) =>
    api.delete(`/tecnicos/${id}`);

export const reativarTecnico = (id) =>
    api.put(`/tecnicos/${id}/reativar`);