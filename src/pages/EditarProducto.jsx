import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    doc,
    getDoc,
    updateDoc
} from "firebase/firestore";

import { db } from "../firebase/config";
import ProductForm from "../components/ProductForm";
import Spinner from "../components/Spinner";

const EditarProducto = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const obtenerProducto = async () => {

            try {

                const productoRef = doc(db, "productos", id);

                const resp = await getDoc(productoRef);

                if (resp.exists()) {

                    setProducto({
                    ...resp.data(),
                    id: resp.id
                });

                }

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

        obtenerProducto();

    }, [id]);

    const editarProducto = async (datos) => {

        try {

            setLoading(true);

            const productoRef = doc(db, "productos", id);

            await updateDoc(productoRef, datos);

            alert("Producto actualizado correctamente");

            navigate("/productosBD");

        } catch (error) {

            console.log(error);

            alert("Ocurrió un error al actualizar el producto.");

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

    return <Spinner texto="Cargando producto..." />;

    }

    if (!producto) {

        return <h2>Producto no encontrado.</h2>;

    }

    return (

        <section className="new-product-section">

            <h2>Editar producto</h2>

            <ProductForm
                handleFormSubmit={editarProducto}
                loading={loading}
                initialValues={producto}
                buttonText="Guardar cambios"
            />

        </section>

    );

};

export default EditarProducto;