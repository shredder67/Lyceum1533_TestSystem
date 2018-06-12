var express = require('express');
var Post = require('../models/test');
var User = require('../models/user');
var bcrypt = require('bcrypt');
var passport = require('passport');

const saltRounds = 10;
var router = express.Router();


router.get('/', (req, res, next) => {
        res.render('entry.ejs', {});
});
router.post('/entry', function(req,res,next){
        req.checkBody('username', 'Вы не ввели логин!').notEmpty();
        req.checkBody('password', 'Вы не ввели пароль!').notEmpty();
        const errors = req.validationErrors();
        if(errors){
                res.render('entry.ejs', {errors: errors});
        }
        passport.authenticate('local', function(err,user,info){
                if(err){
                        console.log('\n SOME ERROR OCCURED WHILE SEARCHING FOR USER \n');
                }
                if(!user){
                        var errs = [{msg: 'Ошибка при вводе логина или пароля, повторите ввод!'}]
                        res.render('entry.ejs', {errors: errs});
                }
        })
});
       
/*bcrypt.hash(smth, saltRounds, function(err, hashed_password){
        //code for macthing password in db with user input
})*/

module.exports = router;