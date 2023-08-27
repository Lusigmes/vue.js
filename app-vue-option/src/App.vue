<template>
    <Header/>
    <router-view/>
</template>

<script>
import Header from "./components/Header.vue";
  export default {
    name: 'App',
    components: {
      Header
    }
  }
</script>
<style >
  body{
    background-color: rgb(174, 168, 168);
    color:white;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  }
 
</style>