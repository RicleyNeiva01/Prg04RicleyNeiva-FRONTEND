import { useState, useEffect } from "react";

function FormularioUsuario({ fechar, aoSalvar, usuario }) {

    const [dadosFormulario, setDadosFormulario] = useState({

        nome: "",
        cpf: "",
        telefone: "",
        email: "",
        senha: "",
        perfil: "USUARIO_COMUM"

    });

    useEffect(() => {

        if (usuario) {

            setDadosFormulario({
                ...usuario,
                senha: ""
            });

        }

    }, [usuario]);

    function handleChange(e) {

        setDadosFormulario({

            ...dadosFormulario,
            [e.target.name]: e.target.value

        });

    }

    function handleSubmit(e) {

        e.preventDefault();

        const usuarioEnviar = { ...dadosFormulario };

        if (usuarioEnviar.senha.trim() === "") {

            delete usuarioEnviar.senha;

        }

        aoSalvar(usuarioEnviar);

    }

    return (

        <form
            className="form-modal"
            onSubmit={handleSubmit}
        >

            <div className="mb-3">

                <label className="form-label">
                    Nome
                </label>

                <input
                    type="text"
                    className="form-control"
                    name="nome"
                    value={dadosFormulario.nome}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">

                <label className="form-label">
                    CPF
                </label>

                <input
                    type="text"
                    className="form-control"
                    name="cpf"
                    value={dadosFormulario.cpf}
                    onChange={handleChange}
                />

            </div>

            <div className="mb-3">

                <label className="form-label">
                    Telefone
                </label>

                <input
                    type="text"
                    className="form-control"
                    name="telefone"
                    value={dadosFormulario.telefone}
                    onChange={handleChange}
                />

            </div>

            <div className="mb-3">

                <label className="form-label">
                    Email
                </label>

                <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={dadosFormulario.email}
                    onChange={handleChange}
                />

            </div>

            <div className="mb-3">

                <label className="form-label">
                    Senha
                </label>

                <input
                    type="password"
                    className="form-control"
                    name="senha"
                    value={dadosFormulario.senha}
                    onChange={handleChange}
                />
                {usuario && (
                    <small
                        className="d-block mt-2"
                        style={{
                            color: "#AFC4FF",
                            fontSize: "13px"
                        }}
                    >
                        🔒 Deixe a senha em branco para manter a senha atual.
                    </small>
                )}

            </div>

            <div className="mb-4">

                <label className="form-label">
                    Perfil
                </label>

                <select
                    className="form-select"
                    name="perfil"
                    value={dadosFormulario.perfil}
                    onChange={handleChange}
                >

                    <option value="USUARIO_COMUM">
                        Usuário Comum
                    </option>

                    <option value="TECNICO">
                        Técnico
                    </option>

                    <option value="ADMIN">
                        Administrador
                    </option>

                </select>

            </div>

            <div className="d-flex justify-content-end gap-3">

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={fechar}
                >
                    Cancelar
                </button>

                <button
                    type="submit"
                    className="btn btn-custom"
                >
                    Salvar
                </button>

            </div>

        </form>

    );

}

export default FormularioUsuario;