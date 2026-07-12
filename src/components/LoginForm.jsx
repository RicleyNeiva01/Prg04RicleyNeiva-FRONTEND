import { Link } from "react-router-dom";

function LoginForm(){
    return (
        <div>
            <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6">     

                <section>
                    <div className="login-box">
                    <form>
                            <div className="mb-3">
                                <label htmlFor="nome" className="form-label">Nome:</label>
                                <input type="text" className="form-control" id="nome" name="nome" placeholder="Digite seu nome" required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input type="email" className="form-control" id="email" name="email" placeholder="Digite seu email" required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="senha" className="form-label">Senha:</label>
                                <input type="password" className="form-control" id="senha" name="senha" placeholder="Digite sua senha" required minLength="4" pattern=".{4,}" />
                            </div>

                                <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-custom">
                                    Entrar
                            </button>
                                <Link to="/" className="btn btn-secondary">Voltar</Link>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </div>
        </div>
    );
}

export default LoginForm;