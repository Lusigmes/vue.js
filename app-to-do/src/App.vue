<script setup lang="ts">
  import Todo from './components/Todo.vue';
  import  Arrastavel  from "./components/Arrastavel.vue"
</script>

<template>
  <div>
    <Todo/>
  </div>
    <div class="arrastavel-container"><Arrastavel /></div>
</template>

<style scoped>
.arrastavel-container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100px; 
    height: 100px;
    margin-top: 20px;
}
</style>