import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/Home.vue';
import EventsPage from '../views/Events.vue';
import EventPage from '../views/Event.vue';
import AccountPage from '../views/Account.vue';
import TermsPage from '../views/Terms.vue';
import PrivacyPage from '../views/Privacy.vue';
import SecurityPage from '../views/Security.vue';

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/events', name: 'Events', component: EventsPage},
    { path: '/events/:id', name: 'Event', component: EventPage },
    { path: '/account', name: 'Account', component: AccountPage },
    { path: '/terms', name: 'Terms', component: TermsPage },
    { path: '/privacy', name: 'Privacy', component: PrivacyPage },
    { path: '/security', name: 'Security', component: SecurityPage }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;