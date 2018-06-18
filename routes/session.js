var express = require('express');
var Post = require('../models/test');
var TestSession = require('../models/test_session');
var User = require('../models/user');
var router = express.Router();

router.get('/', function (req, res, nex) {
    if (req.role == 'teacher') {
        TestSession.find({
            author: req.user.id
        }, (err, data) => { //ищем сессии, созданные текущим учителем
            if (err) {
                console.log(err);
                res.render(error.ejs, {});
            } else {
                console.log(data);
                res.render('sessions.ejs', {
                    role: req.role,
                    sessions: data,
                });
            }
        });
    }
    if (req.role == 'student') {
        TestSession.find({
            targets: req.user.group
        }, function (err, data) { //ищем сессии, созданные для текущего ученика
            if (err) {
                console.log(err);
                res.render(error.ejs, {});
            } else {
                console.log(data);
                res.render('sessions.ejs', {
                    role: req.role,
                    sessions: data
                })
            }
        });
    }
});

router.get('/create', roleHandler('student'), function (req, res, next) {
    if (req.query.test_id.match(/^[0-9a-fA-F]{24}$/)) {
        Post.findById(req.query.test_id, function (err, obj) {
            if (err) {
                console.log(err);
                res.render(error.ejs, {});
            }
            if (!obj) {
                res.send('Ошибка! Такого теста нет в базе!');
            }
            console.log(obj);
            res.render('./teacher/create_session.ejs', {
                test: obj,
                role: req.role
            })
        });
    }
})

router.post('/create', roleHandler('student'), function (req, res, next) {
    User.findById(req.user.id, (err, obj) => {
        if (err) {
            console.log(err);
            res.render(error.ejs, {});
        } else {
            TestSession.create({
                    name: req.body.name,
                    test_id: req.body.test_id,
                    targets: req.body.groups,
                    author: req.user.id,
                    author_name: obj.FIO,
                    date: Date.now(),
                })
                .then(ses => {
                    console.log(ses);
                    console.log(ses.test_id + '- session has been added to db\n');
                })
                .catch(err => console.log(err));
        }
        res.redirect('/session');
    })
})

router.get('/view', function(req,res,next){
    TestSession.findById(req.query.session_id)
    .populate('results', 'student') 
    .exec(function(err, ses){
        if(err){
            console.log(err);
            res.render(error.ejs, {});
        } 
        console.log(ses);
        res.render('session_view.ejs', {session: ses, role: req.role});
    })  
})

router.get('/test_passage', roleHandler('teacher'), function(req,res,next){
    TestSession.findById(req.query.ses_id)
        .exec(function(err, session){
            res.send('нормально нормально');
        })
})

function roleHandler(sucker) {
    return (req, res, next) => {
        if(req.role == sucker){
            res.send('ВАМ СЮДА НЕЛЬЗЯ, НИ-НИ-НИ');
        } 
        next();
    }
}
module.exports = router;