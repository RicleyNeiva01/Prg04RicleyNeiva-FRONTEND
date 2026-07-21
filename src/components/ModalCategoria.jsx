import FormularioCategoria from "./FormularioCategoria";

function ModalCategoria({ mostrar, fechar, aoSalvar, categoria }) {
    if (!mostrar) return null;

    return (
        <div className="modal-overlay" onClick={fechar}>
            
            <div className="modal-glass-card" onClick={(e) => e.stopPropagation()}>
                
                <div className="modal-header-custom d-flex justify-content-between align-items-center">
                    <h3 className="titulo-pagina m-0">
                        {categoria ? "🏷️ Editar Categoria" : "🏷️ Cadastrar Categoria"}
                    </h3>

                    <button className="fechar-modal" onClick={fechar} title="Fechar">
                        &times;
                    </button>
                </div>

                <FormularioCategoria
                    fechar={fechar}
                    aoSalvar={aoSalvar}
                    categoria={categoria}
                />
                
            </div>
            
        </div>
    );
}

export default ModalCategoria;