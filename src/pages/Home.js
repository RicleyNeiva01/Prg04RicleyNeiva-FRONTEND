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
                        font-size: 3.5rem;
                        letter-spacing: -1px;
                        line-height: 1.1;
                        margin-bottom: 1rem;
                    }
                    
                    @media (max-width: 992px) {
                        .hero-title { font-size: 2.5rem; text-align: center; }
                        .hero-text-container { text-align: center !important; }
                        .hero-buttons { justify-content: center !important; }
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
                        width: 700px;
                        height: 700px;
                        background: radial-gradient(circle, rgba(5,187,208,0.12) 0%, rgba(0,0,0,0) 60%);
                        top: -100px;
                        right: -200px;
                        z-index: 0;
                        pointer-events: none;
                    }

                    /* Animação da imagem flutuando */
                    @keyframes float {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-20px); }
                        100% { transform: translateY(0px); }
                    }
                    .floating-img {
                        animation: float 6s ease-in-out infinite;
                        max-width: 100%;
                        height: auto;
                        filter: drop-shadow(0 20px 30px rgba(0,0,0,0.5));
                    }
                `}
            </style>

            <Navbar paginaAtual="home" />

            {/* Efeito Visual Traseiro */}
            <div className="bg-glow"></div>

            {/* HERO SECTION */}
            <header className="position-relative z-1 d-flex align-items-center" style={{ minHeight: "80vh", paddingTop: "80px" }}>
                <div className="container">
                    <div className="row align-items-center">

                        {/* Coluna da Esquerda (Textos) */}
                        <div className="col-lg-6 hero-text-container text-start mb-5 mb-lg-0">
                            <h1 className="hero-title">
                                Inteligência e agilidade para o seu Suporte de TI.
                            </h1>
                            <p className="hero-subtitle mt-3 mb-5" style={{ maxWidth: "600px" }}>
                                O **DeskFlow** transforma a maneira como sua empresa resolve problemas de tecnologia.
                                Registre, acompanhe e atribua chamados de forma simples e visualmente incrível.
                            </p>

                            <div className="d-flex gap-3 hero-buttons flex-wrap">
                                {logado ? (
                                    <Link to="/painel" className="btn-neon-primary fw-bold">
                                        ➔ Acessar meu Painel
                                    </Link>
                                ) : (
                                    <>
                                        <Link to="/login" className="btn-neon-primary fw-bold">
                                            Entrar na Plataforma
                                        </Link>
                                        <Link to="/cadastro" className="btn-glass-secondary fw-bold">
                                            Criar minha conta
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Coluna da Direita (Imagem) */}
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

            {/* CONTEÚDO PRINCIPAL (Features e Serviços) */}
            <main className="container flex-grow-1 pb-5 position-relative z-1" style={{ marginTop: "-30px" }}>
                <Funcionalidades />
                <Servicos />
            </main>

            <Footer />
        </div>
    );
}

export default Home;