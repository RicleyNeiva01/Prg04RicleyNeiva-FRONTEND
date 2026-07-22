import React from 'react';
import { FaBug, FaClock, FaCheckCircle } from 'react-icons/fa';

function Funcionalidades() {
    const itens = [
        {
            icon: <FaBug />,
            titulo: 'Cadastro de problemas',
            texto: 'Usuários registram incidentes de forma simples e rápida, com organização desde o início.'
        },
        {
            icon: <FaClock />,
            titulo: 'Acompanhamento',
            texto: 'O usuário acompanha o status do chamado em tempo real e acompanha a evolução.'
        },
        {
            icon: <FaCheckCircle />,
            titulo: 'Resolução',
            texto: 'Técnicos registram soluções aplicadas e fecham o ciclo com mais clareza.'
        }
    ];

    return (
        <section className="mb-5">
            <h2 className="text-center mb-4 section-title">Funcionalidades</h2>
            <div className="row g-4">
                {itens.map((item, index) => (
                    <div className="col-md-4" key={index}>
                        <div className="premium-card h-100 text-center">
                            <div className="feature-icon">{item.icon}</div>
                            <h5 className="mb-3" style={{ color: '#fff' }}>{item.titulo}</h5>
                            <p className="section-text mb-0">{item.texto}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Funcionalidades;