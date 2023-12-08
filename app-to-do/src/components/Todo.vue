<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';

  const todos = ref<Array<{id: number; todoText: string; done: boolean }>>([]);
  const texto = ref("");

  const endpoint =  'http://localhost:3000/todos';
  
  onMounted(() => {        
    getTodo();
  });
  
  //DELETE
  const removerTodo = async (index: number, id: number) => {   
    try {
      if(todos.value[index].done){ 
        return;
      }
      const res = await fetch(`${endpoint}/${id}`, {
        method: 'delete'
      });

    /*     console.log(id);
        console.log(todos.value[index])
        console.log("res:", res); */
      
      if(res.ok){
        //todos.value = todos.value.filter((_, i) => i !== index);
        todos.value.splice(index,1);
        console.log("SUCESSO ! DELETE");
       }else
        console.error("ERRO ! DELETE");

    }catch (error) {
      console.error("ERRO !", error);
    } 
  };
    
 
/* 
  //PATCH
  const alterarTodo = async (id:number, index: number) =>{
    const novoState = !todos.value[index].done;
    
    console.log('ID:', id);
     console.log('Index:', index);
    console.log('Novo State:', novoState);
    try {
      const res = await fetch(`${endpoint}/${id}`, {
          method: 'patch',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({done: novoState})
      });
      console.log(res)
      if(res.ok){
        todos.value[index].done = novoState;
        console.log("SUCESSO ! PATCH");
          
        }else{
          console.log("ERRO ! PATCH");
        
        }
    } catch (error) {
      console.log("ERRO !", error);
    }
  }; */


  //GET
  const getTodo = async () => {
    try{
      const res = await fetch(endpoint);
      if(res.ok){
        const data = await res.json()
        todos.value = data;
        console.log("SUCESSO ! GET");  
      }else{
        console.error("ERRO ! GET");  
      }
    }catch(error){
      console.error("ERRO:", error);  
    }
  };   

  //POST
  const adicionarTodo = async () =>{
    
    if(todos.value.length < 8){
      const novoId = Date.now();

      if(texto.value.trim() === ""){
        return;
      } 
      const novoTodo = {
        id: novoId, 
        todoText: texto.value,
        done: false,
      };
      todos.value.unshift(novoTodo);
      texto.value = "";
      try {
        const res = await fetch(endpoint, {
          method: 'post',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify(novoTodo)
        });
        if(res.ok){
          console.log("SUCESSO ! POST")
          await getTodo();
        }else{
          console.error("ERRO ! POST")
        }
      } catch (error) {
         console.error("ERRO !",error)
      }
    }else{
      alert("NÃO É POSSIVEL ADICIONAR MAIS TO-DO'S");
    }
  }; 


  function alterarTodo(index: number){
   // console.log(todos.value[index].done);
    todos.value[index].done = !todos.value[index].done;
  }


  const todoDone = (todoDone:boolean) => {
    return todoDone ? 'Doing':'To do'
  };

</script>


<template>
  <main class="app">

    <section class="app-tema">
      <h3 class="title">GERENCIADOR DE TAREFAS</h3>
    </section>

    <div class="area-input">
      <section class="criaar-todo">
        <form @submit.prevent="adicionarTodo">
          <h3>Liste suas tarefas</h3>
          <input type="text" placeholder="Digite seus to-do's" v-model="texto">
          <input type="submit" value="Novo">
        </form>
      </section>
    </div>
 
    <div class="area-todo">
      <section>
        <h2 v-show="todos.length === 0">Você não possui nenhum to-do</h2>
       
       <div class="list-todos" v-show="todos.length !== 0">
          <div v-for="(todo,index) in todos" :key="index" :class="`todo-item ${todo.done && 'done'}`">
            <div class="todo-conteudo">
              {{ todo.todoText }}
            </div>
            <button @click="() => alterarTodo(index)" :class="{'doing': todo.done, 'todo': !todo.done}">
                {{ todoDone(todo.done) }}
            </button>

            <button @click="removerTodo(index, todo.id)" :class="todo.done ? 'done' : 'todo'">Done</button>
         </div>
        </div>
  
      </section>
    </div>
    
  </main>
</template>
<style scoped>


.app {
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 150vh;
  background-color: #f4f4f4;
}

.app-tema {
  background-color: #3498db;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.title {
  margin: 0;
}

.area-input {
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
}

.criaar-todo {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
h3 {
  margin: 0 0 10px;
}

input[type="text"] {
  width: 90%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 10px;
  font-size: 16px;
}

input[type="submit"]:hover {
  background-color: #030e15;

}
input[type="submit"] {
  margin-left: 76%;
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 3px;
}

.area-todo {
  width: 100%;
  max-width: 600px;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

}
.todo-conteudo{
  overflow: hidden;
}
.area-todo section{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
h2{
  align-self: center;
}
.list-todos {
  margin-top: 20px;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.todo-item.done {
  color: #04af5f;
  text-decoration:transparent;
}

button {
  background-color: transparent;
  border: none;
  color: #3498db;
  cursor: pointer;
  padding: 5px;
  font-size: 16px;
}

button:hover {
  background-color: #eee;
}

button.done {
  color: rgb(207, 5, 5); /* Cor verde para "Done" quando todo.done é false */
}

button.todo {
  color: rgb(8, 214, 70); /* Cor vermelha para "Done" quando todo.done é true */
}

</style>
