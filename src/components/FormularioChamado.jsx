import { useState, useEffect } from "react";

import { listarUsuarios } from "../services/usuarioService";
import { listarCategorias } from "../services/categoriaService";
import { FaSave, FaTimes } from "react-icons/fa";

function FormularioChamado({ fechar, aoSalvar, chamado }) {

    const [dadosFormulario, setDadosFormulario] = useState({
        id: null,
        titulo: "",
        descricao: "",
        prioridade: "MEDIA",
        categoriaId: "",
        usuarioId: ""
    });

    const [erros, setErros] = useState({});

    const [usuarios, setUsuarios] = useState([]);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {

        if (chamado) {

            setDadosFormulario({
                id: chamado.id,
                titulo: chamado.titulo,
                descricao: chamado.descricao,
                prioridade: chamado.prioridade,
                categoriaId: chamado.categoria?.id || "",
                usuarioId: chamado.usuario?.id || ""
            });

        } else {

            setDadosFormulario({
                id: null,
                titulo: "",
                descricao: "",
                prioridade: "MEDIA",
                categoriaId: "",
                usuarioId: ""
            });
            setErros({});

        }

    }, [chamado]);

    useEffect(() => {
        carregarDados();
    }, []);

    async function carregarDados() {
        try {
            const [usuariosResponse, categoriasResponse] =
                await Promise.all([
                    listarUsuarios(false, 0, 100),
                    listarCategorias(0, 100)
                ]);

            setUsuarios(usuariosResponse.data.content || usuariosResponse.data);
            setCategorias(categoriasResponse.data.content || categoriasResponse.data);

        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        }
    }

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

        if (!dadosFormulario.titulo.trim()) {
            novosErros.titulo = "Informe o título.";
        } else if (dadosFormulario.titulo.trim().length < 5) {
            novosErros.titulo = "O título deve possuir pelo menos 5 caracteres.";
        }

        if (!dadosFormulario.descricao.trim()) {
            novosErros.descricao = "Informe a descrição.";
        } else if (dadosFormulario.descricao.trim().length < 10) {
            novosErros.descricao =
                "A descrição deve possuir pelo menos 10 caracteres.";
        }

        if (!dadosFormulario.categoriaId) {
            novosErros.categoriaId = "Selecione uma categoria.";
        }

        if (!dadosFormulario.usuarioId) {
            novosErros.usuarioId = "Selecione um solicitante.";
        }

        setErros(novosErros);

        return Object.keys(novosErros).length === 0;

    }

    function handleSubmit(e) {

        e.preventDefault();

        if (!validarFormulario()) return;

        const chamadoEnviar = {
            ...dadosFormulario,
            usuarioId: Number(dadosFormulario.usuarioId),
            categoriaId: Number(dadosFormulario.categoriaId)
        };

        aoSalvar(chamadoEnviar);

    }

    return (
        <form className="form-modal" onSubmit={handleSubmit}>

            <div className="mb-3">
                <label className="form-label">Título do Chamado</label>
                <input
                    type="text"
                    className={`form-control ${erros.titulo ? "is-invalid" : ""}`}
                    name="titulo"
                    value={dadosFormulario.titulo}
                    onChange={handleChange}
                    placeholder="Ex: Impressora não liga"
                />
                {erros.titulo && <small className="erro-formulario">{erros.titulo}</small>}
            </div>

            <div className="mb-3">
                <label className="form-label">Descrição</label>
                <textarea
                    className={`form-control ${erros.descricao ? "is-invalid" : ""}`}
                    name="descricao"
                    rows="3"
                    value={dadosFormulario.descricao}
                    onChange={handleChange}
                    placeholder="Detalhe o problema..."
                />
                {erros.descricao && <small className="erro-formulario">{erros.descricao}</small>}
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Prioridade</label>
                    <select
                        className="form-select"
                        name="prioridade"
                        value={dadosFormulario.prioridade}
                        onChange={handleChange}
                    >
                        <option value="BAIXA">Baixa</option>
                        <option value="MEDIA">Média</option>
                        <option value="ALTA">Alta</option>
                        <option value="URGENTE">Urgente</option>
                    </select>
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">Categoria</label>
                    <select
                        className={`form-select ${erros.categoriaId ? "is-invalid" : ""}`}
                        name="categoriaId"
                        value={dadosFormulario.categoriaId}
                        onChange={handleChange}
                    >
                        <option value="">Selecione...</option>
                        {categorias.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.nome}</option>
                        ))}
                    </select>
                    {erros.categoriaId && <small className="erro-formulario">{erros.categoriaId}</small>}
                </div>
            </div>

            <div className="mb-4">
                <label className="form-label">Solicitante</label>
                <select
                    className={`form-select ${erros.usuarioId ? "is-invalid" : ""}`}
                    name="usuarioId"
                    value={dadosFormulario.usuarioId}
                    onChange={handleChange}
                    disabled={!!chamado}
                >
                    <option value="">Selecione o usuário...</option>
                    {usuarios.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.nome}
                        </option>
                    ))}
                </select>

                {erros.usuarioId && (
                    <small className="erro-formulario">{erros.usuarioId}</small>
                )}

                {chamado && (
                    <small className="text-warning d-block mt-1">
                        O solicitante não pode ser alterado após a abertura do chamado.
                    </small>
                )}
            </div>

            <div className="acoes-formulario mt-4 d-flex gap-2 justify-content-end">
                <button type="button" className="btn btn-cancelar" onClick={fechar}>
                    <FaTimes className="me-2" /> Cancelar
                </button>
                <button type="submit" className="btn btn-custom">
                    <FaSave className="me-2" /> Salvar
                </button>
            </div>
        </form>
    );

}

export default FormularioChamado;