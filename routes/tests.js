var express = require('express');
var Post = require('../models/test');
var User = require('../models/user');
var router = express.Router();


//GET tests list


router.get('/', (req, res, next) => {
    if (req.query.param) {
        switch (req.query.filter) {
            case 'author':
                Post.find({
                    author: req.query.param
                }).then(tests => {
                    res.render('./teacher/index.ejs', {
                        tests: tests,
                        role: req.role
                    });
                })
                break;
            case 'subject':
                Post.find({
                    subject: req.query.param
                }).then(tests => {
                    res.render('./teacher/index.ejs', {
                        tests: tests,
                        role: req.role
                    });
                })
                break;
            case 'rate':
                Post.find({
                    rate: req.query.param
                }).then(tests => {
                    res.render('./teacher/index.ejs', {
                        tests: tests,
                        role: req.role
                    });
                })
                break;
            case 'theme':
                Post.find({
                    theme: req.query.param
                }).then(tests => {
                    res.render('./teacher/index.ejs', {
                        tests: tests,
                        role: req.role
                    });
                })
                break;
            case 'name':
                Post.find({
                    name: req.query.param
                }).then(tests => {
                    res.render('./teacher/index.ejs', {
                        tests: tests,
                        role: req.role
                    });
                })
                break;
            default: //дефолтный вариант - на всякий случай, хотя обработаны все фильтры!
                Post.find({}).then(tests => {
                    res.render('./teacher/index.ejs', {
                        tests: tests,
                        role: req.role
                    });
                })
        }
    } else {
        Post.find({}).then(tests => { 
            console.log(tests);//вывод всех тестов, какие есть
            res.render('./teacher/index.ejs', {
                tests: tests,
                role: req.role
            });
        })
    }
});



module.exports = router;