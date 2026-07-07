import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const NuevoProducto = () => {
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [imagen, setImagen] = useState("");
    const [description, setDesription] = useState("");
    const [categoria, setCategoria] = useState("");

    const[loading, setLoading] =useState(false);

    const [mensaje, setMensaje] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if(
            nombre.trim() === "" ||
            precio <= 0 ||
            imagen.trim() === ""
        ) {
            setMensaje("Complete todos los campos obligatorios.");

            return;
        }

        try {
            setLoading(true);

            await addDoc(
                collection(db, "productos"),
                {
                    nombre,
                    precio: Number(precio),
                    imagen,
                    descripcion,
                    categoria
                }
            );

            setMensaje("Producto agregado correctamente.");

            setNombre("");
            setPrecio("");
            setImagen("");
            setDescripcion("");
            setCategoria("");

        } catch(error) {
            setMensaje("Ocurrió un error.");
            console.log(error);

        } finally {
            setLoading(false);
        }
    };

    return(
        <section className="nuevo-producto-container">
            <h2>Nuevo Producto</h2>

            <form className="nuevo-producto-form" onSubmit={handleSubmit}>

                <input 
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e)=>setNombre(e.target.value)}
                />

                <input 
                    type="number"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e)=>setPrecio(e.target.value)}
                />

                <input 
                    type="text"
                    placeholder="URL de la imagen"
                    value={imagen}
                    onChange={(e)=>setImagen(e.target.value)}
                />

                <textarea 
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e)=>setDescripcion(e.target.value)}
                />

                <input 
                    type="text"
                    placeholder="Categoría"
                    value={categoria}
                    onChange={(e)=>setCategoria(e.target.value)}
                />

                <button disabled={loading}>
                    {
                        loading
                        ? "Guardando..."
                        : "Agregar Producto"
                    }

                </button>


            </form>

            {
                mensaje &&
                <p className="mensaje">
                    {mensaje}

                </p>
            }

        </section>
    );
};

export default NuevoProducto;