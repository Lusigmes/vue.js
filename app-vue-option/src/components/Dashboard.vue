<template>
    <div id="contatos-table"  v-for="contato in listaContato" :key="contato.id" :class="{'ativo': contato.status, 'inativo': !contato.status}">
        <div >
            <div id="contatos-table-head"> 
            <!--     <div class="ordem-id">#:</div> -->
                <div>{{contato.nome}}</div>
                <div>{{contato.telefone}}</div>
                <div>{{ contato.endereco }}</div>
                
            </div>
        </div>
        <div>
            
           <div class="telaStatus"><h2>{{ statusText(contato.status )}}</h2></div>

            <div class="btns">
                <button class="atualizar-contato" @click="atualizarStatus(contato)" >
                    <img :src="att" alt="atualizar" >
                </button>
                <button class="deletar-contato" @click="removerContato(contato)" :disabled="contato.status"><img :src="del" alt="remover">
                
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Dashboard',
        data(){
            return{
                del: '/img/excluir.png',
                att: '/img/refrescar.png',
                listaContato: null,
                contato_id: null
            }
        },
        methods: {
            async getContatos(){
                const req = await fetch("http://localhost:3000/listaContato");
                const data = await req.json();

                this.listaContato = data;
                
              /*   console.log(this.listaContato) */
            
            },
            async atualizarStatus(contato){
                const novoStatus = !contato.status;

                const req = await fetch(`http://localhost:3000/listaContato/${contato.id}`,
                    {
                        method: "PATCH",
                        headers: {"Content-Type":"application/json"},
                        body:  JSON.stringify({status: novoStatus})
                    }
                );

                this.getContatos();
            },
            statusText(status){
                return status ? 'Ativo' : 'Inativo';
            },
            async removerContato(contato){
               if(!contato.status){
                    const req = await fetch(`http://localhost:3000/listaContato/${contato.id}`,
                        {
                            method:"DELETE"
                        });

                        if(req.ok){
                            this.getContatos();
                        }else{
                            alert("Erro ao removercontato.");
                        }
                }else{
                    alert("Impossivel remover! Apenas contatos inativos podem ser removidos.")
                }
            
            },

        },
        mounted(){
            this.getContatos();
        }
    }
</script>

<style scoped>

    #contatos-table{
        /* max-width: 1200px; */
        padding: 10px;
        margin: 0 auto;
        background-color: white;
        display:flex;
        align-items: center;
        justify-content: center;
        border-bottom: 3px outset black ;
        border-right: 3px outset black ;
        font-size:20px;
        height: 60px;
    }
    #contatos-table div{
        display: flex;
        align-items: center;
        justify-content: center;
   /*      flex-direction: column; */
        
    } #contatos-table.ativo {
        background-color: #c7e9c1; /* Cor de fundo para contatos ativos */
    }

    #contatos-table.inativo {
        background-color: #f0c1c1; /* Cor de fundo para contatos inativos */
    }
     .telaStatus{
        border:none;
        
        background-color: none;
        margin-left: 10px;
        padding:15px;
        font-size:15px;
        font-weight: bold;
        cursor:pointer;
        transition:2s;
    } 

    .btns{
        margin-left: 50px;
       
    }
    #contatos-table .atualizar-contato{
        background-color: rgb(12, 12, 116);
    }
    #contatos-table .atualizar-contato:hover{
        background-color: rgb(92, 92, 243);
        
    }

    #contatos-table div button{
        margin-left: 10px;
        color:white;
        border-radius: 20px;
        padding:10px;
        font-size:20px;
        border:none;
        background-color: rgb(132, 11, 11);
        transition:1s;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #contatos-table div button img{
        width:50px;
        height:50px;

    }
    #contatos-table div button:hover{
        color:black;
        background-color: rgb(244, 47, 47);
        cursor:pointer;

    }

    #contatos-table-head{
        padding: 20px;
        display:flex;
    }

    #contatos-table-head div{
        padding: 10px;
        width: 100%;
        border: none;
        border-bottom: 1px outset #111;
        background-color:none;
        padding: 5px;
        /* border-radius: 10px; */
        white-space: nowrap;
        margin-right: 20px;
        font-weight: bold;
    }

</style>
