export function formatarDataHoraBrasil(valor, { incluirAno = true } = {}) {
    if (!valor) return "-";

    const data = new Date(valor);
    if (Number.isNaN(data.getTime())) return "-";

    const opcoes = {
        timeZone: "America/Sao_Paulo",
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    };

    if (incluirAno) {
        opcoes.year = "numeric";
    }

    return data.toLocaleString("pt-BR", opcoes);
}
