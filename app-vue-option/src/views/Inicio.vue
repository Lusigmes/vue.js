<template>
    <Banner/>
</template>


<script>
    import Banner from '../components/Banner.vue'
 
    export default {
        name:'Inicio',
        components: {
            Banner
        },
        data(){
            return{
                entrada: '/img/lista-tele2.jpg'
            }
        }
    }
</script>

<style scoped>
/*
.inicio-container{ é uma  div
        padding:10px;
        display: flex;
        flex-direction:column;
        border-bottom: 1px outset #111;
        border-right: 1px outset #111;
        color: black;
        font-size:25px;
        margin:20px;
        justify-content:center;
        align-items:center;
        background-color: rgb(146, 144, 141);
    }
*/

    
</style>
   