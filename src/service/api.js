import axios from "axios"
import { getToken } from './auth'
import { logout } from "./auth";

const api = axios.create({
    //baseURL: "http://149.100.154.172:8080/api"
    baseURL: "http://localhost:8080/api"
});

api.interceptors.request.use(async config => {
    const token = getToken();
    const validity = localStorage.getItem("validity-token")
    const today = new Date().getDate();
    if (today >= parseInt(validity)) {
        logout();
    }

    if(token){
        config.headers.Authorization = 'Bearer '+token;
    }
    return config;
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

api.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error);
    }
);
export default api;
