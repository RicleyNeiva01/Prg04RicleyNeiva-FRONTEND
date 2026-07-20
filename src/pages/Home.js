import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Funcionalidades from '../components/Funcionalidades';
import Servicos from '../components/Servicos';
import { Link } from 'react-router-dom';

function Home() {
    const logado = !!localStorage.getItem("token");

    return (
        <div className="d-flex flex-column min-vh-100 position-relative" style={{ background: "linear-gradient(135deg, #08051C 0%, #15103A 100%)", color: "#F8F9FA", overflowX: "hidden" }}>
            
            {/* INJEÇÃO DE ESTILOS CSS DA HOME */}
            <style>
                {`
                    .hero-title {
                        background: linear-gradient(90deg, #05BBD0, #4E65FF);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        font-weight: 800;
                        font-size: 3rem;
                        letter-spacing: -1px;
                        margin-bottom: 0.5rem;
                    }
                    
                    @media (max-width: 768px) {
                        .hero-title { font-size: 2.2rem; }
                    }

                    .hero-subtitle {
                        color: #A09EBD;
                        font-size: 1.15rem;
                        line-height: 1.6;
                        font-weight: 400;
                    }

                    .btn-neon-primary {
                        background: #05BBD0;
                        color: #1D164D !important;
                        border: none;
                        border-radius: 8px;
                        padding: 12px 30px;
                        box-shadow: 0 4px 15px rgba(5, 187, 208, 0.3);
                        transition: all 0.3s ease;
                        text-decoration: none;
                    }
                    .btn-neon-primary:hover {
                        background: #06d4ec;
                        box-shadow: 0 6px 25px rgba(5, 187, 208, 0.6);
                        transform: translateY(-2px);
                    }

                    .btn-glass-secondary {
                        border: 1px solid rgba(255, 255, 255, 0.15);
                        background: rgba(255, 255, 255, 0.05);
                        color: #E2E2E2 !important;
                        border-radius: 8px;
                        padding: 12px 30px;
                        backdrop-filter: blur(5px);
                        transition: all 0.3s ease;
                        text-decoration: none;
                    }
                    .btn-glass-secondary:hover {
                        background: rgba(255, 255, 255, 0.1);
                        border-color: rgba(255, 255, 255, 0.3);
                        color: #fff !important;
                        transform: translateY(-2px);
                    }

                    /* Efeito de brilho de fundo */
                    .bg-glow {
                        position: absolute;
                        width: 600px;
                        height: 600px;
                        background: radial-gradient(circle, rgba(5,187,208,0.15) 0%, rgba(0,0,0,0) 70%);
                        top: -150px;
                        left: 50%;
                        transform: translateX(-50%);
                        z-index: 0;
                        pointer-events: none;
                    }
                `}
            </style>

            <Navbar paginaAtual="home" />

            {/* Efeito Visual Traseiro */}
            <div className="bg-glow"></div>

            {/* HERO SECTION */}
            <header className="text-center position-relative z-1" style={{ padding: "100px 20px 80px 20px" }}>
                <h1 className="hero-title">
                    DeskFlow IT Support
                </h1>
                <p className="hero-subtitle mt-3 mx-auto" style={{ maxWidth: "650px" }}>
                    Registre, acompanhe e resolva chamados relacionados a computadores,
                    sistemas e redes de forma simples, ágil e visualmente incrível.
                </p>
                
                <div className="mt-5">
                    {logado ? (
                        <Link to="/painel" className="btn-neon-primary fw-bold d-inline-block">
                            ➔ Acessar meu Painel
                        </Link>
                    ) : (
                        <div className="d-flex gap-3 justify-content-center flex-wrap">
                            <Link to="/login" className="btn-neon-primary fw-bold d-inline-block">
                                Entrar na Plataforma
                            </Link>
                            <Link to="/cadastro" className="btn-glass-secondary fw-bold d-inline-block">
                                Criar minha conta
                            </Link>
                        </div>
                    )}
                </div>
            </header>

            {/* CONTEÚDO PRINCIPAL (Features e Serviços) */}
            <main className="container flex-grow-1 pb-5 position-relative z-1">
                <Funcionalidades />
                <Servicos />
            </main>

            <Footer />
        </div>
    );
}

export default Home;