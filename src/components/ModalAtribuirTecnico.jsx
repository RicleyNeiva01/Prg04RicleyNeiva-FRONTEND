import { useState, useEffect } from "react";
import { listarTecnicos } from "../services/tecnicoService";

function ModalAtribuirTecnico({ mostrar, fechar, chamado, aoSalvar }) {
    const [tecnicos, setTecnicos] = useState([]);
    const [tecnicoId, setTecnicoId] = useState("");
    const [erro, setErro] = useState("");

    useEffect(() => {
        async function carregarTecnicos() {
            try {
                const response = await listarTecnicos(false, 0, 100);
                setTecnicos(response.data.content || response.data || []);
            } catch (error) {
                console.error("Erro ao carregar técnicos", error);
            }
        }

        if (mostrar) {
            carregarTecnicos();
            setTecnicoId("");
            setErro("");
        }
    }, [mostrar]);

    if (!mostrar) return null;

    function handleSubmit(e) {
        e.preventDefault();

        if (!tecnicoId) {
            setErro("Selecione um técnico.");
            return;
        }

        aoSalvar(chamado.id, Number(tecnicoId));
    }

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,.6)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
                padding: "20px"
            }}
            onClick={fechar}
        >
            <div
                style={{
                    background: "#1D164D",
                    border: "1px solid #05BBD0",
                    borderRadius: "15px",
                    padding: "25px",
                    color: "white",
                    width: "480px",
                    maxWidth: "100%"
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <h3 style={{ margin: 0 }}>👨‍🔧 Atribuir Técnico</h3>
                    <button
                        onClick={fechar}
                        style={{ border: "none", background: "transparent", color: "#fff", fontSize: "28px", cursor: "pointer" }}
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Chamado</label>
                        <input
                            className="form-control"
                            value={chamado?.titulo || ""}
                            disabled
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Selecionar técnico</label>
                        <select
                            className={`form-select ${erro ? "is-invalid" : ""}`}
                            value={tecnicoId}
                            onChange={(e) => {
                                setTecnicoId(e.target.value);
                                setErro("");
                            }}
                        >
                            <option value="">Selecione um técnico</option>
                            {tecnicos.map((tecnico) => (
                                <option key={tecnico.id} value={tecnico.id}>
                                    {tecnico.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="acoes-formulario">
                        <button type="button" className="btn btn-cancelar" onClick={fechar}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-atendimento">
                            Salvar Atribuição
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalAtribuirTecnico;
