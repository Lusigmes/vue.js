<script setup lang="ts">
import { ref, onMounted } from 'vue';

const notas = ref<Array<{ x: number; y: number; texto: string; arrastando: boolean; posicaoInicialMouse: { x: number; y: number } }>>([]);

const posicaoFixa = { x: 100, y: 100 }; // Defina a posição fixa desejada

const iniciarArrastar = (e: MouseEvent, index: number) => {
  notas.value[index].arrastando = true;
  notas.value[index].posicaoInicialMouse.x = e.clientX;
  notas.value[index].posicaoInicialMouse.y = e.clientY;
};

const atoArrastar = (e: MouseEvent, index: number) => {
  const nota = notas.value[index];
  if (nota.arrastando) {
    const desvioX = e.clientX - nota.posicaoInicialMouse.x;
    const desvioY = e.clientY - nota.posicaoInicialMouse.y;

    nota.x += desvioX;
    nota.y += desvioY;

    nota.posicaoInicialMouse.x = e.clientX;
    nota.posicaoInicialMouse.y = e.clientY;
  }
};

const pararArrastar = (index: number) => {
  notas.value[index].arrastando = false;
};

onMounted(() => {
  window.addEventListener('mousemove', (e) => {
    for (let i = 0; i < notas.value.length; i++) {
      atoArrastar(e, i);
    }
  });
  window.addEventListener('mouseup', (e) => {
    for (let i = 0; i < notas.value.length; i++) {
      pararArrastar(i);
    }
  });
});

const adicionarNota = () => {
  if (notas.value.length < 6) {
    notas.value.push({
      x: posicaoFixa.x,
      y: posicaoFixa.y,
      texto: '',
      arrastando: false,
      posicaoInicialMouse: { x: 0, y: 0 }
    });
  } else {
    alert('NÃO É POSSÍVEL ADICIONAR MAIS NOTAS');
  }
};

function excluirNota(index: number) {
  notas.value.splice(index, 1);
}
</script>


<template>
  <div class="container">
    <div v-for="(nota, index) in notas" :key="index" class="notinhas">
      <div
        class="arrastar"
        :style="{ left: nota.x + 'px', top: nota.y + 'px' }"
        @mousedown="($event) => iniciarArrastar($event, index)"
      >
        <button @click="() => excluirNota(index)" class="excluir">X</button>
        <textarea v-model="nota.texto" placeholder="ESCREVA AQUI"></textarea>
      </div>
    </div>
    <button @click="adicionarNota" class="adicionar">+</button>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
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
