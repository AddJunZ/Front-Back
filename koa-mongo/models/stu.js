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
    token: {
        type: String
    }
})
module.exports = mongoose.model('Stu', stuSchema);