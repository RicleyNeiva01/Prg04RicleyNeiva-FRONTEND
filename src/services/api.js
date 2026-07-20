import axios from "axios";

const api = axios.create({
    baseURL: "https://prg04ricleyneiva-backend-production.up.railway.app",
});

// Antes de cada requisição, injeta o token se existir
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;