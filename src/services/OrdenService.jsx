import { api } from "./apiConfig";

// Comprar (POST /ordenes/comprar/{uid})
export const comprar = async (uid) => {
    try {
        const response = await api.post(`/ordenes/comprar/${uid}`);
        return response.data;
    } catch (error) {
        console.error("Error realizando compra:", error);
        throw error;
    }
};

// Historial (GET /ordenes/{uid})
export const historialCompras = async (uid) => {
    try {
        const response = await api.get(`/ordenes/${uid}`);
        return response.data;
    } catch (error) {
        console.error("Error obteniendo historial:", error);
        throw error;
    }
};