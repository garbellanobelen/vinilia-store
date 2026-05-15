import { Link } from "react-router-dom";
import { useState } from "react";
import CartWidget from "./CartWidget";

const NavBar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    return(

        <nav className="navbar">

            {/* LOGO */}
            <h2 className="logo">VINILIA</h2>

            {/* HAMBURGUESA */}
            <div
                className="hamburguesa"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? "✖" : "☰"}
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

                <CartWidget />

                <Link 
                to="/nuevo-producto"
                onClick={() => setMenuOpen(false)}>
                    Nuevo Producto
                </Link>

            </div>

        </nav>
    );
};

export default NavBar;