import api from '@/api/axios';
import {API_ENDPOINTS} from "@/api/endpoints.ts";
import type {CreateUserPayload, LoginUserPayload, Token, User} from '@/types/database.ts';
import type { ApiResponse } from '@/types/api.ts';

export const getUserById = async (id: number): Promise<ApiResponse<User>> => {
    const response = await api.get<ApiResponse<User>>(API_ENDPOINTS.USERS.BY_ID(id));
    return response.data;
};

export const getMe = async (): Promise<ApiResponse<User>> => {
    const response = await api.get<ApiResponse<User>>(API_ENDPOINTS.USERS.ME)
    return response.data
}

export const loginUser = async (userCredential: LoginUserPayload): Promise<ApiResponse<Token>> => {
    const response = await api.post<ApiResponse<Token>>(API_ENDPOINTS.USERS.TOKEN, userCredential)
    return response.data
}

export const registerUser = async (userData: CreateUserPayload): Promise<ApiResponse<null>> => {
    const response = await api.post<ApiResponse<null>>(API_ENDPOINTS.USERS.ROOT, userData);
    return response.data;
};

export const deleteUser = async (id: number): Promise<ApiResponse<null>> => {
    const response = await api.delete<ApiResponse<null>>(API_ENDPOINTS.USERS.BY_ID(id));

    if (response.status === 204) {
        return {
            success: true,
            message: 'User deleted successfully',
            data: null
        };
    }

    return response.data;
};