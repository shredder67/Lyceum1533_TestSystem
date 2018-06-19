var User = require('../models/user');
var Post = require('../models/test');
var TestSession = require('../models/test_session');
var express = require('express');
var mongoose = require('mongoose');



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

router.get('/view', function (req, res, next) {
    TestSession.findById(req.query.session_id)
        .exec(function (err, ses) {
            if (err) {
                console.log(err);
                res.render('./error.ejs', {});
            }
            console.log(ses.results);
            res.render('session_view.ejs', {
                session: ses,
                role: req.role,
                user: req.user
            });
        })
})

router.get('/test_passage', roleHandler('teacher'), function (req, res, next) {
    TestSession.findById(req.query.ses_id)
        .exec((err, sess) => {
            if (err) {
                console.log(err);
                res.render('./error.ejs', {})
            }
            Post.findById(sess.test_id, (err, test) => {
                if (err) {
                    console.log(err);
                    res.render('./error.ejs', {})
                }
                console.log(test.questions);
                res.render('./student/test_passage.ejs', {
                    session_id: sess.id,
                    test: test,
                    role: req.role
                });
            })
        })
})

router.post('/test_passage', roleHandler('teacher'), function (req, res, next) {
    /*  
     *  req.body: { session_id, answers[{id, ans[]}]} - ответы для каждого типа уникальны, free-input - строка, multiple_choice - [строки], fill_spaces - [строки],  range - число 
     */
    console.log(req.body);
    TestSession.findById(req.body.session_id, function (err, sess) {
        if (err) {
            //console.log(err);
            res.render('./error.ejs', {});
        }
        Post.findById(sess.test_id, function (err, test) {
            if (err) {
                consoel.log(err);
                res.render('./error.ejs', {});
            }
            var out = checkAnswers(req.body.answers, test.questions, req.user);
            TestSession.findByIdAndUpdate(req.body.session_id, {
                    $push: {
                        'results': {
                            student: out.student,
                            st_name: out.st_name,
                            st_group: out.st_group,
                            date: Date.now(),
                            outcome: out.outcome,
                        }
                    }
                }, {
                    safe: true,
                    upsert: true,
                    new: true
                },
                function (err, model) {
                    console.log(err);
                })
        })
    })
    res.redirect('/session');
})

function roleHandler(u_t) {
    return (req, res, next) => {
        if (req.role == u_t) {
            res.send('ВАМ СЮДА НЕЛЬЗЯ, НИ-НИ-НИ');
        }
        next();
    }
}

function checkAnswers(user_ans, contr_ans, user) {
    var counter = 0; //подсчет верных ответов
    var abs_counter = 0; //подсчет всех ответов
    var tmp;
    for (var i = 0; i < user_ans.length; i++) {
        for (var j = 0; j < contr_ans.length; j++) {
            if (user_ans[i].id == `${contr_ans[j]._id}`) {
                switch (contr_ans[j].question_type) {
                    case 'free_input':
                        if (user_ans[i].ans == contr_ans[j].question_body.right_answer) {
                            counter++;
                        }
                        abs_counter++;
                        break;
                    case 'multiple_choice':

                        var tmp = multipleChoiceCheck(user_ans[i].ans, contr_ans[j].question_body.options);
                        counter += tmp.c;
                        abs_counter += tmp.ab_c;
                        break;
                    case 'fill_spaces':

                        counter += fillSpacesCheck(user_ans[i].ans, contr_ans[j].question_body);
                        abs_counter += contr_ans[j].question_body.answers.length;
                        break;
                    case 'range':
                        if (user_ans[i].ans >= contr_ans[j].question_body.right_answer - contr_ans[j].question_body.inaccuracy &&
                            user_ans[i].ans <= contr_ans[j].question_body.right_answer + contr_ans[j].question_body.inaccuracy) {
                            counter++;
                        }
                        abs_counter++;
                        break;
                }
            }
        }
    }
    return {
        student: user.id,
        st_name: user.FIO,
        st_group: user.group,
        outcome: {
            done_right: counter / abs_counter,
            user_answers: user_ans,
        }
    }

}


function multipleChoiceCheck(ans, control) {
    var l_counter = 0;
    var l_abs_counter = 0;
    for (var i = 0; i < ans.length; i++) {
        for (var j = 0; j < control.length; j++) {
            if (ans[i] == control[j].text) {
                if (control[j].isRight == 'on') {
                    l_counter++;
                }
                l_abs_counter++;
            }
        }
    }
    return {
        c: l_counter,
        ab_c: l_abs_counter,
    }
}

function fillSpacesCheck(ans, control) {
    var l_counter = 0;
    for (var i = 0; i < ans.length; i++) {
        if (ans[i] == control.answers[i]) {
            l_counter++;
        }
    }
    return l_counter;
}
module.exports = router;