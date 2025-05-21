import axios from 'axios';
import {API_ENDPOINTS} from "./endpoints.ts";

const api = axios.create({
    baseURL: API_ENDPOINTS.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    withCredentials: false,
    timeout: 10000,
});

export default api;