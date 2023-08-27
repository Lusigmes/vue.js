<template>
    <div class="msg-container">
        <p>{{ msg }}</p>
    </div>

</template>

<script>
    export default {
        name:'Mensagem',
        props: {
            msg: String
        }
    }
</script>

<style scoped>
    .msg-container{
        background-color: rgb(131, 251, 185);
        color:black;
        font-weight: bold;
        min-width: 100px;
        /*height: ; */ 
        border-radius: 5px;
        margin: 30px auto;
        border: 2px solid black;
        padding:10px;
        width: 250px;
        flex-wrap: nowrap;
        font-size: 20px;
        border:none;
      
    }
    .msg-container p {
        white-space: nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
        flex-grow: 1;
        margin-left: 50px;
        margin-right: 5px;
        margin-bottom: 5px;
        margin-top: 5px;
    }

</style>