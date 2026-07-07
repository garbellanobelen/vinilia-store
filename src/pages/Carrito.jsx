import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const Carrito = () => {

    const {
        carrito,
        removeFromCart,
        incrementarCantidad,
        disminuirCantidad,
        clearCart,
        totalCarrito,
        totalConDescuento,
        descuento,
        aplicarCupon
    } = useContext(CartContext);

    const [codigo, setCodigo] = useState("");

    const manejarCupon = () => {

        const valido = aplicarCupon(codigo);

        if (valido) {

            alert("Cupón aplicado correctamente.");

        } else {

            alert("El cupón ingresado no es válido.");

        }

    };

    return (

        <section className="carrito-container">

            <h2>Tu Carrito</h2>

            {carrito.length === 0 ? (

                <p>Tu carrito está vacío.</p>

            ) : (

                <>

                    {carrito.map((prod) => (

                        <div
                            className="carrito-card"
                            key={prod.id}
                        >

                            <img
                                src={prod.imagen}
                                alt={prod.nombre}
                            />

                            <div className="carrito-info">

                                <h3>{prod.nombre}</h3>

                                <p>${prod.precio}</p>

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
                                    Subtotal: $
                                    {prod.precio * prod.cantidad}
                                </p>

                            </div>

                            <button
                                className="btn-eliminar"
                                onClick={() => removeFromCart(prod.id)}
                            >
                                ✖
                            </button>

                        </div>

                    ))}

                    <div className="cupon-container">

                        <h3>Cupón de descuento</h3>

                        <input
                            type="text"
                            placeholder="Ej: VINILIA10"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                        />

                        <button
                            className="btn-cupon"
                            onClick={manejarCupon}
                        >
                            Aplicar cupón
                        </button>

                    </div>

                    <div className="carrito-total">

                        <p>
                            <strong>Subtotal:</strong> $
                            {totalCarrito}
                        </p>

                        <p>
                            <strong>Descuento:</strong> {descuento}%
                        </p>

                        <h3>
                            Total Final: $
                            {totalConDescuento}
                        </h3>

                        <button
                            className="btn-vaciar"
                            onClick={clearCart}
                        >
                            Vaciar carrito
                        </button>

                    </div>

                </>

            )}

        </section>

    );

};

export default Carrito;