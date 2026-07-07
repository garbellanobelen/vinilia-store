import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (usuario) =>{
            setUser(usuario);
            setLoading(false);
        });

        return() => unsuscribe();
    }, []);

    const logout = async () =>{
        await signOut(auth);
    };

    return(
        <AuthContext.Provider
            value= {{
                user,
                loading,
                logout
            }}
        >
            {children}

        </AuthContext.Provider>
    );
};