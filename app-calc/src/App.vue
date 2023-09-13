
<script setup lang="ts">
  import {ref} from 'vue';

  const display = ref('');
  
  const buttons = [
    { value: 'AC', type: 'clear' },
      { value: 'DEL', type: 'delete' },
      { value: '.', type: 'operator' },
      { value: '/', type: 'operator' },

      { value: '7' },
      { value: '8' },
      { value: '9' },
      { value: '*', type: 'operator' },

      { value: '4' },
      { value: '5' },
      { value: '6' },
      { value: '-', type: 'operator' },

      { value: '1' },
      { value: '2' },
      { value: '3' },
      { value: '+', type: 'operator' },

      { value: '000' },
      { value: '00' },
      { value: '0' },
      { value: '=', type: 'equals' },
  ];


  function atualizarDisplay(value: any){
    let sucess = true;
    if(value === 'AC'){
      return display.value = '';
    }else if(value === 'DEL'){
      return display.value = display.value.slice(0, -1);
    }else if(value === '=')
    {
      try {
        return display.value = eval(display.value);
      } catch (error) {
        alert(error);
        sucess = false;
      }
      if(!sucess){
        display.value = '';
      }
    }else display.value += value;
  }


</script>

<template>
    <div class="container">
      <div class="calculator">
        <input type="text" v-model="display" class="display" disabled>

        <div class="buttons">
            <button v-for="btn in buttons" :key="btn.value" @click="atualizarDisplay(btn.value)" 
            :class="`button button_${btn.type || 'default'}`">
                {{ btn.value }}
            </button>
        </div>
    </div>

    <footer>
        Desenvolvido por <a href="https://github.com/Lusigmes" target="_blank">Luis</a>
    </footer>
    </div>


</template>
<style>
.container{
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(246, 238, 230);
}
.calculator{
  max-width: 360px;
  background-color: rgb(179, 179, 188);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 10px 20px;
  } 
  .display{
    width: 100%;
    height: 50px;
    font-display: 20px;
    text-align: right;
    padding: 20px;
    color: white;
    background-color: rgb(92, 92, 92);
    border-radius: 5px;
    border: none;
    box-sizing: border-box;
  }

  .buttons {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    margin-top: 5px;
  }

  .button{
    width: calc(100%/5);
    height: 50px;
    margin: 5px 5px;
    cursor: pointer;
    border: none ;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease-in-out;
    box-shadow: 0 10px 20px gray;
  }
  
  .button:hover{
    transform: translate(-2px);
    box-shadow: 0 10px 20px rgb(77, 77, 77);
    background-color: rgb(243, 243, 194);
  
  }
  .button:focus{
    outline: none;
  }
  .button_operator,
  .button_delete,
  .button_equals{
    color: green;
  }
  .button_clear{
    color: red;
  }

  @media only screen and (max-width: 426px){
    button{
      font-size: 18px !important;
    }
    .calculator{
      max-width: 260px !important;
    }
    footer{
      font-size: 15px !important;
    }
  }

  footer{
    margin-top: 15px;
    font-size: 18px;
    color:rgb(5, 5, 94);
    text-align: center;
  }
  footer a{
    text-decoration: none;
    color: rgb(0, 0, 0);
  }
  
  footer a:hover{
    text-decoration: underline;
  }







</style>
