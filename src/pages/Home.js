import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Funcionalidades from '../components/Funcionalidades';
import Servicos from '../components/Servicos';
import { Link } from 'react-router-dom';
import { FaBolt, FaShieldAlt, FaChartLine, FaArrowRight } from 'react-icons/fa';

function Home() {
    const logado = !!localStorage.getItem("token");

    const destaques = [
        {
            icon: <FaBolt />,
            titulo: 'Resposta rápida',
            texto: 'Fluxo ágil para abrir, acompanhar e resolver problemas sem perder tempo.'
        },
        {
            icon: <FaShieldAlt />,
            titulo: 'Segurança e controle',
            texto: 'Cada chamado e operação ficam organizados com uma visão clara para a equipe.'
        },
        {
            icon: <FaChartLine />,
            titulo: 'Visão estratégica',
            texto: 'Monitore produtividade, prioridades e andamento com muito mais clareza.'
        }
    ];

    return (
        <div className="d-flex flex-column min-vh-100 position-relative" style={{ background: "linear-gradient(135deg, #08051C 0%, #15103A 100%)", color: "#F8F9FA", overflowX: "hidden" }}>

            <style>
                {`
                    .hero-title {
                        background: linear-gradient(90deg, #05BBD0, #4E65FF);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        font-weight: 800;
                        font-size: 3.5rem;
                        letter-spacing: -1px;
                        line-height: 1.1;
                        margin-bottom: 1rem;
                    }

                    .hero-subtitle {
                        color: #A09EBD;
                        font-size: 1.15rem;
                        line-height: 1.6;
                        font-weight: 400;
                    }

                    .btn-neon-primary {
                        background: linear-gradient(135deg, #05BBD0, #4E65FF);
                        color: #fff !important;
                        border: none;
                        border-radius: 999px;
                        padding: 12px 28px;
                        box-shadow: 0 8px 24px rgba(5, 187, 208, 0.35);
                        transition: all 0.3s ease;
                        text-decoration: none;
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                    }
                    .btn-neon-primary:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 12px 32px rgba(5, 187, 208, 0.5);
                    }

                    .btn-glass-secondary {
                        border: 1px solid rgba(255, 255, 255, 0.15);
                        background: rgba(255, 255, 255, 0.05);
                        color: #E2E2E2 !important;
                        border-radius: 999px;
                        padding: 12px 28px;
                        backdrop-filter: blur(8px);
                        transition: all 0.3s ease;
                        text-decoration: none;
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                    }
                    .btn-glass-secondary:hover {
                        background: rgba(255, 255, 255, 0.12);
                        border-color: rgba(255, 255, 255, 0.3);
                        color: #fff !important;
                        transform: translateY(-2px);
                    }

                    .bg-glow {
                        position: absolute;
                        width: 700px;
                        height: 700px;
                        background: radial-gradient(circle, rgba(5,187,208,0.16) 0%, rgba(0,0,0,0) 62%);
                        top: -120px;
                        right: -200px;
                        z-index: 0;
                        pointer-events: none;
                    }

                    @keyframes float {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-16px); }
                        100% { transform: translateY(0px); }
                    }

                    .floating-img {
                        animation: float 6s ease-in-out infinite;
                        max-width: 100%;
                        height: auto;
                        filter: drop-shadow(0 20px 35px rgba(0,0,0,0.45));
                    }

                    .hero-panel {
                        background: rgba(255,255,255,0.06);
                        border: 1px solid rgba(255,255,255,0.12);
                        backdrop-filter: blur(14px);
                        border-radius: 24px;
                        padding: 24px;
                        box-shadow: 0 15px 35px rgba(0,0,0,0.25);
                    }

                    .metric-pill {
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                        padding: 8px 12px;
                        border-radius: 999px;
                        background: rgba(5,187,208,0.14);
                        color: #7ce7ff;
                        font-weight: 600;
                        font-size: 0.9rem;
                    }

                    .premium-card {
                        background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
                        border: 1px solid rgba(255,255,255,0.11);
                        border-radius: 18px;
                        padding: 24px;
                        transition: transform 0.25s ease, border-color 0.25s ease;
                    }

                    .premium-card:hover {
                        transform: translateY(-4px);
                        border-color: rgba(5,187,208,0.5);
                    }

                    .feature-icon {
                        width: 48px;
                        height: 48px;
                        border-radius: 14px;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        background: linear-gradient(135deg, #05BBD0, #4E65FF);
                        color: white;
                        font-size: 1.2rem;
                        margin-bottom: 12px;
                    }

                    .section-title {
                        color: #ffffff;
                        font-weight: 700;
                        font-size: 1.7rem;
                        margin-bottom: 12px;
                    }

                    .section-text {
                        color: #A09EBD;
                        font-size: 1rem;
                        line-height: 1.7;
                    }

                    @media (max-width: 992px) {
                        .hero-title { font-size: 2.5rem; text-align: center; }
                        .hero-text-container { text-align: center !important; }
                        .hero-buttons { justify-content: center !important; }
                    }
                `}
            </style>

            <Navbar paginaAtual="home" />
            <div className="bg-glow"></div>

            <header className="position-relative z-1 d-flex align-items-center" style={{ minHeight: "85vh", paddingTop: "80px" }}>
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6 hero-text-container text-start mb-4 mb-lg-0">
                            <div className="d-flex flex-wrap gap-2 mb-3">
                                <span className="metric-pill">⚡ Gestão inteligente</span>
                                <span className="metric-pill">🛠️ Suporte mais ágil</span>
                            </div>
                            <h1 className="hero-title">
                                Inteligência e agilidade para o seu Suporte de TI.
                            </h1>
                            <p className="hero-subtitle mt-3 mb-4" style={{ maxWidth: "640px" }}>
                                O DeskFlow transforma a rotina de suporte com organização visual, fluxo ágil e controle total dos chamados. Tudo em um ambiente moderno e profissional.
                            </p>

                            <div className="d-flex gap-3 hero-buttons flex-wrap mb-4">
                                {logado ? (
                                    <Link to="/painel" className="btn-neon-primary fw-bold">
                                        Acessar meu Painel <FaArrowRight />
                                    </Link>
                                ) : (
                                    <>
                                        <Link to="/login" className="btn-neon-primary fw-bold">
                                            Entrar na Plataforma <FaArrowRight />
                                        </Link>
                                        <Link to="/cadastro" className="btn-glass-secondary fw-bold">
                                            Criar minha conta
                                        </Link>
                                    </>
                                )}
                            </div>

                            <div className="hero-panel">
                                <p className="mb-2 fw-semibold" style={{ color: '#7ce7ff' }}>Por que equipes escolhem o DeskFlow?</p>
                                <div className="d-flex flex-wrap gap-2">
                                    <span className="metric-pill">📊 Painel claro</span>
                                    <span className="metric-pill">🔄 Processos fluidos</span>
                                    <span className="metric-pill">✨ Experiência premium</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 d-none d-md-block text-center z-2">
                            <img
                                src={`${process.env.PUBLIC_URL}/suporteHome.jpg`}
                                alt="Imagem de Suporte Técnico"
                                className="floating-img"
                                style={{ maxHeight: "500px", objectFit: "contain" }}
                            />
                        </div>
                    </div>
                </div>
            </header>

            <main className="container flex-grow-1 pb-5 position-relative z-1" style={{ marginTop: "-20px" }}>
                <section className="row g-4 mb-5">
                    {destaques.map((item, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="premium-card h-100">
                                <div className="feature-icon">{item.icon}</div>
                                <h4 className="section-title" style={{ fontSize: '1.2rem' }}>{item.titulo}</h4>
                                <p className="section-text mb-0">{item.texto}</p>
                            </div>
                        </div>
                    ))}
                </section>

                <Funcionalidades />
                <Servicos />
            </main>

            <Footer />
        </div>
    );
}

export default Home;