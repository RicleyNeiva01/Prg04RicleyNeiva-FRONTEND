import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";

function Login() {
    return (
        /* Usamos login-bg ajustado para alinhar em coluna e min-vh-100 pro footer ficar no pé */
        <div className="login-bg min-vh-100">
            <Navbar paginaAtual="login" />
            
            {/* O main empurra o form para o centro da tela disponível usando Flexbox */}
            <main className="container flex-grow-1 d-flex align-items-center justify-content-center py-5">
                <LoginForm />
            </main>
            
            <Footer />
        </div>
    );
}

export default Login;