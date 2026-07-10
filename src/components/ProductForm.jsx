import { useEffect, useState } from "react";

const ProductForm = ({
    handleFormSubmit,
    loading,
    initialValues,
    buttonText = "Agregar producto",
    resetForm = false,
    onResetComplete = () => {}
}) => {

    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [imagen, setImagen] = useState("");
    const [categoria, setCategoria] = useState("");
    const [stock, setStock] = useState("");

    useEffect(() => {

    if (initialValues) {

        setNombre(initialValues.nombre || "");
        setPrecio(initialValues.precio || "");
        setImagen(initialValues.imagen || "");
        setCategoria(initialValues.categoria || "");
        setStock(initialValues.stock || "");

    }

}, [initialValues]);

    useEffect(() => {

    if (resetForm) {

        setNombre("");
        setPrecio("");
        setImagen("");
        setCategoria("");
        setStock("");

        onResetComplete?.();

    }

}, [resetForm]);
    const onSubmit = (e) => {

        e.preventDefault();

        if (!nombre.trim()) {
            alert("El nombre es obligatorio.");
            return;
        }

        if (Number(precio) <= 0) {
            alert("El precio debe ser mayor a 0.");
            return;
        }

        if (Number(stock) < 0) {
            alert("El stock no puede ser negativo.");
            return;
        }

        handleFormSubmit({

            nombre,

            precio: Number(precio),

            imagen,

            categoria,

            stock: Number(stock)

        });

    };

    return (

        <form
            className="product-form"
            onSubmit={onSubmit}
        >

            <input
                type="text"
                placeholder="Nombre del vinilo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
            />

            <input
                type="number"
                placeholder="Precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
            />

            <input
                type="text"
                placeholder="URL de la imagen"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
                required
            />

            <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
            >
                <option value="">Seleccionar categoría</option>
                <option value="Rock">Rock</option>
                <option value="Pop">Pop</option>
                <option value="Jazz">Jazz</option>
                <option value="Soul">Soul</option>
                <option value="Hip-Hop">Hip-Hop</option>
                <option value="Electrónica">Electrónica</option>
                <option value="Clásica">Clásica</option>
                <option value="Otros">Otros</option>
            </select>

            <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                min="0"
                required
            />

            <button
                type="submit"
                disabled={loading}
            >
                {loading
                    ? "Guardando..."
                    : buttonText}
            </button>

        </form>

    );

};

export default ProductForm;