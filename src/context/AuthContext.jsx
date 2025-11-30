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

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    // ==========================================
    // 1. REGISTRO (Firebase Auth + Spring Boot BD)
    // ==========================================
    const signup = async (email, password, nombre, apellido, telefono, direccion) => {
        try {
            // a. Crear usuario en Firebase 
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Actualizar el nombre visible en el perfil de Firebase 
            await updateProfile(user, { displayName: `${nombre} ${apellido}` });

            // b. Preparar el objeto para enviar a Spring Boot 
            const nuevoUsuarioBackend = {
                uid: user.uid,
                email: email,
                nombre: nombre,
                apellido: apellido,
                telefono: telefono,
                direccion: direccion,
                rol: "usuario"        // Se asigna rol por defecto
            };

            // c. Enviar al Backend usando el servicio
            await usuarioService.crearUsuario(nuevoUsuarioBackend);

            // Establecer rol localmente para que la UI se actualice sin recargar
            setUserRole("usuario");
            return user;
        } catch (error) {
            console.error("Error en el proceso de registro:", error);
            throw error;
        }
    };

    // ==========================================
    // 2. LOGIN CON EMAIL Y PASSWORD
    // ==========================================
    const login = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // El useEffect (abajo) se encargará de detectar el cambio y traer el rol desde la BD
        return userCredential.user;
    };

    // ==========================================
    // 3. LOGIN CON GOOGLE
    // ==========================================
    const loginWithGoogle = async () => {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        // Al entrar con Google, verificamos si ya existe en la BD o hay que crearlo
        await sincronizarUsuarioBackend(user);
    };

    const logout = () => {
        setUserRole(null);
        return signOut(auth);
    };

    // ==========================================
    // AUXILIAR: Sincronizar con Spring Boot
    // ==========================================
    const sincronizarUsuarioBackend = async (firebaseUser) => {
        try {
            // Pedimos al backend los datos de este UID para saber su rol (Admin/Usuario)
            const usuarioBD = await usuarioService.obtenerUsuario(firebaseUser.uid);
            setUserRole(usuarioBD.rol);
        } catch (error) {
            // Si el backend devuelve 404 (No existe), lo creamos automáticamente.
            // Esto pasa si es la primera vez que se loguea con Google.
            if (error.response && error.response.status === 404) {
                const nuevoUsuario = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    nombre: firebaseUser.displayName || "Usuario Google",
                    apellido: "",
                    telefono: "",
                    direccion: "",
                    rol: "usuario"
                };
                await usuarioService.crearUsuario(nuevoUsuario);
                setUserRole("usuario");
            } else {
                console.error("Error al sincronizar usuario con backend:", error);
            }
        }
    };

    // ==========================================
    // OBSERVADOR DE ESTADO (Mantiene la sesión)
    // ==========================================
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            if (user) {
                // Si hay usuario (ej. al recargar página), pedimos su rol al backend
                await sincronizarUsuarioBackend(user);
            } else {
                setUserRole(null);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userRole,
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