import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const ProductoDetalle = () => {

    const { addToCart } = useContext(CartContext);

    const { id } = useParams();

    const [producto, setProducto] = useState(null);

    useEffect(() => {
        fetch("/data/productos.json")
            .then(res => res.json())
            .then(data => {

                const productoEncontrado = data.find(
                    prod => prod.id === Number(id)
                );

                setProducto(productoEncontrado);
            });

    }, [id]);

    if (!producto) {
        return <h2>Cargando producto...</h2>;
    }

    return(

        <section className="detalle-container">

            <div className="detalle-img">
                <img src={producto.imagen} alt={producto.nombre} />
            </div>

            <div className="detalle-info">

                <h2>{producto.nombre}</h2>

                <p className="detalle-precio">
                    ${producto.precio}
                </p>

                <p className="detalle-desc">
                    Edición especial en vinilo de colección con sonido remasterizado.
                </p>

                <button onClick={()=> addToCart(producto)}>
                    Agregar al carrito
                </button>

            </div>

        </section>
    );
};

export default ProductoDetalle;