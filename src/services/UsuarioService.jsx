import { api } from "./apiConfig";

// Crear usuario nuevo (POST /usuarios)
export const crearUsuario = async (usuario) => {
    try {
        const response = await api.post("/usuarios", usuario);
        return response.data;
    } catch (error) {
        console.error("Error creando usuario:", error);
        throw error;
    }
};

// Obtener usuario por UID (GET /usuarios/{uid})
export const obtenerUsuario = async (uid) => {
    try {
        const response = await api.get(`/usuarios/${uid}`);
        return response.data;
    } catch (error) {
        console.error("Error obteniendo usuario:", error);
        throw error;
    }
};

// Listar todos los usuarios (GET /usuarios)
export const listarUsuarios = async () => {
    try {
        const response = await api.get("/usuarios");
        return response.data;
    } catch (error) {
        console.error("Error listando usuarios:", error);
        throw error;
    }
};

// Actualizar usuario (PUT /usuarios/{uid})
export const actualizarUsuario = async (uid, usuario) => {
    try {
        const response = await api.put(`/usuarios/${uid}`, usuario);
        return response.data;
    } catch (error) {
        console.error("Error actualizando usuario:", error);
        throw error;
    }
};

// Eliminar usuario (DELETE /usuarios/{uid})
export const eliminarUsuario = async (uid) => {
    try {
        await api.delete(`/usuarios/${uid}`);
    } catch (error) {
        console.error("Error eliminando usuario:", error);
        throw error;
    }
};