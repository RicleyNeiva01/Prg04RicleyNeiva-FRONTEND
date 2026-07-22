import React from 'react';
import { FaDesktop, FaNetworkWired, FaLaptopCode, FaLock, FaMemory, FaCog } from 'react-icons/fa';

function Servicos() {
    const itens = [
        {
            icon: <FaDesktop />,
            titulo: 'Manutenção de computadores',
            texto: 'Reparação e manutenção preventiva para manter os equipamentos estáveis e seguros.'
        },
        {
            icon: <FaNetworkWired />,
            titulo: 'Problemas de rede',
            texto: 'Suporte completo para conectividade, falhas e performance da infraestrutura.'
        },
        {
            icon: <FaLaptopCode />,
            titulo: 'Suporte a software',
            texto: 'Assistência com sistemas, aplicações e ambientes operacionais diversos.'
        },
        {
            icon: <FaLock />,
            titulo: 'Problemas de login',
            texto: 'Recuperação de acessos, senhas e autenticação com mais eficiência.'
        },
        {
            icon: <FaMemory />,
            titulo: 'Suporte a hardware',
            texto: 'Diagnóstico e reparo de componentes físicos com atenção especializada.'
        },
        {
            icon: <FaCog />,
            titulo: 'Configuração de sistema',
            texto: 'Setup e otimização de ambientes para produtividade e organização.'
        }
    ];

    return (
        <section className="mb-5">
            <h2 className="text-center mb-4 section-title">Serviços Disponíveis</h2>
            <div className="row g-4">
                {itens.map((item, index) => (
                    <div className="col-lg-4 col-md-6" key={index}>
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

export default Servicos;