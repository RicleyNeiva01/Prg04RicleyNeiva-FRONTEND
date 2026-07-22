import { useState, useEffect } from "react";
import { FaSave, FaTimes } from "react-icons/fa";

function FormularioCategoria({ fechar, aoSalvar, categoria }) {
    const [dadosFormulario, setDadosFormulario] = useState({
        nome: "",
        descricao: ""
    });

    const [erros, setErros] = useState({});
    const [salvando, setSalvando] = useState(false);

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

    async function handleSubmit(e) {
        e.preventDefault();

        if (!validarFormulario()) {
            return;
        }

        setSalvando(true);
        try {
            await aoSalvar(dadosFormulario);
        } catch (error) {
            console.error("Erro ao salvar categoria:", error);
        } finally {
            setSalvando(false);
        }
    }

    return (
        <form className="form-modal text-start" onSubmit={handleSubmit}>

            {/* Primeira Linha: Nome */}
            <div className="row">
                <div className="col-12 mb-3">
                    <label className="form-label">Nome</label>
                    <input
                        type="text"
                        className={`form-control input-glass ${erros.nome ? "is-invalid" : ""}`}
                        name="nome"
                        placeholder="Ex: Hardware, Software, Rede..."
                        value={dadosFormulario.nome}
                        onChange={handleChange}
                    />
                    {erros.nome && <small className="erro-formulario">{erros.nome}</small>}
                </div>
            </div>

            {/* Segunda Linha: Descrição */}
            <div className="row">
                <div className="col-12 mb-4">
                    <label className="form-label">Descrição</label>
                    <textarea
                        className={`form-control input-glass ${erros.descricao ? "is-invalid" : ""}`}
                        name="descricao"
                        rows="4"
                        placeholder="Descreva o propósito dessa categoria..."
                        value={dadosFormulario.descricao}
                        onChange={handleChange}
                    />
                    {erros.descricao && <small className="erro-formulario">{erros.descricao}</small>}
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

export default FormularioCategoria;