import { createApp } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import App from './App.vue'
//import router from './router'

import Contatos from './components/Contatos.vue'

const routes: Array<RouteRecordRaw> =[    {
    path: '/contatos', component: Contatos}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});
/*interface Contato {
    nome: string,
    telefone: string,
    endereco: string,
    status:boolean,
    listaContatos:number[]
}*/

createApp(App).use(router).mount('#app')
