const Koa = require('koa');
const Router = require('koa-router');
const db = require('./config/index');
const body = require('koa-better-body');
const cors = require('koa-cors');

const app = new Koa();
const router = new Router();

app.use(cors())
app.use(body());


router.use('/user', require('./routes/user'))
// router.use('/waiter',require('./routes/waiter'))
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
    console.log('监听3000');
})
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        err.status = err.statusCode || err.status || 500;
        throw err;
    }
});