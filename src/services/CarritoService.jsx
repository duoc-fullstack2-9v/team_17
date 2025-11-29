import { api } from "./apiConfig";

// Ver carrito (GET /carrito/{uid})
export const verCarrito = async (uid) => {
    try {
        const response = await api.get(`/carrito/${uid}`);
        return response.data;
    } catch (error) {
        console.error("Error obteniendo carrito:", error);
        throw error;
    }
};

// Agregar al carrito (POST /carrito/agregar)
// Body: { uid, productoId, cantidad }
export const agregarAlCarrito = async (uid, productoId, cantidad) => {
    const solicitud = { uid, productoId, cantidad };
    try {
        const response = await api.post("/carrito/agregar", solicitud);
        return response.data;
    } catch (error) {
        console.error("Error agregando al carrito:", error);
        throw error;
    }
};

// Eliminar item específico (DELETE /carrito/item/{id})
export const eliminarItemCarrito = async (id) => {
    try {
        await api.delete(`/carrito/item/${id}`);
    } catch (error) {
        console.error("Error eliminando item carrito:", error);
        throw error;
    }
};

// Vaciar carrito (DELETE /carrito/{uid})
export const vaciarCarrito = async (uid) => {
    try {
        await api.delete(`/carrito/${uid}`);
    } catch (error) {
        console.error("Error vaciando carrito:", error);
        throw error;
    }
};