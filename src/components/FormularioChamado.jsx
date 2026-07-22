import { useState, useEffect } from "react";
import { listarCategorias } from "../services/categoriaService";
import { listarUsuarios } from "../services/usuarioService";
import { FaSave, FaTimes } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

function FormularioChamado({ fechar, aoSalvar, chamado }) {
    const { usuario, isAdmin, isTecnico } = useAuth();
    const isUsuarioComum = !isAdmin && !isTecnico;

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
    const [carregandoDados, setCarregandoDados] = useState(true);
    const [salvando, setSalvando] = useState(false);

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
                usuarioId: isUsuarioComum ? usuario?.id : ""
            });
            setErros({});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chamado]);

    useEffect(() => {
        carregarDados();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function carregarDados() {
        setCarregandoDados(true);
        try {
            const categoriasResponse = await listarCategorias(0, 100);
            setCategorias(categoriasResponse.data.content || categoriasResponse.data);

            // só carrega lista de usuários se for ADMIN
            if (isAdmin) {
                const usuariosResponse = await listarUsuarios(false, 0, 100);
                setUsuarios(usuariosResponse.data.content || usuariosResponse.data);
            }
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        } finally {
            setCarregandoDados(false);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setDadosFormulario({ ...dadosFormulario, [name]: value });
        if (erros[name]) setErros({ ...erros, [name]: "" });
    }

    function validarFormulario() {
        const novosErros = {};

        if (!dadosFormulario.titulo.trim())
            novosErros.titulo = "Informe o título.";
        else if (dadosFormulario.titulo.trim().length < 5)
            novosErros.titulo = "O título deve possuir pelo menos 5 caracteres.";

        if (!dadosFormulario.descricao.trim())
            novosErros.descricao = "Informe a descrição.";
        else if (dadosFormulario.descricao.trim().length < 10)
            novosErros.descricao = "A descrição deve possuir pelo menos 10 caracteres.";

        if (!dadosFormulario.categoriaId)
            novosErros.categoriaId = "Selecione uma categoria.";

        if (!dadosFormulario.usuarioId)
            novosErros.usuarioId = "Selecione um solicitante.";

        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!validarFormulario()) return;

        setSalvando(true);
        try {
            await aoSalvar({
                ...dadosFormulario,
                usuarioId: Number(dadosFormulario.usuarioId),
                categoriaId: Number(dadosFormulario.categoriaId)
            });
        } catch (error) {
            console.error("Erro ao salvar chamado:", error);
        } finally {
            setSalvando(false);
        }
    }

    return (
        <form className="form-modal text-start" onSubmit={handleSubmit}>
            {carregandoDados ? (
                <div className="text-center py-4 rounded-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="spinner-border text-info mb-2" role="status" />
                    <div className="texto-ajuda">Carregando opções do formulário...</div>
                </div>
            ) : (
                <>
                    <div className="mb-3">
                <label className="form-label">Título do Chamado</label>
                <input
                    type="text"
                    className={`form-control input-glass ${erros.titulo ? "is-invalid" : ""}`}
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
                    className={`form-control input-glass ${erros.descricao ? "is-invalid" : ""}`}
                    name="descricao"
                    rows="4"
                    value={dadosFormulario.descricao}
                    onChange={handleChange}
                    placeholder="Descreva o problema com o máximo de detalhes possível..."
                    style={{ resize: "none" }}
                />
                {erros.descricao && <small className="erro-formulario">{erros.descricao}</small>}
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Prioridade</label>
                    <select
                        className="form-select input-glass"
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
                        className={`form-select input-glass ${erros.categoriaId ? "is-invalid" : ""}`}
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

            {isAdmin && (
                <div className="mb-4">
                    <label className="form-label">Solicitante</label>
                    <select
                        className={`form-select input-glass ${erros.usuarioId ? "is-invalid" : ""}`}
                        name="usuarioId"
                        value={dadosFormulario.usuarioId}
                        onChange={handleChange}
                        disabled={!!chamado}
                    >
                        <option value="">Selecione o usuário...</option>
                        {usuarios.map(user => (
                            <option key={user.id} value={user.id}>{user.nome}</option>
                        ))}
                    </select>
                    {erros.usuarioId && <small className="erro-formulario">{erros.usuarioId}</small>}
                    {chamado && (
                        <small className="texto-ajuda d-block mt-1">
                            O solicitante não pode ser alterado após a abertura do chamado.
                        </small>
                    )}
                </div>
            )}

            <div className="acoes-formulario pt-3 mt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <button type="button" className="btn btn-cancelar d-flex align-items-center justify-content-center" onClick={fechar} disabled={salvando}>
                    <FaTimes className="me-2" /> Cancelar
                </button>
                <button type="submit" className="btn btn-custom d-flex align-items-center justify-content-center" disabled={salvando || carregandoDados}>
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
                </>
            )}
        </form>
    );
}

export default FormularioChamado;