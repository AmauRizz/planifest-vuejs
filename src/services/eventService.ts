import api from '@/api/axios';
import type { Event } from '@/types/database.ts';
import type { ApiResponse } from '@/types/api.ts';
import {API_ENDPOINTS} from "@/api/endpoints.ts";

export const getEvents = async (): Promise<ApiResponse<Event[]>> => {
    const response = await api.get<ApiResponse<Event[]>>(API_ENDPOINTS.EVENTS.ROOT);
    return response.data;
};

export const getEventById = async (id: number): Promise<ApiResponse<Event>> => {
    const response = await api.get<ApiResponse<Event>>(API_ENDPOINTS.EVENTS.BY_ID(id));
    return response.data;
};

export const createEvent = async (eventData: Partial<Event>): Promise<ApiResponse<Event>> => {
    const response = await api.post<ApiResponse<Event>>(API_ENDPOINTS.EVENTS.ROOT, eventData);
    return response.data;
};


export const updateEvent = async (id: number, eventData: Partial<Event>): Promise<ApiResponse<Event>> => {
    const response = await api.patch<ApiResponse<Event>>(API_ENDPOINTS.EVENTS.BY_ID(id), eventData);
    return response.data;
};

export const deleteEvent = async (id: number): Promise<ApiResponse<null>> => {
    const response = await api.delete(API_ENDPOINTS.EVENTS.BY_ID(id));

    if (response.status === 204 || response.data === undefined) {
        return {
            success: true,
            message: 'Event deleted successfully',
            data: null
        };
    }

    return response.data;
};