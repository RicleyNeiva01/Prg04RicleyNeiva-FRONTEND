function ModalConfirmacao({
    mostrar,
    fechar,
    aoConfirmar,
    titulo,
    mensagem,
    observacao
}) {

    if (!mostrar) return null;

    return (

        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,.6)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999
            }}
            onClick={fechar}
        >

            <div
                className="modal-confirmacao"
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: "470px",
                    maxWidth: "95%",
                    background: "#1D164D",
                    border: "1px solid #05BBD0",
                    borderRadius: "20px",
                    padding: "30px",
                    color: "white",
                    boxShadow: "0 15px 45px rgba(0,0,0,.45)"
                }}
            >

                <h3
                    className="text-center mb-3"
                    style={{ color: "#20D6F7" }}
                >
                    ⚠ {titulo}
                </h3>

                <div className="text-center">

                    <p
                        style={{
                            fontSize: "17px",
                            marginBottom: "10px"
                        }}
                    >
                        {mensagem}
                    </p>

                    <small
                        style={{
                            color: "#BFC7D5"
                        }}
                    >
                        {observacao}
                    </small>

                </div>

                <div
                    className="d-flex justify-content-center gap-3 mt-4"
                >

                    <button
                        className="btn-cancelar"
                        onClick={fechar}
                    >
                        Cancelar
                    </button>

                    <button
                        className="btn-excluir"
                        onClick={aoConfirmar}
                    >
                        🗑 Excluir
                    </button>

                </div>

            </div>

        </div>

    );

}

export default ModalConfirmacao;