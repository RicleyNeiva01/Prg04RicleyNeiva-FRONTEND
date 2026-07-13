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

    const [erros, setErros] = useState({});
    const [mostrarSenha, setMostrarSenha] = useState(false);


    useEffect(() => {

        if (usuario) {

            setDadosFormulario({
                ...usuario,
                senha: ""
            });

        }

    }, [usuario]);

    function aplicarMascaraCPF(valor) {

        valor = valor.replace(/\D/g, "").slice(0, 11);
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        return valor;
    }

    function aplicarMascaraTelefone(valor) {
        valor = valor.replace(/\D/g, "").slice(0, 11);

        if (valor.length <= 10) {
            valor = valor.replace(/(\d{2})(\d)/, "($1) $2");
            valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
        } else {
            valor = valor.replace(/(\d{2})(\d)/, "($1) $2");
            valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
        }

        return valor;

    }

    function handleChange(e) {
        let { name, value } = e.target;

        if (name === "cpf") {
            value = aplicarMascaraCPF(value);
        }

        if (name === "telefone") {
            value = aplicarMascaraTelefone(value);
        }

        setDadosFormulario({
            ...dadosFormulario,
            [name]: value
        });

        if (erros[name]) {
            setErros({
                ...erros,
                [name]: ""
            });
        }
    }

    function validarFormulario() {

        const novosErros = {};
        // Nome
        if (!dadosFormulario.nome.trim()) {
            novosErros.nome = "O nome é obrigatório.";
        } else if (dadosFormulario.nome.trim().length < 3) {
            novosErros.nome = "O nome deve possuir pelo menos 3 caracteres.";
        }

        // CPF
        const cpf = dadosFormulario.cpf.replace(/\D/g, "");

        if (!cpf) {
            novosErros.cpf = "O CPF é obrigatório.";
        } else if (cpf.length !== 11) {
            novosErros.cpf = "O CPF deve conter 11 dígitos.";

        }

        // Telefone
        const telefone = dadosFormulario.telefone.replace(/\D/g, "");
        if (!telefone) {
            novosErros.telefone = "O telefone é obrigatório.";
        } else if (telefone.length < 10) {
            novosErros.telefone = "Telefone inválido.";

        }

        // Email
        if (!dadosFormulario.email.trim()) {
            novosErros.email = "O e-mail é obrigatório.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dadosFormulario.email)) {
            novosErros.email = "Informe um e-mail válido.";

        }

        // Senha
        if (!usuario) {
            if (!dadosFormulario.senha.trim()) {
                novosErros.senha = "A senha é obrigatória.";
            } else if (dadosFormulario.senha.length < 6) {
                novosErros.senha = "A senha deve possuir pelo menos 6 caracteres.";

            }

        }
        setErros(novosErros);

        return Object.keys(novosErros).length === 0;

    }

    function handleSubmit(e) {

        e.preventDefault();
        if (!validarFormulario()) {

            return;

        }
        const usuarioEnviar = { ...dadosFormulario };

        usuarioEnviar.cpf = usuarioEnviar.cpf.replace(/\D/g, "");
        usuarioEnviar.telefone = usuarioEnviar.telefone.replace(/\D/g, "");
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
                    Nome Completo
                </label>

                <input
                    type="text"
                    className={`form-control ${erros.nome ? "is-invalid" : ""}`}
                    name="nome"
                    value={dadosFormulario.nome}
                    onChange={handleChange}
                />

                {erros.nome && (
                    <small className="erro-formulario">
                        {erros.nome}
                    </small>
                )}
            </div>

            <div className="mb-3">

                <label className="form-label">
                    CPF
                </label>

                <input
                    type="text"
                    className={`form-control ${erros.cpf ? "is-invalid" : ""}`}
                    name="cpf"
                    value={dadosFormulario.cpf}
                    onChange={handleChange}
                />

                {erros.cpf && (
                    <small className="erro-formulario">
                        {erros.cpf}
                    </small>
                )}

            </div>

            <div className="mb-3">

                <label className="form-label">
                    Telefone
                </label>

                <input
                    type="text"
                    className={`form-control ${erros.telefone ? "is-invalid" : ""}`}
                    name="telefone"
                    value={dadosFormulario.telefone}
                    onChange={handleChange}
                />

                {erros.telefone && (
                    <small className="erro-formulario">
                        {erros.telefone}
                    </small>
                )}

            </div>

            <div className="mb-3">

                <label className="form-label">
                    Email
                </label>

                <input
                    type="email"
                    className={`form-control ${erros.email ? "is-invalid" : ""}`}
                    name="email"
                    value={dadosFormulario.email}
                    onChange={handleChange}
                />

                {erros.email && (
                    <small className="erro-formulario">
                        {erros.email}
                    </small>
                )}

            </div>

            <div className="mb-3">
                <label className="form-label">Senha</label>
                <div className="campo-senha">
                    <input
                        type={mostrarSenha ? "text" : "password"}
                        className={`form-control ${erros.senha ? "is-invalid" : ""}`}
                        name="senha"
                        value={dadosFormulario.senha}
                        onChange={handleChange}
                    />
                    <button
                        type="button"
                        className="btn-mostrar-senha"
                        onClick={() => setMostrarSenha(!mostrarSenha)}
                    >
                        {mostrarSenha ? "🔓" : "🔒"}
                    </button>
                </div>
                {erros.senha && (
                    <small className="erro-formulario">{erros.senha}</small>
                )}
                {usuario && (
                    <small className="d-block mt-2" style={{ color: "#AFC4FF", fontSize: "13px" }}>
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

            <div className="acoes-formulario">

                <button
                    type="button"
                    className="btn btn-cancelar"
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