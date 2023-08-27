<template>

  
        <div>
            <form id="agenda-form" @submit="novoContato">
                <p>ADICIONAR CONTATO</p>
                <div class="input-container">

                    <label for="nome"></label>
                    <input type="text" id="nome" v-model="nome"  maxlength="30" placeholder="Inserir nome">
              
                    <label for="telefone"></label>
                    <input type="text" id="telefone" v-model="telefone" @input="filtarNumeros" maxlength="15" required placeholder="Inserir telefone">
                
                    <label for="endereco"></label>
                    <input type="text" id="endereco" v-model="endereco" maxlength="50"  placeholder="Inserir endereço ">
                    
                    <!-- <label for="status"></label> -->
                    <!-- <select name="status" id="status" v-model="status">
                        <option value="">Ativo</option>
                        <option value="">Inativo</option>
                    </select> -->
                  
                    <input type="submit"  class="add-button" value="Salvar" :disabled="telefone === ''">

                    
                </div>
                 
                <!--

                    <button><img :src="addic" alt="ImagemPerfil"></button>

                -->
            </form>
            
        </div>
        <Mensagem :msg="msg" v-show="msg"/>
   
</template>

<script>
    /* import {mapMutations} from 'vuex' */
     import Mensagem from './Mensagem.vue' 

    export default {
        name: 'AgendaForm', 
        components:{
            Mensagem
        },
        data(){
            return{
                id:null,
                nome:null,
                telefone:null,
                endereco:null,
                status:false,
                msg:""
                /* addic: '/img/adicionar-botao.png' */
            }
        },
        methods: {
           async novoContato(e){

                e.preventDefault();
                const dados = {
                    nome: this.nome,
                    telefone: this.telefone,
                    endereco: this.endereco,
                    status: true
                    /* this.status === "ativo" ? true : false */
                }
               /*  const dadosJson = */

                const req = await fetch("http://localhost:3000/listaContato", 
                    {
                    method: "POST",
                    headers: {"Content-Type":"application/json"},
                    body:  JSON.stringify(dados)
                    }
                );

                const res = await req.json();

                console.log(res)

                //msg do sistema - sucesso
                this.msg = `Contato salvo ! `
                //limpar a msg do sistema
                setTimeout(() => {
                    this.msg=""
                }, 3000);
                

                //zerar campos
                this.nome=""
                this.telefone=""
                this.endereco=""
                /* this.status=false */
            },

            filtarNumeros(){
                this.telefone = this.telefone.replace(/\D/g,'');
            }


        }


    };
</script>

<style>

    .input-container{
        /* background-color: black; */
      /*   border: 1px solid black; */
        align-items: center;
        justify-content: center;
        display: flex;
        flex-direction:row;
        border-radius: 10px; 
    }
    .input-container input{
        border-radius: 10px;
        margin-right: 5px;
        border:1px outset;
    }
 /*    .input-container select{
        border-radius: 10px;
        margin-right: 5px;
        cursor:pointer;
    } */
    /* .input-container button{
        border-radius: 10px;
        margin-left: 5px;
    } */
  
    .add-button {
    width: 10%; /* Defina o tamanho do botão em relação ao contêiner do formulário */
    height: 20px;
    background-color: #229717; /* Cor de fundo do botão */
    color: white; /* Cor do ícone */
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease-in-out;
    border-radius: 10px;
     margin-left: 10px;
     border:1px outset;
}
    .add-button:hover{
        background-color: #30fb1e; /* Cor de fundo do botão */

    }
    p{
        margin-bottom: 10px;
        font-weight: bold;
    }
</style>