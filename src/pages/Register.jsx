import { useState } from "react";
import AuthForm from "../components/AuthForm";

import { auth } from "../firebase/config";

import {
    createUserWithEmailAndPassword
} from "firebase/auth";

import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async ({ email, password }) => {

        try {

            setLoading(true);

            setError("");

            await createUserWithEmailAndPassword(

                auth,

                email,

                password

            );

            alert("Cuenta creada correctamente");

            navigate("/login");

        }

        catch (error) {

            console.log(error);

            setError("No se pudo crear la cuenta.");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <AuthForm

            title="Crear cuenta"

            buttonText="Registrarme"

            onSubmit={handleRegister}

            isRegister={true}

            loading={loading}

            error={error}

        />

    );

};

export default Register;