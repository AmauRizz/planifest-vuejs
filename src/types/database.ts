export interface BaseTimestamps  {
    createdAt: string;
    updatedAt: string;
}

export interface Category extends BaseTimestamps {
    id: number;
    name: string;
}

export interface Role extends BaseTimestamps {
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
    images: Image[];
    startingDate: string;
    endingDate: string;
    website: string;
    address: string;
}