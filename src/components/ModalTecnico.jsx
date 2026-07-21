import FormularioTecnico from "./FormularioTecnico";

function ModalTecnico({ mostrar, fechar, aoSalvar, tecnico }) {
    if (!mostrar) return null;

    return (
        <div className="modal-overlay" onClick={fechar}>
            
            <div className="modal-glass-card" onClick={(e) => e.stopPropagation()}>
                
                <div className="modal-header-custom d-flex justify-content-between align-items-center">
                    <h3 className="titulo-pagina m-0">
                        {tecnico ? "🛠️ Editar Técnico" : "🛠️ Cadastrar Técnico"}
                    </h3>

                    <button className="fechar-modal" onClick={fechar} title="Fechar">
                        &times;
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