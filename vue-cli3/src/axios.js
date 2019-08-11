import Axios from 'axios'
import store from './store'
import router from './router'

Axios.defaults.baseURL = 'http://localhost:3000';

//request拦截器
Axios.interceptors.request.use(config => {
    //如果token存在，把token携带过去
    if (store.state.token) {
        config.headers.Authorization = `token ${store.state.token}`
    }
    return config;
}, err => {
    return Promise.reject(err.response)
})

//response拦截器
Axios.interceptors.response.use(response => {
    return response;
}, err => {//默认除了2xx之外的错误都会到这里
    console.error(err)
    if (err.response) {
        switch (err.response.status) {
            case 401:
                console.log('还没有登录');
                router.replace({
                    path: 'login',
                    query: { redirect: router.currentRoute.fullPath }
                })
            break;    
        }
    }
    return Promise.reject(err.response);
})

export default Axios;