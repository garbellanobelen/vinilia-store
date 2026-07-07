import { useState } from "react";
import AuthForm from "../components/AuthForm";

import { auth } from "../firebase/config";

import {
    signInWithEmailAndPassword
} from "firebase/auth";

import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async ({ email, password }) => {

        try {

            setLoading(true);
            setError("");

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            navigate("/");

        }

        catch {

            setError("Correo o contraseña incorrectos.");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <AuthForm

            title="Iniciar sesión"

            buttonText="Ingresar"

            onSubmit={handleLogin}

            loading={loading}

            error={error}

        />

    );

};

export default Login;