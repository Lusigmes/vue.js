<template>
   <div class="listaContatos">    
        <Dashboard/>
    </div>
</template>

<script>
/*     import { mapGetters} from 'vuex'*/
       import Dashboard from '../components/Dashboard.vue'

    export default {
        name: 'ListaContatos',
        components:{
            Dashboard
        }
        

        /* computed: {
            ...mapGetters(['getContatos']),
            contatos(){
                console.log( this.getContatos);
            },
        }, */

    };
</script>

<style>

.listaContatos{
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
</style>