import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login'
import Home from './components/Home'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path:'/home',
            name:'Home',
            component:Home
        }
    ]
})

//路由守卫token
router.beforeEach((to,from,next)=>{
    next()
})

export default router;