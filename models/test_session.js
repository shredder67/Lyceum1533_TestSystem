const mongoose = require('mongoose');
const Schema = mongoose.Schema;

testSession_schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    test_id: {
        type: String,
        required: true,
    },
    targets: {
        type: [String],
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    author_name:{
        type: String,
        required: true,
    },
    results:[{
        student_id: {
            type: String,
            required: true,
        },
        date: Number,
        result_id: {
            type: String,
            required: true,
        }
    }],
    date: Number,
});

testSession_schema.set('toJSON', { //преобразование в json объект
    virtuals: true
})
module.exports = mongoose.model('test_sessions', testSession_schema);