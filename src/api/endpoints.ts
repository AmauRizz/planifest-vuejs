export const API_ENDPOINTS = {
    BASE_URL: 'http://localhost:8000/api',

    EVENTS: {
        ROOT: '/events',
        BY_ID: (id: number) => `/events/${id}`,
    },

    USERS: {
        BY_ID: (id: number) => `/users/${id}`,
        BY_EVENT_ID: (eventId: number) => `/events/${eventId}/users`,
    },
    CATEGORIES: {
        ROOT: '/categories',
    }
};
