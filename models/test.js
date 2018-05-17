const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var post_schema = new Schema({
    name:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    theme:{
        type: String,
        required: true
    },
    rate:{
        type: Number,
        required: true
    },
    date:{
        type: Date
    },
    questions:[Object]//список вопросов
})

module.exports = mongoose.model('test', post_schema);
