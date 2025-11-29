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
import { usuarioService } from '../services/UsuarioService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    // 1. REGISTRO (Actualizado con Teléfono y Dirección)
    const signup = async (email, password, nombre, apellido, telefono, direccion) => {
        // a. Crear usuario en Firebase (Autenticación)
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Actualizar nombre visible en Firebase
        await updateProfile(user, { displayName: `${nombre} ${apellido}` });

        // b. Preparar objeto para Spring Boot (Base de Datos)
        // NOTA: 'uid' es la clave, 'rol' se asigna como "usuario" por defecto en tu Java (@PrePersist)
        // pero lo enviamos explícito por seguridad si quieres, o dejamos que Java lo ponga.
        // Aquí enviamos "usuario" para que coincida con tu lógica de frontend inmediata.
        const nuevoUsuarioBackend = {
            uid: user.uid,
            email: email,
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,   // Campo Nuevo
            direccion: direccion, // Campo Nuevo
            rol: "usuario"
        };

        // c. Enviar al Backend
        await usuarioService.crearUsuario(nuevoUsuarioBackend);

        // Establecer rol localmente
        setUserRole("usuario");
        return user;
    };

    // 2. LOGIN (Email/Pass)
    const login = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    };

    // 3. LOGIN (Google)
    const loginWithGoogle = async () => {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        await sincronizarUsuarioBackend(user);
    };

    const logout = () => signOut(auth);

    // Auxiliar: Traer rol desde Spring Boot
    const sincronizarUsuarioBackend = async (firebaseUser) => {
        try {
            const usuarioBD = await usuarioService.obtenerUsuario(firebaseUser.uid);
            setUserRole(usuarioBD.rol);
        } catch (error) {
            // Si es 404 (No existe en BD), lo creamos con datos básicos
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