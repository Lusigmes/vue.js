import { createApp } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import App from './App.vue'
/* import store from './store' */


import Contatos from './views/Contatos.vue';
import Inicio from './views/Inicio.vue';
import Sobre from './views/Sobre.vue';
import ListaContatos from './views/ListaContatos.vue';

const routes: Array<RouteRecordRaw> = [
    {path: '/', component: Inicio},
    {path: '/contatos', component: Contatos},
    {path: '/sobre', component: Sobre},
    {path: '/listaContatos', component: ListaContatos},
    
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const app = createApp(App);

app.use(router);
/* app.use(store); */
app.mount('#app');
