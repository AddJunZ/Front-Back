const Router = require('koa-router')
const router = new Router()
const Stu = require('../models/stu')


router.get('/searchPerson', async ctx => {
    let { id } = ctx.request.query;
    //query对象获得id去搜索数据库
    ctx.body = id;
})


//登录接口
router.post('/login', async ctx => {
    console.log(ctx.request.query);
    ctx.body = ctx.request.query;
})



//注册接口
router.post('/regist', async ctx => {
    let { username, password } = ctx.request.fields;
    const student = new Stu({ username: username, password: password });
    const res = await student.save()
    console.log('外部', res);
    ctx.body = res;
})
module.exports = router.routes();