<template>
    <div class="contatos">
        <h2>Agenda Telefônica</h2>
        <div class="agenda-form-wrapper">
            <AgendaForm/>
        </div>
            
        <router-link class="buttonList" :to="link">
            <button class="btnList">
                <img src="/img/livro-de-contato.png" alt="book">
                Lista de contatos
            </button>
        </router-link>
            

    </div>

</template>


<script>
   import AgendaForm from '../components/AgendaForm.vue'
    export default {
        name:'Contatos',
        components: {
            AgendaForm,
        },
        data(){
            return{
                nome: 'ListaContato',
                link: '/listaContatos'
            }
        }
    }
</script>

<style scoped> 
     .contatos{
        padding:10px;
        display: flex;
        flex-direction:column;
        background-color: rgb(146, 144, 141);
        color: black;
        font-size:25px;
        margin:20px;
        justify-content:center;
        align-items:center;
        border-bottom: 1px outset #111;
        border-right: 1px outset #111;
    }
    .contatos h2{
        color:white;
        margin-bottom:10px; 
        margin-top:-5px;
    }
    .agenda-form-wrapper {
        flex: 1; /* Faz com que a AgendaForm ocupe o espaço restante verticalmente */
    }

    .btnList{
        border-radius: 20px;
        background-color: #229717; /* Cor de fundo do botão */
        color:white;
        padding: 5px 10px;
        cursor:pointer;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
       
        transition: background-color 0.3s ease-in-out;

    }
    .btnList:hover{
        color:black;
        background-color: rgb(55, 250, 55);

    }

    .buttonList{
        text-decoration: none;
        margin-top: 5%;
        margin-bottom: 5%;
       
    }

    .buttonList img{
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }
    
   


    

/*

.list-button {
    position: absolute; /* Define a posição absoluta para o botão 
    top: 10px; /* Distância do topo 
    right: 10px; /* Distância da direita 
    padding: 5px 10px; /* Preenchimento do botão 
    background-color: transparent; /* Fundo transparente 
    border: none; /* Sem borda 
    cursor: pointer;
    font-size: 14px; /* Tamanho da fonte 

*/
</style>