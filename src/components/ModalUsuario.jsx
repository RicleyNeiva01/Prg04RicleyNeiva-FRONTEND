import FormularioUsuario from "./FormularioUsuario";

function ModalUsuario({ mostrar, fechar, aoSalvar, usuario }) {
    if (!mostrar) return null;

    return (
        <div className="modal-overlay" onClick={fechar}>
            <div className="modal-glass-card" onClick={(e) => e.stopPropagation()}>
                
                <div className="modal-header-custom d-flex justify-content-between align-items-center">
                    <h3 className="titulo-pagina m-0">
                        {usuario ? "👤 Editar Usuário" : "👤 Cadastrar Usuário"}
                    </h3>

                    <button className="fechar-modal" onClick={fechar} title="Fechar">
                        &times;
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