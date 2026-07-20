import api from "./api";

export const listarChamados = (status = "", titulo = "", pagina = 0, tamanho = 6) => {
    let params = `?page=${pagina}&size=${tamanho}&sort=dataAbertura,desc`;
    if (status) params += `&status=${status}`;
    if (titulo) params += `&titulo=${encodeURIComponent(titulo)}`;
    return api.get(`/chamados${params}`);
};

export const buscarChamadoPorId = (id) =>
    api.get(`/chamados/${id}`);

export const cadastrarChamado = (chamado) =>
    api.post(`/chamados`, chamado);

export const atualizarChamado = (id, chamado) =>
    api.put(`/chamados/${id}`, chamado);

export const atualizarStatus = (id, status) =>
    api.patch(`/chamados/${id}/status?status=${status}`);

export const atribuirTecnico = (id, tecnicoId) =>
    api.patch(`/chamados/${id}/tecnico?tecnicoId=${tecnicoId}`);

export const excluirChamado = (id) =>
    api.delete(`/chamados/${id}`);