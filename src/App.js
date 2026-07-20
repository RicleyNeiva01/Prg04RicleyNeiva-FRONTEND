import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './style.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Painel from './pages/Painel';
import Usuarios from './pages/Usuarios';
import Categorias from "./pages/Categorias";
import Tecnicos from "./pages/Tecnicos";
import Chamados from "./pages/Chamados";
import Cadastro from "./pages/Cadastro";
import useAuth from './hooks/useAuth';

// Bloqueia quem não tem token
function RotaProtegida({ children }) {
    const token = localStorage.getItem("token");
    if (!token) return <Navigate to="/login" replace />;
    return children;
}

// Bloqueia quem não tem o perfil certo
function RotaAdmin({ children }) {
    const token = localStorage.getItem("token");
    const { isAdmin } = useAuth();

    if (!token) return <Navigate to="/login" replace />;
    if (!isAdmin) return <Navigate to="/painel" replace />;

    return children;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Rotas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />

                {/* Rotas protegidas — qualquer usuário logado */}
                <Route path="/painel" element={<RotaProtegida><Painel /></RotaProtegida>} />
                <Route path="/chamados" element={<RotaProtegida><Chamados /></RotaProtegida>} />

                {/* Rotas só para ADMIN */}
                <Route path="/usuarios" element={<RotaAdmin><Usuarios /></RotaAdmin>} />
                <Route path="/tecnicos" element={<RotaAdmin><Tecnicos /></RotaAdmin>} />
                <Route path="/categorias" element={<RotaAdmin><Categorias /></RotaAdmin>} />

                {/* Qualquer rota inexistente vai pra home */}
                <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;