import api from './axios';
import { useAuthStore } from "@/stores/auth";
import { API_ENDPOINTS } from "@/api/endpoints.ts";

export function setupInterceptors() {
    api.interceptors.request.use(
        (config) => {
            if (config.url === API_ENDPOINTS.IMAGES.ROOT) {
                config.headers['Content-Type'] = 'multipart/form-data';
            }

            const authStore = useAuthStore();
            const token = authStore.authToken;

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
}
