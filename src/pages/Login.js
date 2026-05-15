import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";

function Login() {
    return (
        <div>
            <Navbar paginaAtual="login" />
            <header className="text-center">
                <h2>Página de login</h2>
            </header>
            <main className="container">
                <LoginForm />
            </main>
            <Footer />
        </div>
    );
}

export default Login;