import axios from "axios";

// Ajusta la IP aquí una sola vez.
// Si mañana cambias a localhost, solo editas esta línea.
export const BASE_URL = "http://54.81.202.30:8080/api";

// Instancia de axios pre-configurada
export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});