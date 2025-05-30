import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import './assets/styles/reset.css'
import './assets/styles/global.css'
import App from './App.vue'
import { setupInterceptors } from '@/api/interceptors.ts';

const app = createApp(App);
const pinia = createPinia();

setupInterceptors();

app.use(router);
app.use(pinia);
app.mount('#app');