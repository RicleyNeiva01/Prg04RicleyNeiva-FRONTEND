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

function normalizarPerfil(perfil) {
    if (!perfil) return null;

    const valor = String(perfil).trim().toUpperCase();

    if (valor.includes("ADMIN")) return "ADMIN";
    if (valor.includes("TECNICO")) return "TECNICO";
    if (valor.includes("USER") || valor.includes("USUARIO")) return "USUARIO_COMUM";

    return valor;
}

function obterPerfil(payload) {
    const candidatos = [
        payload?.perfil,
        payload?.role,
        payload?.roles,
        payload?.authorities,
        payload?.scope,
        payload?.permissao,
    ];

    for (const candidato of candidatos) {
        if (!candidato) continue;

        if (Array.isArray(candidato)) {
            const valor = candidato.find((item) => typeof item === "string" && item.trim());
            if (valor) return valor;
        }

        if (typeof candidato === "string") {
            const valores = candidato.split(",").map((item) => item.trim()).filter(Boolean);
            if (valores.length > 0) return valores[0];
        }
    }

    return null;
}

function useAuth() {
    const token = localStorage.getItem("token");

    const usuario = useMemo(() => {
        if (!token) return null;
        const payload = parseJwt(token);
        if (!payload) return null;

        const perfil = normalizarPerfil(obterPerfil(payload));

        return {
            email: payload.sub,
            perfil,
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