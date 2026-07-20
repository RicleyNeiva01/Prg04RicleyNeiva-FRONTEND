import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Navbar({ paginaAtual }) {
    const navigate = useNavigate();
    const logado = !!localStorage.getItem("token");
    const { usuario } = useAuth();

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">

                <Link className="navbar-brand fw-bold" to="/">
                    🛠️ DeskFlow
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">

                        <li className="nav-item">
                            <Link
                                className={paginaAtual === "home" ? "nav-link active" : "nav-link"}
                                to="/"
                            >
                                Home
                            </Link>
                        </li>

                        {logado ? (
                            <>
                                <li className="nav-item">
                                    <Link
                                        className={paginaAtual === "painel" ? "nav-link active" : "nav-link"}
                                        to="/painel"
                                    >
                                        Painel
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <span
                                        className="nav-link"
                                        style={{ color: "var(--ciano)", fontWeight: "600" }}
                                    >
                                        👤 {usuario?.nome?.split(" ")[0]}
                                    </span>
                                </li>

                                <li className="nav-item">
                                    <button
                                        className="nav-link btn btn-link"
                                        onClick={handleLogout}
                                        style={{ color: "#ff4d6d", fontWeight: "600" }}
                                    >
                                        Sair
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <Link
                                    className={paginaAtual === "login" ? "nav-link active" : "nav-link"}
                                    to="/login"
                                >
                                    Login
                                </Link>
                            </li>
                        )}

                    </ul>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;