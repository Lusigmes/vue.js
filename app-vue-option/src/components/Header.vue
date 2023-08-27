<template>
    <div class="nav">
        <ul>
            <!-- CABEÇALHO LADO ESQUERDO-->
            <li v-for="item in itens" :key="item.nome">
                <router-link :to="item.link"  class="liA">
                    <img :src="item.imgUrl" alt="ImagemMenu">
                    {{ item.nome }}
                </router-link>
            </li>
            <!-- Perfil-->
            <li class="liPerfil" @mouseover="showPopUp = true" @mouseleave="showPopUp = false">
                <a href="#" class="liA">
                    <img :src="perfil" alt="ImagemPerfil">
                    Perfil
                </a>
                <div class="popUp" v-if="showPopUp">
                    <a :href="meu_link" target="_blank"  >Nome do Usuário</a>
                    <a href="#" @click.prevent>Editar Perfil</a>
                    <a href="#" @click.prevent>Pagamentos</a>
                    <a href="#" @click="confirmLogout">Sair</a>
        
                </div>
            </li>
        </ul>
    </div>
    



</template>


<script>

    export default {
        name: 'Header',
        data(){
            return{
                itens:[
                    {nome:'Inicio', imgUrl:'/img/botao-de-inicio.png', link:'/'},
                    {nome:'Novo Contato', imgUrl:'/img/adicionar-usuario.png', link:'/contatos'},
                    {nome:'Sobre', imgUrl:'/img/informacoes.png', link:'/sobre'},
                ],
                perfil: '/img/perfil-de-usuario.png',
                showPopUp: false,
                meu_link: 'https://github.com/Lusigmes',
            }
        },
        methods: {
            confirmLogout(){
                const confirmExit = confirm("Realmente deseja sair?");
                if(confirmExit){
                    this.showPopUp = false;
                }
            }
        }
    
    }


</script>

<style scoped>

ul{
    border-bottom: 1px outset #111;
    border-right: 1px outset #111;
    background-color: rgb(146, 144, 141);
    color: white;
    list-style: none;
    display: flex;
    padding: 10px;
    margin: 20px;
    font-size: 20px;
    position: static;
    align-items: center;
    box-shadow: 10px 10px 20px rgba(139, 237, 171, 0.1);
    
    }
    
    li{
       color: black;
       margin-right: 20px;

   }

   .liA{
        text-decoration: none;
        align-items: center;
        display: flex;
        padding: 15px;
        border-radius: 20px;
        transition: 0.5;
        color: white;
        background-color: rgb(84, 69, 69);
    }
    .liA:hover{
        color: rgb(139, 237, 171);
        background-color: rgb(161, 138, 138);
        transform: scale(1.1);
    
    }
    .liA img{
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }
    

    .liPerfil{
        margin-left: auto;
    }
    .popUp{
        position: absolute;
        background-color: white;
        padding: 10px;
        display: none;
        box-shadow: 10px 10px 20px rgb(139 237 171/ 10%);
        border-radius: 20px;
        margin-right: 9px;
        justify-content: center;
        align-items: center;
    }
    .liPerfil:hover .popUp{
        display: block;
    }
    
    .liPerfil:hover .popUp a{
        padding: 5px;
        margin-bottom: 10px;
        display: block;
        text-decoration: none;
        color: black;
        
    }
    .liPerfil:hover .popUp a:hover{
        border-radius: 20px;
        background-color: rgb(177, 177, 173);
        padding: 10px;
        
    }
   

    
</style>