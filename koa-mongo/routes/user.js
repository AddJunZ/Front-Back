const Router = require('koa-router')
const router = new Router()
const Stu = require('../models/stu')
const { createToken, checkToken } = require('../utils/token')


router.get('/searchPerson', async ctx => {
    let { id } = ctx.request.query;
    //query对象获得id去搜索数据库
    ctx.body = id;
})


//登录接口
router.post('/login', async ctx => {
    let { username, password } = ctx.request.fields;
    let doc = await findUser(username);
    //用户不存在
    if (!doc) {
        ctx.status = 200;
        ctx.body = {
            code: 1,
            msg: '用户不存在'
        }
    } else {
        if (password == doc.password) {
            ctx.status = 200;
            // 这里需要返回一个token，还要把token存在数据库里？
            let token = createToken(username)
            doc.token = token;
            // 保存token到数据库
            await new Promise((resolve,reject)=>{
                doc.save(err=>{
                    if(err){
                        reject();
                    }else{
                        resolve();
                    }
                })
            })
            ctx.body = {
                code: 0,
                msg: '登录成功',
                token
            }
        } else {
            ctx.status = 200;
            ctx.body = {
                code: 1,
                msg: '密码错误'
            }
        }
    }
})


//找某个用户是否存在
const findUser = (username) => {
    return new Promise((resolve, reject) => {
        Stu.findOne({ username }, (err, doc) => {
            if (err) {
                reject(err);
            }
            resolve(doc);
        });
    });
};


//注册接口
router.post('/regist',async ctx => {
    console.log('后台注册接口');
    let { username, password } = ctx.request.fields;
    // 这是直接新建实例的doc，或者是新建实例后用.语法，再调用save
    const student = new Stu({ username: username, password: password });
    //数据库中的doc
    let doc = await findUser(username);
    if (doc) {
        console.log('用户名已经存在');
        ctx.status = 200;
        ctx.body = {
            code: 1,
            msg: '用户名已经存在'
        }
    } else {
        await new Promise((resolve, reject) => {
            student.save(err => {
                if (err) {
                    reject(err)
                }
                resolve()
            })
        })
        console.log('注册成功');
        ctx.status = 200;
        ctx.body = {
            code: 0,
            msg: '注册成功'
        }
    }

})
module.exports = router.routes();