export interface BaseTimestamps  {
    createdAt: string;
    updatedAt: string;
}

export interface Category extends BaseTimestamps {
    id: number;
    name: string;
}

export interface Role extends BaseTimestamps {
    id: number;
    name: string;
}

export interface Image extends BaseTimestamps {
    slug: string;
    name: string;
    size: number;
}

export interface User extends BaseTimestamps {
    id: number;
    name: string;
    email: string;
    role: Role;
    images: Image[];
}

export interface Event extends BaseTimestamps {
    id: number;
    name: string;
    description: string;
    category: Category;
    author: User;
    images: Image[];
    startingDate: string;
    endingDate: string;
    websiteUrl: string;
    address: string;
}

export interface Token {
    token: string;
}

export interface CreateUserPayload {
    name: string
    email: string
    password: string
}

export interface LoginUserPayload {
    email: string
    password: string
}

export interface CreateEventPayload {
    name: string,
    description: string,
    categoryId: number,
    startingDate: string,
    endingDate: string,
    websiteUrl?: string,
    address?: string,
}

export interface UpdateEventPayload {
    name?: string,
    description?: string,
    categoryId?: number,
    startingDate?: string,
    endingDate?: string,
    websiteUrl?: string,
    address?: string,
}

export interface CreateImagePayload {
    file: File;
}