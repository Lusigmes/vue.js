<script setup lang="ts">
    import { ref, onMounted } from 'vue';

    const id = ref(0);
    const nome_contato = ref<string>('');
    const telefone = ref<string>('');
    const endereco = ref<string>('');
    const status = ref<boolean>(true);
    
    const endpoint = 'http://localhost:3000/listaContato'
    
    const listaContato = ref<Array<{ id: number, nome_contato: string, telefone: string, endereco: string, status: boolean }>>([]);
    
    //funções axuliares
    onMounted(async () =>{
        await carregarLista();
    });

    const filtrarNumeros = () => {
       telefone.value = telefone.value.replace(/\D/g, '');
    };

    const statusText = (status:boolean) => {
        return status ? 'Ativo':'Inativo'
    };

    //GET
    const carregarLista = async () => {
        try{
            const res = await fetch(endpoint);

            if(res.ok){
                listaContato.value = await res.json();
                console.log("Sucesso!! GET OK");
            }else   
            console.log("ERRO!! GET NOT OK");

        }catch(error){
            console.error("ERRO:", error)
        }
    };
   
    //POST 
    const addContato = async () => {
       const contato = {
            nome_contato: nome_contato.value,
            telefone: telefone.value,
            endereco: endereco.value,
            status: true as boolean
        };

        try {
            
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(contato)
            });

            if(res.ok){
                nome_contato.value = '';
                telefone.value = '';
                endereco.value = '';

                await carregarLista();

                console.log("Sucesso!!! POST OK")
            }else
                console.log("ERRO!!! POST NOT OK")

        } catch (error) {
            console.error("ERRO:", error);
        }

   };

    //DELETE
    const delContato = async (contato: any) => {
        try {
            if (!contato.status) {
                const res = await fetch(`${endpoint}/${contato.id}`, {
                    method: 'DELETE'
                });

                if (res.ok) {
                    // Atualize a lista de contatos excluindo o contato removido
                    listaContato.value = listaContato.value.filter((c) => c.id !== contato.id);
                    console.log("Sucesso!!! DELETE OK");
                } else {
                    console.log("ERRO!!! DELETE NOT OK");
                }
            }
        } catch (error) {
            console.error("ERRO:", error);
        }
    };

//PATCH
    const attStatus = async (contato:any) => {

        const novoStatus = !contato.status;

        try{
            const res = await fetch(`${endpoint}/${contato.id}`,{
                method:'PATCH',
                headers:{"Content-Type":"application/json"},
                    body: JSON.stringify({status: novoStatus})
                });
                
                if(res.ok){
                    contato.status = novoStatus;
                    console.log("Sucesso!!! PATCH OK");
                }else
                    console.log("ERRO!!! PATCH NOT OK");

        }catch(error){
                console.error("ERRO:", error);
            }
    };
    
    
</script>


<template>
    <div class="container">
        <div class="container-form">
            <h1>A G E N D A</h1>
            <form class="form-input" @submit.prevent="addContato" >
                <label for="nome">Nome </label>
                <input type="text" id="nome" maxlength="20" v-model="nome_contato" >
                
                <label for="telefone">Telefone </label>
                <input type="text" id="telefone" required v-model="telefone" maxlength="15" @input="filtrarNumeros">
                
                <label for="endereco">Endereço </label>
                <input type="text" id="endereco" maxlength="50" v-model="endereco" >
        
                <input type="submit" class="add-btn" value="Salvar" :disabled="telefone === ''">
            </form>
        </div>
        <!--FORM OK-->
        <div  v-for="contato in listaContato" :key="contato.id" class="tabela-contato">
            <div id="ctt-atributos">
                <div>{{ contato.nome_contato }}</div>
                <div>{{ contato.telefone}}</div>
                <div>{{ contato.endereco }}</div>
              
                <div class="ctt-status" :class="{ 'ativo': contato.status, 'inativo': !contato.status }">
                    {{statusText(contato.status)}}</div>
            </div>
            <div id="ctt-bts">
                <button @click="attStatus(contato)" class="att-btn">
                    <img src="\img\refrescar.png" alt="att">
                </button>
                <button @click="delContato(contato)" class="del-btn">
                    <img src="\img\excluir.png" alt="del">
                </button>
            </div>
        </div>
        
    </div>
</template>

<style scoped>  

   .container {
       display: flex;
       justify-content: center;
       align-items: center;
       flex-direction: column;
        /* Isso garante que o conteúdo fique centralizado verticalmente */
       background-color: #f0f0f0;
    }
    .container-form h1{
        font-weight: bold;
        color:white;

    }
    .container-form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgb(3, 36, 65);
        color: rgb(0, 0, 0);
        width: 900px; /* Defina a largura desejada */
        height: 50%; /* Defina a largura desejada */
        font-weight: bold;
        padding: 30px;
        margin:auto;
        margin-bottom: 20px;
    }
    .form-input label {
        margin-right: 10px;
        color:white;

    }
    .form-input input {
        margin-right: 10px;

    }
    .form-input {
        color: rgb(0, 0, 0);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding:10px;
        font-weight: bold;
        
        
    }
    .add-btn:hover{
        background-color: rgb(30, 240, 79);
        color: white;
    }
    .add-btn {
        cursor:pointer;
        color: black;
        background-color: rgb(4, 56, 56);
          border: 1px outset white;
        border-radius: 30px;
        padding:10px;
    }
        /*
        daqui pra cima é o tratamento do formulário
        daqui pra baixo é o tratamento da lista
         */
         .ativo{
            color:rgb(24, 239, 24);
         }
         .inativo{

            color:rgb(248, 67, 67);
         }
    .tabela-contato{
        background-color: rgb(2, 40, 40);
        padding: 20px;
        display:flex;
        color: white;
        border: 1px outset white;
        border-radius: 30px;
        /* margin-top:50px; */
    }
    #ctt-atributos{
        display:flex;
        align-items: center;
        justify-content: center;
    }
    #ctt-atributos div{
     margin-right: 20px;

    }

    #ctt-bts{
        margin-left: 20px;
        
        justify-content: space-between;
    }

    .att-btn{
        color:white;
        border: 1px outset white;
        margin-right: 20px;
        border-radius: 30px;
        padding:10px;
        transition:2s;
        background-color: rgb(22, 22, 148);
    }
    .att-btn:hover{
        cursor:pointer;
        background-color: rgb(69, 69, 207);

    }
    .del-btn{
        color:white;
        border: 1px outset white;
        padding:10px;
        border-radius: 30px;
        background-color: rgb(104, 7, 7);
        transition:2s;
        
    }
    .del-btn:hover{
        cursor:pointer;
        background-color: rgb(221, 47, 47);

    }

    #ctt-bts button img{
        width: 30px;
        height: 30px;
        display:flex;
        justify-content:center;
        align-items: center;
    }
</style>