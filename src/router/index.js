import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/views/MainPage.vue';
import StarredPage from '@/views/StarredPage.vue';

const routes = [
    {
        path: '/main',
        name: MainPage,
        component: MainPage,
        alias: '/',
    },
    {
        path: '/starred',
        name: StarredPage,
        component: StarredPage,
    },
];

export default createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});
