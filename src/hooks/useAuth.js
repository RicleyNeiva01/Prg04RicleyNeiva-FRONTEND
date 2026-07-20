import { useMemo } from "react";

function parseJwt(token) {
    try {
        const base64 = token.split(".")[1];
        const base64Fixed = base64.replace(/-/g, "+").replace(/_/g, "/");
        const json = decodeURIComponent(
            atob(base64Fixed)
                .split("")
                .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );
        return JSON.parse(json);
    } catch {
        return null;
    }
}

function useAuth() {
    const token = localStorage.getItem("token");

    const usuario = useMemo(() => {
        if (!token) return null;
        const payload = parseJwt(token);
        if (!payload) return null;
        return {
            email: payload.sub,
            perfil: payload.perfil,   // "ADMIN", "TECNICO", "USUARIO_COMUM"
            id: payload.id,
            nome: payload.nome
        };
    }, [token]);

    const isAdmin = usuario?.perfil === "ADMIN";
    const isTecnico = usuario?.perfil === "TECNICO";
    const isUsuario = usuario?.perfil === "USUARIO_COMUM";

    return { usuario, isAdmin, isTecnico, isUsuario };
}

export default useAuth;