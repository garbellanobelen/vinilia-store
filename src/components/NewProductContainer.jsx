import { useState } from "react";
import ProductForm from "./ProductForm";

const NewProductContainer = () => {
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (formData) => {
        try {
            setLoading(true);

            console.log("Producto enviado:", formData);

            await new Promise(resolve =>
                setTimeout(resolve, 2000)
            );

            alert("Producto agregado correctamente");

        } catch(error) {
            console.log(error);

            alert("Ha ocurrido un error");

        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="new-product-section">
            <h2>Agregar nuevo vinilo</h2>

            <ProductForm 
                handleFormSubmit={handleFormSubmit}
                loading={loading}

            />

            
        </section>
    );
};

export default NewProductContainer;