const mongoose = require('mongoose');
const shopSchema = mongoose.Schema({
    name: String,//商品名称
    type: Number,//哪种商品
    amount: Number,//所剩产品数量
    location: String,//产品所在商店内的位置
})
shopSchema.methods.end = function () {
    let words = `${this.name}已经没货了`;
    console.log(words);
}
module.exports = mongoose.model('Shop', shopSchema);