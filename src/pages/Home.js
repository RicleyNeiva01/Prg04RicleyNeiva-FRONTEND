import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Funcionalidades from '../components/Funcionalidades';
import Servicos from '../components/Servicos';
import Footer from '../components/Footer';
import Menu from '../components/Menu'; 
import { Link } from 'react-router-dom';

function Home() {

    return (
        <div>

            <Navbar paginaAtual= "home"/>
            <Header />

            <main className="container">

                <section className="text-center mb-5">
                    <h2>Acesso a pagina de login</h2>
                    <Link to="/login" className="btn btn-custom">
                        Login
                    </Link>
                </section>

                <section className="text-center mb-5">
                    <h2>Sobre o DeskFlow (Suporte de TI)</h2>

                    <p>
                        O DeskFlow é um sistema de suporte técnico que permite aos usuários registrar
                        problemas relacionados a hardware, software e redes.
                    </p>
                </section>

                <Link to="/usuarios">
    Usuários
</Link>

                <Funcionalidades />

                <Servicos />

                <Menu />

            </main>

            <Footer />

        </div>
    );
}

export default Home;