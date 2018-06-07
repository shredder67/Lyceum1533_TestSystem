var express = require('express');
var Post = require('../models/test');
var router = express.Router();


//GET tests list


router.get('/', (req, res, next) => {
    if (req.query.param) {
        switch (req.query.filter) {
            case 'author':
                Post.find({
                    author: req.query.param
                }).then(tests => {
                    console.log(tests);
                    res.send(tests);
                })
                break;
            case 'subject':
                Post.find({
                    subject: req.query.param
                }).then(tests => {
                    res.send(tests);
                })
                break;
            case 'rate':
                Post.find({
                    rate: req.query.param
                }).then(tests => {
                    res.send(tests);
                })
                break;
            case 'theme':
                Post.find({
                    theme: req.query.param
                }).then(tests => {
                    res.send(tests);
                })
                break;
            default://дефолтный вариант - если не выбран фильтр, ищем по всем параметрам, складываем получившиеся массивы и возвращаем
                var tests = Post.find({
                        theme: req.query.param
                    }) + Post.find({
                        rate: req.query.param
                    }) +
                    Post.find({
                        subject: req.query.param
                    }) + Post.find({
                        author: req.query.param
                    }) +
                    Post.find({
                        name: req.query.param
                    })
                res.send(tests);
        }
    } else {
        Post.find({}).then(tests => { //вывод всех тестов, какие есть
            res.render('index.ejs', {
                tests: tests
            });
        })
    }

});

module.exports = router;