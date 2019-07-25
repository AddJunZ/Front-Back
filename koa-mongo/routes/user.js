const Router = require('koa-router')
const router = new Router();
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

//数据库
const db = mongoose.connection;
db.on('error', () => {
    console.log('数据库打开出错了啦');
})
db.once('open', () => {
    console.log('数据库已经打开了啦');
})


//建表
//1. 直接创建表元素的学生角色的数据结构
// const Stu = mongoose.model('Stu', { name: String, age: Number })
//2. 使用Schema，相当于一个模板，属性和行为都会被声明在 schema，对应数据库里的集合吧
const stuSchema = mongoose.Schema({
    name: String,
    age: Number
})
stuSchema.methods.say = function () {
    let words = `大家好我是${this.name}，今年${this.age}岁了`;
    console.log(words);
}
const Stu = mongoose.model('Stu', stuSchema);


router.get('/searchPerson', async ctx => {
    let { id } = ctx.request.query;
    //query对象获得id去搜索数据库
    ctx.body = id;
})

router.all('/addPerson', async ctx => {
    //获取用户数据
    const AddJunZ = new Stu({ name: 'huihui', age: 18 });
    //每个 document 会在调用他的 save 方法后保存到数据库，可直接调用save()，不使用回调函数
    const res = await AddJunZ.save((err, AddJunZ) => {
        if (err) {
            console.log('保存数据库出错了', err);
        }
        AddJunZ.say();
    })
    console.log(res);
    // { _id: 5d38fab9d1ead21ebcf15d5e, name: 'huihui', age: 18, __v: 0 }
    ctx.body = '123';
})
module.exports = router.routes();