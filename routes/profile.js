var express = require('express');
var Post = require('../models/test');
var User = require('../models/user');
var passport = require('passport');

var router = express.Router();


router.get('/', (req, res, next) => {
    res.render('/profile.ejs', {});
})

router.post('/', function (req, res, next) {
    req.logout();
    req.session.destroy();
    res.redirect('/');
})

module.exports = router;