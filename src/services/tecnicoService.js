import axios from "axios";
import API_URL from "./api";

// Atualizado: agora aceita o parâmetro mostrarInativos (padrão false)
export const listarTecnicos = (mostrarInativos = false, pagina = 0, tamanho = 6) => {
    // O sort=nome,asc avisa o Spring Boot para ordenar alfabeticamente!
    return axios.get(`${API_URL}/tecnicos?mostrarInativos=${mostrarInativos}&page=${pagina}&size=${tamanho}&sort=nome,asc`);
};

export const buscarTecnicoPorId = (id) => {
    return axios.get(`${API_URL}/tecnicos/${id}`);
};

// Atualizado: agora aceita o parâmetro mostrarInativos na busca por nome
export const buscarTecnicoPorNome = (nome, mostrarInativos = false) => {
    return axios.get(`${API_URL}/tecnicos?nome=${nome}&mostrarInativos=${mostrarInativos}`);
};

export const cadastrarTecnico = (tecnico) => {
    return axios.post(`${API_URL}/tecnicos`, tecnico);
};

export const atualizarTecnico = (id, tecnico) => {
    return axios.put(`${API_URL}/tecnicos/${id}`, tecnico);
};

export const excluirTecnico = (id) => {
    return axios.delete(`${API_URL}/tecnicos/${id}`);
};