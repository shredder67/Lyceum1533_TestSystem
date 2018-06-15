var express = require('express');
var Post = require('../models/test');
var User = require('../models/user');
var passport = require('passport');

var router = express.Router();


router.get('/', (req, res, next) => {
        res.render('./profile.ejs', {user: req.user, role: req.role});
})

router.post('/', function (req, res, next) {
    req.logout();
    req.session.destroy(() => {
        res.clearCookie('connect.sid'); // удаление куки у пользователя 
        res.redirect('/'); //перенаправление на вход в систему
    })
})

module.exports = router;