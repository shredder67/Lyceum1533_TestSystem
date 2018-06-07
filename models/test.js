const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var post_schema = new Schema({ //макет теста
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    theme: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    date: {
        type: Number
    },
    question: [{
        question_type: String,
        condition: String,
        //добавить хранение изображения 
    }], //список вопросов
    all_options: [{//список ответов
        text:String,//содерждание
        isRight:Boolean,//true - правильный вариант ответа
    }],
})

post_schema.set('toJSON', { //преобразование в json объект
    virtuals: true
})
module.exports = mongoose.model('tests', post_schema);