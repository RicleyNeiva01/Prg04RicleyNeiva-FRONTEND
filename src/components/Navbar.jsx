import { Link } from "react-router-dom";

function Navbar({ paginaAtual }) {

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

                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">

                            <Link
                                className={paginaAtual === "home"
                                    ? "nav-link active"
                                    : "nav-link"}
                                to="/"
                            >
                                Home
                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link
                                className={paginaAtual === "login"
                                    ? "nav-link active"
                                    : "nav-link"}
                                to="/login"
                            >
                                Login
                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link
                                className={paginaAtual === "painel"
                                    ? "nav-link active"
                                    : "nav-link"}
                                to="/painel"
                            >
                                Painel
                            </Link>

                        </li>

                    </ul>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;