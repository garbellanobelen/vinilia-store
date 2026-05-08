import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartWidget = () => {

    const { totalItems } = useContext(CartContext);

    return (

        <div className="cart-widget">

            🛒

            <span className="cart-count">
                {totalItems}
            </span>

        </div>
    );
};

export default CartWidget;