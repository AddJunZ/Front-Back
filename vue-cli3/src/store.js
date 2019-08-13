import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //将token放在session中防止
        token: window.sessionStorage.getItem('token'),
        username: window.sessionStorage.getItem('username')
    },
    mutations: {
        login: (state, { username, token }) => {
            state.token = token;
            state.username = username;
            window.sessionStorage.setItem('token', token);
            window.sessionStorage.setItem('username', username);
        },
        logout: (state) => {
            state.token = null;
            window.sessionStorage.removeItem('token');
        }
    },
    actions: {
        login:({commit},data)=>{
            commit('login',data)
        }
    }
})