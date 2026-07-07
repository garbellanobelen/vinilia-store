import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import CartWidget from "./CartWidget";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const { user, logout } = useContext(AuthContext);

    return (

        <nav className="navbar">

            {/* LOGO */}
            <h2 className="logo">VINILIA</h2>

            {/* RIGHT SIDE */}
            <div className="navbar-right">

                <CartWidget />

                <div
                    className="hamburguesa"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? "✖" : "☰"}
                </div>

            </div>

            {/* LINKS */}
            <div className={`nav-links ${menuOpen ? "active" : ""}`}>

                <Link
                    to="/"
                    onClick={() => setMenuOpen(false)}
                >
                    Inicio
                </Link>

                <Link
                    to="/productos"
                    onClick={() => setMenuOpen(false)}
                >
                    Productos
                </Link>

                <Link
                    to="/carrito"
                    onClick={() => setMenuOpen(false)}
                >
                    Carrito
                </Link>

                {user && (
                    <>
                        <Link
                            to="/productosBD"
                            onClick={() => setMenuOpen(false)}
                        >
                            Productos BD
                        </Link>

                        <Link
                            to="/nuevo-producto"
                            onClick={() => setMenuOpen(false)}
                        >
                            Nuevo Producto
                        </Link>

                        <span className="usuario">
                            Hola, {user.email}
                        </span>

                        <button
                            className="btn-logout"
                            onClick={async () => {
                                await logout();
                                setMenuOpen(false);
                            }}
                        >
                            Cerrar sesión
                        </button>
                    </>
                )}

                {!user && (
                    <>
                        <Link
                            to="/login"
                            onClick={() => setMenuOpen(false)}
                        >
                            Iniciar sesión
                        </Link>

                        <Link
                            to="/registro"
                            onClick={() => setMenuOpen(false)}
                        >
                            Registrarse
                        </Link>
                    </>
                )}

            </div>

        </nav>

    );
};

export default NavBar;