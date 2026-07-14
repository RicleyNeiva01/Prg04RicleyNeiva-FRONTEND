import FormularioTecnico from "./FormularioTecnico";

function ModalTecnico({ mostrar, fechar, aoSalvar, tecnico }) {

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
                zIndex: 9999,
                padding: "20px",
                overflowY: "auto"
            }}
            onClick={fechar}
        >

            <div
                className="modal-usuario"
                onClick={(e) => e.stopPropagation()}
                style={{
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
                        {tecnico ? "🛠️ Editar Técnico" : "🛠️ Cadastrar Técnico"}
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

                <FormularioTecnico
                    fechar={fechar}
                    aoSalvar={aoSalvar}
                    tecnico={tecnico}
                />

            </div>

        </div>

    );

}

export default ModalTecnico;