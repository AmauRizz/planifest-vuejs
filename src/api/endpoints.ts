export const API_ENDPOINTS = {
    BASE_URL: 'http://localhost:8000/api',

    EVENTS: {
        ROOT: '/events',
        BY_ID: (id: number) => `/events/${id}`,
    },

    USERS: {
        ROOT: '/users',
        BY_ID: (id: number) => `/users/${id}`,
        BY_EVENT_ID: (eventId: number) => `/events/${eventId}/users`,
        TOKEN: '/auth/token',
        ME: '/users/me',
    },
    CATEGORIES: {
        ROOT: '/categories',
    },
    IMAGES: {
        ROOT: '/images'
    }
};
