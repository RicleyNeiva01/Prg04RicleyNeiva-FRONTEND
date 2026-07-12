function ToastMensagem({ mostrar, mensagem, tipo }) {

    if (!mostrar) return null;

    return (

        <div
            style={{
                position: "fixed",
                top: "18px",
                right: "25px",
                minWidth: "280px",
                maxWidth: "340px",
                padding: "16px 22px",
                borderRadius: "14px",
                color: "#fff",
                fontWeight: "600",
                fontSize: "15px",
                boxShadow: "0 8px 25px rgba(0,0,0,.35)",
                zIndex: 99999,
                animation: "slideFade .35s ease"
            }}
            className={`bg-${tipo}`}
        >
            {tipo === "success" && "✅ "}
            {tipo === "danger" && "❌ "}
            {tipo === "warning" && "⚠️ "}
            {tipo === "info" && "ℹ️ "}

            {mensagem}

            <style>{`
                @keyframes slideFade {
    from {
        opacity: 0;
        transform: translateY(-15px) translateX(25px);
    }

    to {
        opacity: 1;
        transform: translateY(0) translateX(0);
    }
}
            `}</style>

        </div>

    );

}

export default ToastMensagem;