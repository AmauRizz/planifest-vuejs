import api from '@/api/axios';
import {API_ENDPOINTS} from "@/api/endpoints.ts";
import type { User } from '@/types/database.ts';
import type { ApiResponse } from '@/types/api.ts';

export const getUsersById = async (id: number): Promise<ApiResponse<User>> => {
    const response = await api.get<ApiResponse<User>>(API_ENDPOINTS.USERS.BY_ID(id));
    return response.data;
};