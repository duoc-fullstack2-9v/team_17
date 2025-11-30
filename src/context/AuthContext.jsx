import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, googleProvider } from '../firebase/config';
import {
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';

import * as usuarioService from '../services/UsuarioService.jsx';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider');
    return context;
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const signup = async (email, password, nombre, apellido, telefono, direccion) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(user, { displayName: `${nombre} ${apellido}` });

            const nuevoUsuario = {
                uid: user.uid,
                email,
                nombre,
                apellido,
                telefono,
                direccion,
                rol: "usuario"
            };

            await usuarioService.crearUsuario(nuevoUsuario);

            setUserRole("usuario");
            setUserData(nuevoUsuario);

            return user;
        } catch (error) {
            console.error("Error en registro:", error);
            throw error;
        }
    };

    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

    const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

    const logout = () => {
        setUserRole(null);
        setUserData(null);
        return signOut(auth);
    };

    const sincronizarUsuarioBackend = async (firebaseUser) => {
        try {
            const usuarioBD = await usuarioService.obtenerUsuario(firebaseUser.uid);
            if (usuarioBD) {
                console.log("Rol sincronizado:", usuarioBD.rol);
                setUserData(usuarioBD);
                setUserRole(usuarioBD.rol);
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                const nuevoUsuario = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    nombre: firebaseUser.displayName?.split(' ')[0] || "Usuario",
                    apellido: "",
                    telefono: "",
                    direccion: "",
                    rol: "usuario"
                };
                await usuarioService.crearUsuario(nuevoUsuario);
                setUserRole("usuario");
                setUserData(nuevoUsuario);
            } else {
                console.error("Error backend:", error);
            }
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            if (user) {
                await sincronizarUsuarioBackend(user);
            } else {
                setUserRole(null);
                setUserData(null);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userRole,
        userData,
        loading,
        signup,
        login,
        loginWithGoogle,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};