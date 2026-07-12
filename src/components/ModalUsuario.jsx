import FormularioUsuario from "./FormularioUsuario";

function ModalUsuario({ mostrar, fechar, aoSalvar, usuario }) {

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
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: "620px",
                    maxWidth: "95%",
                    background: "#1D164D",
                    border: "1px solid #05BBD0",
                    borderRadius: "15px",
                    padding: "25px",
                    color: "white"
                }}
            >

                <div
                    className="modal-header-custom"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px"
                    }}
                >

                    <h3 className="titulo-pagina">
                        {usuario ? "👤 Editar Usuário" : "👤 Cadastrar Usuário"}
                    </h3>

                    <button
                        onClick={fechar}
                        style={{
                            border: "none",
                            background: "transparent",
                            color: "#fff",
                            fontSize: "30px",
                            cursor: "pointer"
                        }}
                    >
                        ×
                    </button>

                </div>

                <FormularioUsuario
                    fechar={fechar}
                    aoSalvar={aoSalvar}
                    usuario={usuario}
                />

            </div>

        </div>

    );

}

export default ModalUsuario;