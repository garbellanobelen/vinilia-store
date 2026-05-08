import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Carrito = () => {

    const {
        carrito,
        removeFromCart,
        incrementarCantidad,
        disminuirCantidad,
        totalCarrito
    } = useContext(CartContext);

    return(

        <section className="carrito-container">

            <h2>Tu Carrito</h2>

            {carrito.length === 0 ? (
                <p>Tu carrito está vacío.</p>
            ) : (

                <>
                    {carrito.map((prod) => (

                        <div className="carrito-card" key={prod.id}>

                            {/* imagen */}
                            <img
                                src={prod.imagen}
                                alt={prod.nombre}
                            />

                            {/* info */}
                            <div className="carrito-info">

                                <h3>{prod.nombre}</h3>

                                <p>${prod.precio}</p>

                                {/* cantidad */}
                                <div className="cantidad-controls">

                                    <button
                                        onClick={() => disminuirCantidad(prod.id)}
                                    >
                                        -
                                    </button>

                                    <span>{prod.cantidad}</span>

                                    <button
                                        onClick={() => incrementarCantidad(prod.id)}
                                    >
                                        +
                                    </button>

                                </div>

                                <p className="subtotal">
                                    Subtotal:
                                    ${prod.precio * prod.cantidad}
                                </p>

                            </div>

                            {/* eliminar */}
                            <button
                                className="btn-eliminar"
                                onClick={() => removeFromCart(prod.id)}
                            >
                                ✖
                            </button>

                        </div>
                    ))}

                    {/* total */}
                    <div className="carrito-total">

                        <h3>
                            Total: ${totalCarrito}
                        </h3>

                    </div>
                </>
            )}

        </section>
    );
};

export default Carrito;