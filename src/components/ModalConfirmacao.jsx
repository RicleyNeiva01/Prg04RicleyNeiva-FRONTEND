import React from "react";
import { FaExclamationTriangle, FaTimes, FaTrashAlt } from "react-icons/fa";

function ModalConfirmacao({
    mostrar,
    fechar,
    aoConfirmar,
    titulo,
    mensagem,
    observacao,
    textoBotaoConfirmar = "Excluir",
    iconeBotaoConfirmar = <FaTrashAlt className="me-2" />,
    classeBotaoConfirmar = "btn btn-danger",
    desabilitarConfirmar = false
}) {
    if (!mostrar) return null;

    const classeConfirmarFinal = classeBotaoConfirmar?.startsWith("btn")
        ? classeBotaoConfirmar
        : `btn ${classeBotaoConfirmar}`;

    return (
        <div className="modal-overlay" onClick={fechar}>
            <div
                className="modal-glass-card text-center"
                onClick={(e) => e.stopPropagation()}
                style={{ width: "470px", maxWidth: "95%", padding: "30px" }}
            >
                <div className="mb-4">
                    <FaExclamationTriangle size={45} style={{ color: "#FFC107", marginBottom: "15px" }} />
                    <h3 className="titulo-pagina mb-0" style={{ fontSize: "1.25rem" }}>
                        {titulo}
                    </h3>
                </div>

                <div className="text-center">
                    <p className="mb-2" style={{ fontSize: "17px", color: "#F2F2F2" }}>
                        {mensagem}
                    </p>

                    <small className="texto-ajuda">
                        {observacao}
                    </small>
                </div>

                <div className="d-flex justify-content-center gap-3 mt-4">
                    <button
                        className="btn btn-cancelar d-flex align-items-center px-4"
                        onClick={(e) => {
                            e.stopPropagation();
                            fechar();
                        }}
                        type="button"
                    >
                        <FaTimes className="me-2" /> Cancelar
                    </button>

                    <button
                        className={`${classeConfirmarFinal} d-flex align-items-center px-4`}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (aoConfirmar) {
                                aoConfirmar();
                            }
                        }}
                        disabled={desabilitarConfirmar}
                        type="button"
                    >
                        {iconeBotaoConfirmar} {textoBotaoConfirmar}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalConfirmacao;