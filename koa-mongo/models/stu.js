const mongoose = require('mongoose');
const stuSchema = mongoose.Schema({
    username: {
        require: true,
        type: String
    },
    password: {
        require: true,
        type: String
    },
    uid: {
        type: Number
    }
})
module.exports = mongoose.model('Stu', stuSchema);