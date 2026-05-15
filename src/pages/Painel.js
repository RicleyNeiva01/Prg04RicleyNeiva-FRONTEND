import Navbar from "../components/Navbar";
import Tabela from "../components/Tabela";

function Painel(){
    return (
        <div>
            <Navbar paginaAtual="painel" /> 
            <main className="container mt-5">
                <Tabela />
            </main>
        </div>
    );
}

export default Painel;