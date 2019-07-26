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
module.exports = db;