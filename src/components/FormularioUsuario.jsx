import { useState, useEffect } from "react";
import { FaSave, FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";

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
    const [salvando, setSalvando] = useState(false);

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

        if (name === "cpf") value = aplicarMascaraCPF(value);
        if (name === "telefone") value = aplicarMascaraTelefone(value);

        setDadosFormulario({
            ...dadosFormulario,
            [name]: value
        });

        if (erros[name]) {
            setErros({ ...erros, [name]: "" });
        }
    }

    function validarFormulario() {
        const novosErros = {};

        if (!dadosFormulario.nome.trim()) {
            novosErros.nome = "O nome é obrigatório.";
        } else if (dadosFormulario.nome.trim().length < 3) {
            novosErros.nome = "O nome deve possuir pelo menos 3 caracteres.";
        }

        const cpf = dadosFormulario.cpf.replace(/\D/g, "");
        if (!cpf) {
            novosErros.cpf = "O CPF é obrigatório.";
        } else if (cpf.length !== 11) {
            novosErros.cpf = "O CPF deve conter 11 dígitos.";
        }

        const telefone = dadosFormulario.telefone.replace(/\D/g, "");
        if (!telefone) {
            novosErros.telefone = "O telefone é obrigatório.";
        } else if (telefone.length < 10) {
            novosErros.telefone = "Telefone inválido.";
        }

        if (!dadosFormulario.email.trim()) {
            novosErros.email = "O e-mail é obrigatório.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dadosFormulario.email)) {
            novosErros.email = "Informe um e-mail válido.";
        }

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

    async function handleSubmit(e) {
        e.preventDefault();
        if (!validarFormulario()) return;

        setSalvando(true);
        try {
            const usuarioEnviar = { ...dadosFormulario };
            usuarioEnviar.cpf = usuarioEnviar.cpf.replace(/\D/g, "");
            usuarioEnviar.telefone = usuarioEnviar.telefone.replace(/\D/g, "");

            if (usuarioEnviar.senha.trim() === "") delete usuarioEnviar.senha;

            await aoSalvar(usuarioEnviar);
        } catch (error) {
            console.error("Erro ao salvar usuário:", error);
        } finally {
            setSalvando(false);
        }
    }

    return (
        <form className="form-modal text-start" onSubmit={handleSubmit}>

            {/* Primeira Linha: Nome e CPF */}
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Nome Completo</label>
                    <input
                        type="text"
                        className={`form-control input-glass ${erros.nome ? "is-invalid" : ""}`}
                        name="nome"
                        placeholder="Digite o nome..."
                        value={dadosFormulario.nome}
                        onChange={handleChange}
                    />
                    {erros.nome && <small className="erro-formulario">{erros.nome}</small>}
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">CPF</label>
                    <input
                        type="text"
                        className={`form-control input-glass ${erros.cpf ? "is-invalid" : ""}`}
                        name="cpf"
                        placeholder="000.000.000-00"
                        value={dadosFormulario.cpf}
                        onChange={handleChange}
                    />
                    {erros.cpf && <small className="erro-formulario">{erros.cpf}</small>}
                </div>
            </div>

            {/* Segunda Linha: Telefone e Email */}
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Telefone</label>
                    <input
                        type="text"
                        className={`form-control input-glass ${erros.telefone ? "is-invalid" : ""}`}
                        name="telefone"
                        placeholder="(00) 00000-0000"
                        value={dadosFormulario.telefone}
                        onChange={handleChange}
                    />
                    {erros.telefone && <small className="erro-formulario">{erros.telefone}</small>}
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className={`form-control input-glass ${erros.email ? "is-invalid" : ""}`}
                        name="email"
                        placeholder="exemplo@email.com"
                        value={dadosFormulario.email}
                        onChange={handleChange}
                    />
                    {erros.email && <small className="erro-formulario">{erros.email}</small>}
                </div>
            </div>

            {/* Terceira Linha: Senha e Perfil */}
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Senha</label>
                    <div className="campo-senha position-relative">
                        <input
                            type={mostrarSenha ? "text" : "password"}
                            className={`form-control input-glass ${erros.senha ? "is-invalid" : ""}`}
                            name="senha"
                            placeholder={usuario ? "••••••••" : "Mínimo 6 caracteres"}
                            value={dadosFormulario.senha}
                            onChange={handleChange}
                            style={{ paddingRight: "40px" }}
                        />
                        <button
                            type="button"
                            className="btn-mostrar-senha"
                            onClick={() => setMostrarSenha(!mostrarSenha)}
                        >
                            {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {erros.senha && <small className="erro-formulario">{erros.senha}</small>}
                    {usuario && (
                        <small className="texto-ajuda d-block mt-1">
                            🔒 Deixe em branco para manter a atual.
                        </small>
                    )}
                </div>

                <div className="col-md-6 mb-4">
                    <label className="form-label">Perfil</label>
                    <select
                        className="form-select input-glass"
                        name="perfil"
                        value={dadosFormulario.perfil}
                        onChange={handleChange}
                        disabled={dadosFormulario.perfil === "TECNICO"}
                    >
                        {dadosFormulario.perfil === "TECNICO" ? (
                            <option value="TECNICO">Técnico</option>
                        ) : (
                            <>
                                <option value="USUARIO_COMUM">Usuário Comum</option>
                                <option value="ADMIN">Administrador</option>
                            </>
                        )}
                    </select>
                </div>
            </div>

            {/* Botões de Ação */}
            <div className="acoes-formulario pt-3 mt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <button type="button" className="btn btn-cancelar d-flex align-items-center justify-content-center" onClick={fechar} disabled={salvando}>
                    <FaTimes className="me-2" /> Cancelar
                </button>

                <button type="submit" className="btn btn-custom d-flex align-items-center justify-content-center" disabled={salvando}>
                    {salvando ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                            Salvando...
                        </>
                    ) : (
                        <>
                            <FaSave className="me-2" /> Salvar
                        </>
                    )}
                </button>
            </div>

        </form>
    );
}

export default FormularioUsuario;