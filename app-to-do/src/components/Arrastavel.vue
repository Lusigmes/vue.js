<script setup lang="ts">
    import {ref, reactive, onMounted, onUnmounted} from 'vue';
    
   
    const posicao = reactive({x:0, y:0});
    const arrastando = ref(false);
    const posicaoInicialMouse = reactive({x:0, y:0});
  
    const notas = ref<Array<{ x: number; y: number; texto: string; }>>([])
  

    const iniciarArrastar = (e: MouseEvent) => {
        arrastando.value = true;
        posicaoInicialMouse.x = e.clientX;
        posicaoInicialMouse.y = e.clientY;
      
    };

    const atoArrastar =  (e: MouseEvent) =>{
       
   
        if(arrastando.value){
            const desvioX = e.clientX - posicaoInicialMouse.x;
            const desvioY = e.clientY - posicaoInicialMouse.y;

            posicao.x += desvioX;
            posicao.y += desvioY;
  
            posicaoInicialMouse.x = e.clientX;
            posicaoInicialMouse.y = e.clientY;

        }
    }; 
    const pararArrastar = () =>{
        arrastando.value = false;
    };
    

    onMounted(() => {
        window.addEventListener('mousemove', atoArrastar);
        window.addEventListener('mouseup', pararArrastar);
            
    
    });
    onUnmounted(()=>{
        window.removeEventListener('mousemove', atoArrastar);
        window.removeEventListener('mouseup', pararArrastar);

    });

    const adicionarNota = () => {
        if(notas.value.length < 6)
            notas.value.push({x: 0, y:0, texto: ''})
        else
            alert("IMPOSSIVEL ADICIONAR MAIS NOTAS")
    };
    function excluirNota(index: number){
      /*   if(notas.value.length > 1) */
            notas.value.splice(index, 1);
    }

</script>

<template>
    <div class="container"  >

        <div v-for="(nota, index) in notas" :key="index" class="notinhas">
            <div class="arrastar" :style="{left:posicao.x + 'px', top: posicao.y + 'px'}"
            @mousedown="iniciarArrastar" @mousemove="atoArrastar" @mouseup="pararArrastar"  >
                <button @click="excluirNota(index)" class="excluir">X</button>
                <textarea v-model="nota.texto " placeholder="ESCREVA AQUI"></textarea>
            </div>

        </div>
    </div>

    <button @click="adicionarNota" class="adicionar">+</button>
</template>

<style scoped>
  .container {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    /* height: 100vh;
    background-color: #f0f0f0; */
  }

  .notinhas {
    margin: 10px;
  }

  .arrastar {
    position: relative;
    width: 150px;
    height: 150px;
    background-color: #3498db;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: grab;
    transition: background-color 0.3s;
  }

  .arrastar:hover {
    background-color: #53bdff;
  }

  .excluir {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
  }

  textarea {
    width: 80%;
    height: 80%;
    border: none;
    background-color: transparent;
    color: #fff;
    font-size: 16px;
    resize: none;
  }

  .adicionar {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #3498db;
    border: none;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    border-radius: 5px;
    padding: 10px 20px;
  }

  .adicionar:hover {
    background-color: #2779ab;
  }
</style>
