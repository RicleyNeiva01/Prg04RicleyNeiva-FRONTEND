import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './style.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Painel from './pages/Painel'; 
import Usuarios from './pages/Usuarios';
import Categorias from "./pages/Categorias";
import Tecnicos from "./pages/Tecnicos";
import Chamados from "./pages/Chamados";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

               <Route path="/painel" element={<Painel />} />

               <Route path="/usuarios" element={<Usuarios />} />

               <Route path="/categorias" element={<Categorias />} />

               <Route path="/tecnicos" element={<Tecnicos />} />

               <Route path="/chamados" element={<Chamados />} />

            </Routes>

        </BrowserRouter>
    );
}

export default App;
