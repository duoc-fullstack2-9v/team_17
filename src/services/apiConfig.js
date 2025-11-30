import axios from "axios";

export const BASE_URL = "http://54.81.202.30:8080/api";

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});