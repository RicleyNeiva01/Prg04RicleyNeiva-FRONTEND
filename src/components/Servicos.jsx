function Servicos(){
    return (
        <section className="mb-5">
            <h2 className="text-center mb-4">Serviços Disponíveis</h2>
            <div className="row g-3">

                <div className="col-lg-4 col-md-6">
                    <div className="card h-100">
                        <div className="card-body text-center">
                            <h5>🖥️ Manutenção de Computadores</h5>
                            <p className="card-text">Reparação e manutenção preventiva de equipamentos.</p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6">
                    <div className="card h-100">
                        <div className="card-body text-center">
                            <h5>🌐 Problemas de Rede</h5>
                            <p className="card-text">Suporte a conectividade e problemas de rede.</p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6">
                    <div className="card h-100">
                        <div className="card-body text-center">
                            <h5>💻 Suporte a Software</h5>
                            <p className="card-text">Assistência com aplicações e sistemas operacionais.</p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6">
                    <div className="card h-100">
                        <div className="card-body text-center">
                            <h5>🔐 Problemas de Login</h5>
                            <p className="card-text">Suporte a acesso e recuperação de credenciais.</p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6">
                    <div className="card h-100">
                        <div className="card-body text-center">
                            <h5>🔧 Suporte a hardware</h5>
                            <p className="card-text">Diagnóstico e reparo de componentes físicos.</p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6">
                    <div className="card h-100">
                        <div className="card-body text-center">
                            <h5>⚙️ Configuração de Sistema</h5>
                            <p className="card-text">Setup e otimização de ambientes de trabalho.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Servicos;