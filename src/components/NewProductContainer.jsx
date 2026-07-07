import { useState } from "react";
import ProductForm from "./ProductForm";
import Alert from "./Alert";

import {
    addDoc,
    collection
} from "firebase/firestore";

import { db } from "../firebase/config";

const NewProductContainer = () => {

    const [loading, setLoading] = useState(false);

    const [mensaje, setMensaje] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState("success");

    const [resetForm, setResetForm] = useState(false);

    const handleFormSubmit = async (formData) => {

        try {

            setLoading(true);

            await addDoc(
                collection(db, "productos"),
                formData
            );

            setTipoMensaje("success");
            setMensaje("✅ Producto agregado correctamente.");

            setResetForm(true);

        } catch (error) {

            console.log(error);

            setTipoMensaje("error");
            setMensaje("❌ Ocurrió un error al agregar el producto.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <section className="new-product-section">

            <h2>Agregar nuevo vinilo</h2>

            <Alert
                tipo={tipoMensaje}
                mensaje={mensaje}
            />

            <ProductForm
                handleFormSubmit={handleFormSubmit}
                loading={loading}
                resetForm={resetForm}
                onResetComplete={() => setResetForm(false)}
            />

        </section>

    );

};

export default NewProductContainer;