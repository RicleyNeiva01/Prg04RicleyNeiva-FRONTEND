import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './style.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Painel from './pages/Painel'; 
import Usuarios from './pages/Usuarios';

function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

               <Route path="/painel" element={<Painel />} />

               <Route path="/usuarios" element={<Usuarios />} />

            </Routes>

        </BrowserRouter>
    );
}

export default App;
