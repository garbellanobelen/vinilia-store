import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {


    const [carrito, setCarrito] = useState(() => {

        const carritoGuardado = localStorage.getItem("carrito");

        return carritoGuardado
            ? JSON.parse(carritoGuardado)
            : [];

    });

    const [cupon, setCupon] = useState("");

    const descuentos = {

        VINILIA10: 0.10,
        VINILIA20: 0.20,
        VINILIA30: 0.30

    };

    useEffect(() => {

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );

    }, [carrito]);

    const addToCart = (producto) => {

        const existe = carrito.find(
            prod => prod.id === producto.id
        );

        if (existe) {

            const carritoActualizado = carrito.map(prod =>
                prod.id === producto.id
                    ? {
                        ...prod,
                        cantidad: prod.cantidad + 1
                    }
                    : prod
            );

            setCarrito(carritoActualizado);

        } else {

            setCarrito([
                ...carrito,
                {
                    ...producto,
                    cantidad: 1
                }
            ]);

        }

    };


    const removeFromCart = (id) => {

        setCarrito(
            carrito.filter(prod => prod.id !== id)
        );

    };


    const incrementarCantidad = (id) => {

        setCarrito(

            carrito.map(prod =>

                prod.id === id

                    ? {
                        ...prod,
                        cantidad: prod.cantidad + 1
                    }

                    : prod

            )

        );

    };

    const disminuirCantidad = (id) => {

        setCarrito(

            carrito.map(prod =>

                prod.id === id && prod.cantidad > 1

                    ? {
                        ...prod,
                        cantidad: prod.cantidad - 1
                    }

                    : prod

            )

        );

    };


    const clearCart = () => {

        setCarrito([]);

        setCupon("");

    };


    const totalCarrito = carrito.reduce(

        (acc, prod) =>

            acc + (prod.precio * prod.cantidad),

        0

    );

    const totalItems = carrito.reduce(

        (acc, prod) =>

            acc + prod.cantidad,

        0

    );

    const porcentajeDescuento = descuentos[cupon] || 0;

    const montoDescuento = totalCarrito * porcentajeDescuento;

    const totalConDescuento = totalCarrito - montoDescuento;


    return (

        <CartContext.Provider

            value={{

                carrito,

                addToCart,

                removeFromCart,

                incrementarCantidad,

                disminuirCantidad,

                clearCart,

                totalCarrito,

                totalItems,

                cupon,

                setCupon,

                montoDescuento,

                totalConDescuento

            }}

        >

            {children}

        </CartContext.Provider>

    );

};