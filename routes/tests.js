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
                            res.render('index.ejs', {
                                tests: tests
                            });
                        })
                        break;
                    case 'subject':
                        Post.find({
                            subject: req.query.param
                        }).then(tests => {
                            res.render('index.ejs', {
                                tests: tests
                            });
                        })
                        break;
                    case 'rate':
                        Post.find({
                            rate: req.query.param
                        }).then(tests => {
                            res.render('index.ejs', {
                                tests: tests
                            });
                        })
                        break;
                    case 'theme':
                        Post.find({
                            theme: req.query.param
                        }).then(tests => {
                            res.render('index.ejs', {
                                tests: tests
                            });
                        })
                        break;
                    case 'name':
                        Post.find({
                            name: req.query.param
                        }).then(tests => {
                            res.render('index.ejs', {
                                tests: tests
                            });
                        })
                        break;
                    default: //дефолтный вариант - на всякий случай, хотя обработаны все фильтры!
                        Post.find({}).then(tests => {
                            res.render('index.ejs', {
                                tests: tests
                            });
                        })
                }
            } else {
                Post.find({}).then(tests => { //вывод всех тестов, какие есть
                    res.render('index.ejs', {
                        tests: tests
                    });
                })
            }})

            module.exports = router;