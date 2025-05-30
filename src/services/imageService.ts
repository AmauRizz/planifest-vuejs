import type {CreateImagePayload} from "@/types/database.ts";
import type {ApiResponse} from "@/types/api.ts";
import api from "@/api/axios.ts";
import {API_ENDPOINTS} from "@/api/endpoints.ts";

export const createImage = async (imageData: CreateImagePayload): Promise<ApiResponse<null>> => {
    const response = await api.post<ApiResponse<null>>(API_ENDPOINTS.IMAGES.ROOT, imageData);
    return response.data;
};