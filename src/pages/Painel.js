import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import api from "../services/api";
import { 
    FaTicketAlt, FaUsers, FaWrench, FaTags, 
    FaExclamationCircle, FaSpinner, FaCheckCircle, FaChartPie, FaFolderOpen 
} from "react-icons/fa";
// IMPORTANDO O RECHARTS
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

function Painel() {
    const { usuario, isAdmin, isTecnico } = useAuth();
    const [stats, setStats] = useState({
        total: 0,
        abertos: 0,
        emAndamento: 0,
        resolvidos: 0,
        tecnicos: 0,
        usuarios: 0,
    });
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        let ativo = true;

        async function carregarDashboard() {
            try {
                const response = await api.get("/dashboard");
                if (!ativo) return;

                const payload = response.data?.dados ?? response.data?.stats ?? response.data?.dashboard ?? response.data;
                const dados = payload?.content ?? payload?.data ?? payload;

                setStats({
                    total: dados?.total ?? dados?.totalChamados ?? dados?.quantidadeTotal ?? 0,
                    abertos: dados?.abertos ?? dados?.totalAbertos ?? 0,
                    emAndamento: dados?.emAndamento ?? dados?.totalEmAndamento ?? 0,
                    resolvidos: dados?.resolvidos ?? dados?.totalResolvidos ?? 0,
                    tecnicos: dados?.tecnicos ?? dados?.totalTecnicos ?? 0,
                    usuarios: dados?.usuarios ?? dados?.totalUsuarios ?? 0,
                });
            } catch (error) {
                console.error("Erro ao carregar dashboard:", error);
                if (ativo) {
                    setStats({
                        total: 0,
                        abertos: 0,
                        emAndamento: 0,
                        resolvidos: 0,
                        tecnicos: 0,
                        usuarios: 0,
                    });
                }
            } finally {
                if (ativo) {
                    setCarregando(false);
                }
            }
        }

        carregarDashboard();

        return () => {
            ativo = false;
        };
    }, []);

    function CardStat({ icone, label, valor, cor, destaque }) {
        return (
            <div className={`col-6 ${destaque ? "col-md-12 col-lg-4" : "col-md-4 col-lg-2"} d-flex flex-grow-1`}>
                <div 
                    className="card text-center p-4 h-100 glass-card d-flex flex-column justify-content-center w-100"
                    style={{ minWidth: destaque ? "250px" : "160px" }}
                >
                    <div style={{ fontSize: destaque ? "3rem" : "2rem", color: cor, marginBottom: "10px" }}>
                        {icone}
                    </div>
                    <div 
                        className="text-glow"
                        style={{ fontSize: destaque ? "3.5rem" : "2.2rem", fontWeight: "900", color: cor, lineHeight: "1" }}
                    >
                        {carregando ? "..." : valor ?? 0}
                    </div>
                    <small 
                        className="text-light opacity-75 fw-bold mt-2" 
                        style={{ 
                            letterSpacing: "1px", 
                            textTransform: "uppercase", 
                            fontSize: "0.8rem",
                            whiteSpace: "nowrap" 
                        }}
                    >
                        {label}
                    </small>
                </div>
            </div>
        );
    }

    // DADOS PARA O GRÁFICO
    const dadosGrafico = [
        { name: "Abertos", value: stats.abertos || 0, color: "#4da3ff" },
        { name: "Em Andamento", value: stats.emAndamento || 0, color: "#ffc107" },
        { name: "Resolvidos", value: stats.resolvidos || 0, color: "#20c997" }
    ];

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar paginaAtual="painel" />

            <main className="container flex-grow-1 py-5">
                {/* Cabeçalho */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
                    <div>
                        <h2 className="titulo-pagina d-flex align-items-center gap-3">
                            <FaChartPie style={{ color: "var(--ciano)" }} /> Dashboard
                        </h2>
                        <p className="subtitulo-pagina mb-0 fs-5">
                            Olá, <strong style={{ color: "var(--ciano)" }}>{usuario?.nome}</strong>! Bem-vindo(a) ao painel do DeskFlow.
                        </p>
                    </div>
                </div>

                {/* Cards de estatísticas */}
                <div className="row g-4 mb-5">
                    <CardStat icone={<FaTicketAlt />} label="Total de Chamados" valor={stats.total} cor="var(--ciano)" destaque={true} />
                    
                    <div className="col-12 col-lg-8">
                        <div className="row g-4 h-100 align-items-center">
                            <CardStat icone={<FaExclamationCircle />} label="Abertos" valor={stats.abertos} cor="#4da3ff" />
                            <CardStat icone={<FaSpinner />} label="Em Andamento" valor={stats.emAndamento} cor="#ffc107" />
                            <CardStat icone={<FaCheckCircle />} label="Resolvidos" valor={stats.resolvidos} cor="#20c997" />
                            {isAdmin && (
                                <>
                                    <CardStat icone={<FaWrench />} label="Técnicos" valor={stats.tecnicos} cor="#b19cd9" />
                                    <CardStat icone={<FaUsers />} label="Usuários" valor={stats.usuarios} cor="#ff9800" />
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* SEÇÃO DO GRÁFICO */}
                <div className="row justify-content-center mb-5">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="card p-4 glass-card h-100 d-flex flex-column align-items-center text-center">
                            <h5 className="text-white fw-bold mb-4">Distribuição de Chamados</h5>
                            
                            {/* O ResponsiveContainer garante que o gráfico se ajuste ao tamanho da tela */}
                            <div style={{ width: "100%", height: 280 }}>
                                {carregando ? (
                                    <div className="d-flex h-100 justify-content-center align-items-center text-light">Carregando gráfico...</div>
                                ) : (
                                    <ResponsiveContainer>
                                        <PieChart>
                                            <Pie
                                                data={dadosGrafico}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={70} // Cria o buraco no meio (Donut)
                                                outerRadius={100}
                                                paddingAngle={5} // Espaço entre as fatias
                                                dataKey="value"
                                                stroke="none" // Tira a borda padrão
                                            >
                                                {dadosGrafico.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            {/* Tooltip super estilizado para combinar com o tema dark */}
                                            <Tooltip 
                                                contentStyle={{ 
                                                    backgroundColor: 'rgba(8, 5, 28, 0.9)', 
                                                    borderRadius: '8px', 
                                                    border: '1px solid rgba(5, 187, 208, 0.3)',
                                                    color: '#fff'
                                                }}
                                                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                                            />
                                            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ color: "#A09EBD" }}/>
                                        </PieChart>
                                    </ResponsiveContainer>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cards de navegação */}
                <h4 className="titulo-pagina mb-4 d-flex align-items-center gap-2 mt-2">
                    <FaFolderOpen style={{ color: "#ffc107" }} /> Acesso Rápido
                </h4>
                
                <div className="row g-4 justify-content-center">
                    <div className="col-12 col-sm-6 col-lg-3">
                        <Link to="/chamados" className="text-decoration-none">
                            <div className="card h-100 text-center p-4 glass-card">
                                <div style={{ fontSize: "3rem", color: "var(--ciano)" }}><FaTicketAlt /></div>
                                <h5 className="mt-3 fw-bold text-white">Chamados</h5>
                                <p className="text-light opacity-75 mb-0" style={{ fontSize: "0.875rem" }}>
                                    {isAdmin || isTecnico
                                        ? "Gerencie todos os chamados de suporte."
                                        : "Abra e acompanhe seus chamados."}
                                </p>
                            </div>
                        </Link>
                    </div>

                    {isAdmin && (
                        <>
                            <div className="col-12 col-sm-6 col-lg-3">
                                <Link to="/usuarios" className="text-decoration-none">
                                    <div className="card h-100 text-center p-4 glass-card">
                                        <div style={{ fontSize: "3rem", color: "#ff9800" }}><FaUsers /></div>
                                        <h5 className="mt-3 fw-bold text-white">Usuários</h5>
                                        <p className="text-light opacity-75 mb-0" style={{ fontSize: "0.875rem" }}>
                                            Gerencie os usuários do sistema.
                                        </p>
                                    </div>
                                </Link>
                            </div>

                            <div className="col-12 col-sm-6 col-lg-3">
                                <Link to="/tecnicos" className="text-decoration-none">
                                    <div className="card h-100 text-center p-4 glass-card">
                                        <div style={{ fontSize: "3rem", color: "#b19cd9" }}><FaWrench /></div>
                                        <h5 className="mt-3 fw-bold text-white">Técnicos</h5>
                                        <p className="text-light opacity-75 mb-0" style={{ fontSize: "0.875rem" }}>
                                            Cadastre e gerencie técnicos.
                                        </p>
                                    </div>
                                </Link>
                            </div>

                            <div className="col-12 col-sm-6 col-lg-3">
                                <Link to="/categorias" className="text-decoration-none">
                                    <div className="card h-100 text-center p-4 glass-card">
                                        <div style={{ fontSize: "3rem", color: "#20c997" }}><FaTags /></div>
                                        <h5 className="mt-3 fw-bold text-white">Categorias</h5>
                                        <p className="text-light opacity-75 mb-0" style={{ fontSize: "0.875rem" }}>
                                            Organize as categorias.
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Painel;