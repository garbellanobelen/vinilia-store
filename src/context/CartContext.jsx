import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {


    const [carrito, setCarrito] = useState(() => {

        const carritoGuardado = localStorage.getItem("carrito");

        return carritoGuardado
            ? JSON.parse(carritoGuardado)
            : [];

    });


    const [descuento, setDescuento] = useState(0);

    const aplicarCupon = (codigo) => {

        switch (codigo.toUpperCase()) {

            case "VINILIA10":
                setDescuento(10);
                return true;

            case "ROCK20":
                setDescuento(20);
                return true;

            case "VINILO30":
                setDescuento(30);
                return true;

            default:
                setDescuento(0);
                return false;
        }

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

            setCarrito(

                carrito.map(prod =>

                    prod.id === producto.id
                        ? {
                            ...prod,
                            cantidad: prod.cantidad + 1
                        }
                        : prod

                )

            );

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

            carrito.filter(

                prod => prod.id !== id

            )

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
        setDescuento(0);

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

    const totalConDescuento =

        totalCarrito -

        (totalCarrito * descuento / 100);

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

                descuento,

                totalConDescuento,

                aplicarCupon

            }}

        >

            {children}

        </CartContext.Provider>

    );

};