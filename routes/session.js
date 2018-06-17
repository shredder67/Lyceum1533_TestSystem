var express = require('express');
var Post = require('../models/test');
var TestSession = require('../models/test_session');
var router = express.Router();

router.get('/', function(req,res,nex){
    if(req.role == 'teacher')
    {
        TestSession.find({author: req.user.id}, function(err,data){ //ищем сессии, созданные текущим учителем
            if(err){
                console.log(err);
            } else {
                console.log(data);
                res.render('sessions.ejs', {role: req.role, sessions: data});
            }
        });
    }
    if(req.role == 'student'){
        TestSession.find({targets: req.user.group}, function(err, data){//ищем сессии, созданные для текущего ученика
            if(err){
                console.log(err);
            } else{
                console.log(data);
                res.render('sessions.ejs', {role: user.role, sessions: data})
            }
        });
    }
});

router.get('/create',roleHandler(), function(req,res,next){
    if (req.query.test_id.match(/^[0-9a-fA-F]{24}$/)) {
        Post.findById(req.query.test_id, function (err, obj) {
            if(err){
                console.log(err);
                res.send('Ошибка. Попробуйте позже')
            }
            if(!obj){
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
 
router.post('/create', roleHandler(), function(req,res,next){
    TestSession.create({
        name: req.body.name, 
        test_id: req.body.test_id,
        targets: req.body.groups, 
        author: req.user.id,
        date: Date.now(),
    })
    .then(ses => {
        console.log(ses);
        console.log(ses.test_id + '- session has been added to db\n');
    })
    .catch(err => console.log(err));
    res.redirect('/session');
})

function roleHandler() {
    return (req,res,next)=>{
        switch (req.role) {
            case 'teacher':
                next();
                break;
            case 'student':
                res.send('КУДА ЭТО ТЫ СОБРАЛСЯ? А НУ ВЕРНИСЬ!');
                break;
        }
    }
}
module.exports = router;
