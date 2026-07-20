import api from "./api";

export const cadastrarAtendimento = (atendimento) =>
    api.post(`/atendimentos`, atendimento);

export const buscarAtendimentoPorChamado = (chamadoId) =>
    api.get(`/atendimentos/chamado/${chamadoId}`);

export const atualizarAtendimento = (id, atendimento) =>
    api.put(`/atendimentos/${id}`, atendimento);

export const excluirAtendimento = (id) =>
    api.delete(`/atendimentos/${id}`);