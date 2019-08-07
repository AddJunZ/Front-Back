import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        //将token放在session中防止
        token:window.sessionStorage.getItem('token'),
    },
    mutations:{
        
    },
    actions:{
        
    }
})