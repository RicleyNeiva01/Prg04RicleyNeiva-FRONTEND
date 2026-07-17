import { useState, useEffect } from "react";
import { FaSave, FaTimes } from "react-icons/fa";

function FormularioCategoria({ fechar, aoSalvar, categoria }) {

    const [dadosFormulario, setDadosFormulario] = useState({
        nome: "",
        descricao: ""
    });

    const [erros, setErros] = useState({});

    useEffect(() => {

        if (categoria) {
            setDadosFormulario(categoria);
        }

    }, [categoria]);

    function handleChange(e) {

        const { name, value } = e.target;

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

        if (!dadosFormulario.nome.trim()) {
            novosErros.nome = "O nome é obrigatório.";
        } else if (dadosFormulario.nome.trim().length < 3) {
            novosErros.nome = "O nome deve possuir pelo menos 3 caracteres.";
        }

        if (!dadosFormulario.descricao.trim()) {
            novosErros.descricao = "A descrição é obrigatória.";
        } else if (dadosFormulario.descricao.trim().length < 5) {
            novosErros.descricao = "A descrição deve possuir pelo menos 5 caracteres.";
        }

        setErros(novosErros);

        return Object.keys(novosErros).length === 0;
    }

    function handleSubmit(e) {

        e.preventDefault();

        if (!validarFormulario()) {
            return;
        }

        aoSalvar(dadosFormulario);
    }

    return (

        <form className="form-modal" onSubmit={handleSubmit}>

            <div className="mb-3">

                <label className="form-label">
                    Nome
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

            <div className="mb-4">

                <label className="form-label">
                    Descrição
                </label>

                <textarea
                    className={`form-control ${erros.descricao ? "is-invalid" : ""}`}
                    name="descricao"
                    rows="4"
                    value={dadosFormulario.descricao}
                    onChange={handleChange}
                />

                {erros.descricao && (
                    <small className="erro-formulario">
                        {erros.descricao}
                    </small>
                )}

            </div>

            <div className="acoes-formulario">

                <button
                    type="button"
                    className="btn btn-cancelar"
                    onClick={fechar}
                >
                    <FaTimes className="me-2" /> Cancelar
                </button>

                <button
                    type="submit"
                    className="btn btn-custom"
                >
                    <FaSave className="me-2" /> Salvar
                </button>

            </div>

        </form>

    );
}

export default FormularioCategoria;