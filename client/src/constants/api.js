import axios from "axios";

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const API = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
});

API.interceptors.request.use((config) => {
    if (typeof window !== "undefined") { 
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${JSON.parse(token)}`; 
        }
    }
    return config;
});

export default API;
