import {useState} from "react";

const ProductForm =({
    handleFormSubmit,
    loading
}) => {

    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [imagen, setImagen] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        const nuevoProducto ={
            nombre,
            precio,
            imagen
        };

        handleFormSubmit(nuevoProducto);

        setNombre("");
        setPrecio("");
        setImagen("");
    };

    return(
        <form className="product-form" onSubmit={onSubmit}>
            
            <input type="text" placeholder="Nombre del vinilo" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            <input type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
            <input type="text" placeholder="URL de la imagen" value={imagen} onChange={(e) => setImagen(e.target.value)} required />

            <button type="submit" disabled={loading}>
                {
                    loading
                    ? "Subiendo producto..."
                    : "Agregar producto"
                }

            </button>

        </form>
    );
};

export default ProductForm;