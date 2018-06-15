const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var user_schema = new Schema({
    FIO:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required:true,
    },
    password:{
        type: String,
        required:true,
    },
    user_type:{
        type: String,
        required: true,
    }
})

user_schema.set('toJSON', { //преобразование в json объект
    virtuals: true
})
module.exports = mongoose.model('users', user_schema);