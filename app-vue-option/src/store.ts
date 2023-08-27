import { createStore, Store} from 'vuex';


interface State{
    contatos: any[];
}

const store: Store<State> = createStore({
    state(): State{
        return{
            contatos: [],
        };
    },
    mutations:{
        adicionarContato(state: State, contato: any){
            state.contatos.push(contato);
        },
    },
    getters:{
        getContatos(state){
            return state.contatos;
        },
    },
    
});

export default store;