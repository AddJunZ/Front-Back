import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login'
import Home from './components/Home'
import store from './store'

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
            component:Home,
            meta:{requiresAuth:true}
        }
    ]
})

//路由守卫token
router.beforeEach((to,from,next)=>{
    let token = store.state.token;
    if(to.matched.some(record => record.meta.requiresAuth)){
        //没有token则需要先登录
        if(!token){
            next({
                path:'/login',
                query:{redirect:to.fullPath}// 登录成功之后可以根据query中的内容跳转回原来的路由(页面)
            })
        }else{
            next();
        }
    }else{
        next();
    }
})

export default router;