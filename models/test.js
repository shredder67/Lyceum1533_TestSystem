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
    questions:[{
        question_type: String,
        question_body: Schema.Types.Mixed,
        _id:false, 
    }], 
/*
Тутор по типам вопросов и по тому, что есть внутри

free_input - свободный ввод => quesiton_body: {condition - string, right_answer - string}

multiple_choice - выбор правильных ответов из предложенных вариантов => question_body: {condition - string, options: [{text - string, isRight - bool}]}

range - ввод примерного ответа => question_body: {condition - string, min_value - numb, max_value - numb, right_answer - numb, inaccuracy - numb}

fill_spaces - заполнение пропусков в тексте => question_body: [{text - string, answer - string}] } - последний ответ пустой 

*/
    
})

post_schema.set('toJSON', { //преобразование в json объект
    virtuals: true
})
module.exports = mongoose.model('tests', post_schema);