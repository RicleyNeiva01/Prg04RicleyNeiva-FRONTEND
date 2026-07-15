import { useState, useEffect } from "react";

import { listarUsuarios, listarTecnicos } from "../services/usuarioService";
import { listarCategorias } from "../services/categoriaService";

function FormularioChamado({ fechar, aoSalvar, chamado }) {

    const [dadosFormulario, setDadosFormulario] = useState({
        titulo: "",
        descricao: "",
        prioridade: "MEDIA",
        categoriaId: "",
        usuarioId: "",
        tecnicoId: ""
    });

    const [erros, setErros] = useState({});

    const [usuarios, setUsuarios] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [tecnicos, setTecnicos] = useState([]);


    useEffect(() => {

        if (chamado) {

            setDadosFormulario({
                titulo: chamado.titulo,
                descricao: chamado.descricao,
                prioridade: chamado.prioridade,
                categoriaId: chamado.categoria?.id || "",
                usuarioId: chamado.usuario?.id || "",
                tecnicoId: chamado.tecnico?.id || ""
            });

        }

    }, [chamado]);

    useEffect(() => {
        carregarDados();
    }, []);

    async function carregarDados() {
        try {
            const [usuariosResponse, categoriasResponse, tecnicosResponse] =
                await Promise.all([
                    listarUsuarios(),
                    listarCategorias(),
                    listarTecnicos()
                ]);

            setUsuarios(usuariosResponse.data.content || usuariosResponse.data);
            setCategorias(categoriasResponse.data.content || categoriasResponse.data);
            setTecnicos(tecnicosResponse.data.content || tecnicosResponse.data);

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
        }

        if (!dadosFormulario.descricao.trim()) {
            novosErros.descricao = "Informe a descrição.";
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
            ...dadosFormulario
        };
        if (!chamadoEnviar.tecnicoId) {
            delete chamadoEnviar.tecnicoId;
        }
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
                >
                    <option value="">Selecione o usuário...</option>
                    {usuarios.map(user => (
                        <option key={user.id} value={user.id}>{user.nome}</option>
                    ))}
                </select>
                {erros.usuarioId && <small className="erro-formulario">{erros.usuarioId}</small>}
            </div>

            {/* AQUI ESTÁ A MÁGICA: Só mostra o campo de técnico se for MODO EDIÇÃO */}
            {chamado && (
                <div className="mb-4 p-3 rounded" style={{ background: "rgba(5, 187, 208, 0.1)", border: "1px dashed #05BBD0" }}>
                    <label className="form-label text-info">Técnico Responsável</label>
                    <select
                        className="form-select"
                        name="tecnicoId"
                        value={dadosFormulario.tecnicoId}
                        onChange={handleChange}
                    >
                        <option value="">Nenhum técnico atribuído</option>
                        {tecnicos.map(tec => (
                            <option key={tec.id} value={tec.id}>{tec.nome}</option>
                        ))}
                    </select>
                    <small className="d-block mt-2" style={{ color: "#AFC4FF", fontSize: "13px" }}>
                        📌 Atribuir um técnico mudará automaticamente o status para "Em Andamento".
                    </small>
                </div>
            )}

            <div className="acoes-formulario mt-4 d-flex gap-2 justify-content-end">
                <button type="button" className="btn btn-cancelar" onClick={fechar}>
                    Cancelar
                </button>
                <button type="submit" className="btn btn-custom">
                    Salvar
                </button>
            </div>
        </form>
    );

}

export default FormularioChamado;