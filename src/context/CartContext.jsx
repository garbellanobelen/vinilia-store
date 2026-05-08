import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    // ESTADO DEL CARRITO + LOCALSTORAGE
    const [carrito, setCarrito] = useState(() => {

        const carritoGuardado = localStorage.getItem("carrito");

        return carritoGuardado
            ? JSON.parse(carritoGuardado)
            : [];
    });

    // GUARDAR EN LOCALSTORAGE
    useEffect(() => {

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );

    }, [carrito]);

    // AGREGAR PRODUCTOS
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

    // ELIMINAR PRODUCTO
    const removeFromCart = (id) => {

        const carritoFiltrado = carrito.filter(
            prod => prod.id !== id
        );

        setCarrito(carritoFiltrado);
    };

    // AUMENTAR CANTIDAD
    const incrementarCantidad = (id) => {

        const carritoActualizado = carrito.map(prod =>
            prod.id === id
                ? {
                    ...prod,
                    cantidad: prod.cantidad + 1
                }
                : prod
        );

        setCarrito(carritoActualizado);
    };

    // DISMINUIR CANTIDAD
    const disminuirCantidad = (id) => {

        const carritoActualizado = carrito.map(prod =>
            prod.id === id && prod.cantidad > 1
                ? {
                    ...prod,
                    cantidad: prod.cantidad - 1
                }
                : prod
        );

        setCarrito(carritoActualizado);
    };

    // VACIAR CARRITO
    const clearCart = () => {
        setCarrito([]);
    };

    // TOTAL DEL CARRITO
    const totalCarrito = carrito.reduce(
        (acc, prod) =>
            acc + (prod.precio * prod.cantidad),
        0
    );

     const totalItems = carrito.reduce(
        (acc, prod) => acc + prod.cantidad,
        0
    );

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
                totalItems
            }}
        >

            {children}

        </CartContext.Provider>
    );
};