import api from '@/api/axios';
import {API_ENDPOINTS} from "@/api/endpoints.ts";
import type { Category } from '@/types/database.ts';
import type { ApiResponse } from '@/types/api.ts';

export const getCategories = async (): Promise<ApiResponse<Category[]>> => {
    const response = await api.get<ApiResponse<Category[]>>(API_ENDPOINTS.CATEGORIES.ROOT);
    return response.data;
};