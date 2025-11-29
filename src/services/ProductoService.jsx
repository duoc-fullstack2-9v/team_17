import { api } from "./apiConfig";

// Listar todos (GET /productos)
export const listarProductos = async () => {
    try {
        const response = await api.get("/productos");
        return response.data;
    } catch (error) {
        console.error("Error listando productos:", error);
        throw error;
    }
};

// Obtener por ID (GET /productos/{id})
export const obtenerProducto = async (id) => {
    try {
        const response = await api.get(`/productos/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error obteniendo producto:", error);
        throw error;
    }
};

// Listar por Categoría (GET /productos/categoria/{categoria})
export const listarPorCategoria = async (categoria) => {
    try {
        const response = await api.get(`/productos/categoria/${categoria}`);
        return response.data;
    } catch (error) {
        console.error("Error filtrando por categoría:", error);
        throw error;
    }
};

// Buscar por nombre (GET /productos/buscar?nombre=...)
export const buscarProducto = async (nombre) => {
    try {
        const response = await api.get("/productos/buscar", {
            params: { nombre: nombre }
        });
        return response.data;
    } catch (error) {
        console.error("Error buscando producto:", error);
        throw error;
    }
};

// Guardar/Crear producto (POST /productos)
export const guardarProducto = async (producto) => {
    try {
        const response = await api.post("/productos", producto);
        return response.data;
    } catch (error) {
        console.error("Error guardando producto:", error);
        throw error;
    }
};

// Actualizar Stock (PATCH /productos/{id}/stock?cantidad=...)
export const actualizarStock = async (id, cantidad) => {
    try {
        const response = await api.patch(`/productos/${id}/stock`, null, {
            params: { cantidad: cantidad }
        });
        return response.data;
    } catch (error) {
        console.error("Error actualizando stock:", error);
        throw error;
    }
};

// Eliminar producto (DELETE /productos/{id})
export const eliminarProducto = async (id) => {
    try {
        await api.delete(`/productos/${id}`);
    } catch (error) {
        console.error("Error eliminando producto:", error);
        throw error;
    }
};