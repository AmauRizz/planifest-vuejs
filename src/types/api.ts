export interface ApiSuccessResponse<T> {
    success: true;
    message: string;
    data: T;
}

export interface ApiFailureResponse {
    success: false;
    error: {
        code: string;
        message: string;
        hint: string;
    };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiFailureResponse;