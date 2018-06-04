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
        all_options:[String],
        right_option:String,
<<<<<<< HEAD
        //добавить хранение изображения 
=======
        /*img:{
            data:Buffer,
        }*///добавить хранение изображения 
>>>>>>> 781434048734bc5b82391df1c31ebd05ebcf286b
    }]//список вопросов
})

post_schema.set('toJSON',{//преобразование в json объект
    virtuals: true
})
module.exports = mongoose.model('tests', post_schema);
