const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/test'

//启动新的字符串解析器   最大连接数
mongoose.connect(DB_URL, { useNewUrlParser: true, poolSize: 4 });
//数据库
const db = mongoose.connection;
db.on('error', () => {
    console.log('数据库打开出错了啦');
})
db.once('open', () => {
    console.log('数据库已经打开了啦');
})
module.exports = db;