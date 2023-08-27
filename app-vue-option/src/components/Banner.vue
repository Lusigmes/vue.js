<template>
    <div id="banner-container">
        <h1>A G E N D A</h1>
        </div>
</template>

<script>
    export default {
        name: 'Banner'
    }

    /*
    
background-position: center;
    background-size: cover;
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 24px;
    */
</script>

<style scoped>
    #banner-container{
        background-position: 0 -250px;
       /*  background-image: url("C:\Users\Luis\Desktop\SI 2023.2\NPI\vue.js\app-vue-option\public\img\lista-tele2.jpg"); */
        background-image: url("C:\Users\Luis\Desktop\app-vue-option\public\img\lista-tele2.jpg");
        background-size: cover;
        margin:20px;
        padding:20px;
        max-width:100%;
        height: 400px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 40px;
        color: white;
        border-bottom: 1px outset #111;
        border-right: 1px outset #111;
    }
    #banner-container h1{
        text-align: center;
       opacity: 0.8;
    }

</style>

