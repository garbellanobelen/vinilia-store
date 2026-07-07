import { useState } from "react";
import { Link } from "react-router-dom";

const AuthForm =({
    title,
    buttonText,
    onSubmit,
    isRegister = false,
    loading = false,
    error = ""
}) =>{
    
    const [nombre, setNombre] = useState("");
    const[email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const[showPassword, setShowPassword] = useState(false);
    const handleSubmit = (e) =>{
        e.preventDefault();

        onSubmit({
            nombre,
            email,
            password
        });
    };

    return(
        <section className="auth-container">
            <div className="auth-card">
                <div className="auth-logo">
                    🎵
                </div>

                <h2>{title}</h2>

                <p className="auth-subtitle">
                    Bienvenido a <span>VINILIA</span>

                </p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {
                        isRegister && (
                            <input 
                                type="text"
                                placeholder="Nombre"
                                value={nombre}
                                onChange={(e)=>setNombre(e.target.value)}
                                required
                            />
                        )
                    }

                    <input 
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                    />

                    <div className="password-container">
                        <input
                            type={
                                showPassword
                                ? "text"
                                : "password"
                            }
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            required
                        />

                        <span className="toggle-password" onClick={()=>setShowPassword(!showPassword)}>
                            {
                                showPassword
                                ? "🙈"
                                : "👁"
                            }

                        </span>

                    </div>

                    {
                        error &&

                        <p className="auth-error">
                            {error}
                        </p>
                    }

                    <button type="submit" disabled={loading}>
                        {
                            loading
                            ? "Procesando..."
                            : buttonText
                        }

                    </button>
                </form>

                {
                    isRegister
                    ?

                    <p>
                        ¿Ya tenés cuenta?
                        <Link to="/login">
                            Iniciar Sesión
                        </Link>
                    </p>

                    :

                    <p>
                        ¿No tenés cuenta?
                        <Link to="/registro">
                        Registrate
                        </Link>
                    </p>
                }

            </div>

        </section>
    );
};

export default AuthForm;