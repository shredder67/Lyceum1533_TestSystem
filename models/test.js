const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var post_schema = new Schema({//макет теста
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
        type: Number
    },
    question:[{
        question_type: String,
        condition: String,
        all_options:[{
            text:String,
            isRight:Boolean
        }],
        //добавить хранение изображения 
    }] //список вопросов
})

post_schema.set('toJSON',{//преобразование в json объект
    virtuals: true
})
module.exports = mongoose.model('tests', post_schema);
