function Funcionalidades(){
    return(
        <section className="mb-5">
            <h2 className="text-center mb-4">Funcionalidades</h2>
            <div className="row g-3">

                <div className="col-md-4">
                    <div className="card h-100">
                        <div className="card-body text-center">
                                <h5>Cadastro de Problemas</h5>
                                <p className="card-text">Usuários podem registrar problemas em computadores e redes.</p>
                        </div>
                    </div>
                </div>
       
                <div className="col-md-4">
                    <div className="card h-100">
                        <div className="card-body text-center">
                            <h5>Acompanhamento</h5>
                            <p className="card-text">Permissaõ para o usuário verificar o status do seu chamado.</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card h-100">
                        <div className="card-body text-center">
                            <h5>Resolução</h5>
                            <p className="card-text">Técnicos registram as soluções aplicadas aos problemas.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Funcionalidades;