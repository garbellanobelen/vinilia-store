import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Carrito = () => {

    const {

        carrito,
        removeFromCart,
        incrementarCantidad,
        disminuirCantidad,
        clearCart,

        totalCarrito,

        cupon,
        setCupon,
        montoDescuento,
        totalConDescuento

    } = useContext(CartContext);

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
                                        −
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

                            <button
                                className="btn-eliminar"
                                onClick={() => removeFromCart(prod.id)}
                            >
                                ✖
                            </button>

                        </div>

                    ))}

                    {/* CUPONES */}

                    <div className="cupon-container">

                        <h3>🎟 Cupón de descuento</h3>

                        <select
                            value={cupon}
                            onChange={(e) => setCupon(e.target.value)}
                        >

                            <option value="">
                                Seleccionar cupón
                            </option>

                            <option value="VINILIA10">
                                VINILIA10 - 10%
                            </option>

                            <option value="VINILIA20">
                                VINILIA20 - 20%
                            </option>

                            <option value="VINILIA30">
                                VINILIA30 - 30%
                            </option>

                        </select>

                    </div>

                    {/* TOTAL */}

                    <div className="carrito-total">

                        <p>

                            <strong>Subtotal:</strong>

                            ${totalCarrito.toFixed(2)}

                        </p>

                        <p>

                            <strong>Descuento:</strong>

                            -${montoDescuento.toFixed(2)}

                        </p>

                        <h3>

                            Total:

                            ${totalConDescuento.toFixed(2)}

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