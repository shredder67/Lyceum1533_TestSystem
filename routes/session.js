var express = require('express');
var Post = require('../models/test');
var TestSession = require('../models/test_session');
var router = express.Router();

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
