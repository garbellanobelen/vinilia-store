import { useContext, useEffect, useState } from "react";
import {
    useParams,
    useNavigate
} from "react-router-dom";

import { CartContext } from "../context/CartContext";

import {
    doc,
    getDoc
} from "firebase/firestore";

import { db } from "../firebase/config";

import Spinner from "../components/Spinner";

const ProductoDetalle = () => {

    const { addToCart } = useContext(CartContext);

    const { id } = useParams();

    const navigate = useNavigate();

    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const obtenerProducto = async () => {

            try {

                const productoRef = doc(db, "productos", id);

                const resp = await getDoc(productoRef);

                if (resp.exists()) {

                    setProducto({
                        id: resp.id,
                        ...resp.data()
                    });

                } else {

                    setError("Producto no encontrado.");

                }

            } catch (err) {

                console.log(err);

                setError("Ocurrió un error al cargar el producto.");

            } finally {

                setLoading(false);

            }

        };

        obtenerProducto();

    }, [id]);

    if (loading) {

        return <Spinner texto="Cargando producto..." />;

    }

    if (error) {

        return <h2>{error}</h2>;

    }

    return (

        <>

            <button
                className="btn-volver"
                onClick={() => navigate(-1)}
            >
                ← Volver
            </button>

            <section className="detalle-container">

                <div className="detalle-img">

                    <img
                        src={producto.imagen}
                        alt={producto.nombre}
                    />

                </div>

                <div className="detalle-info">

                    <h2>{producto.nombre}</h2>

                    <p className="detalle-precio">

                        ${producto.precio}

                    </p>

                    <p>

                        <strong>Categoría:</strong> {producto.categoria}

                    </p>

                    <p>

                        <strong>Stock:</strong> {producto.stock}

                    </p>

                    <p className="detalle-desc">

                        Edición especial en vinilo de colección con sonido remasterizado.

                    </p>

                    <button
                        onClick={() => addToCart(producto)}
                    >
                        Agregar al carrito
                    </button>

                </div>

            </section>

        </>

    );

};

export default ProductoDetalle;