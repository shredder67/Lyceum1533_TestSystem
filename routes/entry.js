var express = require('express');
var Post = require('../models/test');
var User = require('../models/user');
var passport = require('passport');

var router = express.Router();


router.get('/', (req, res, next) => {
        res.render('/entry.ejs', {
                errors: undefined
        });
});

router.post('/', passport.authenticate('local', {
        successRedirect: '/tests',
        failureRedirect: '/'
}))

module.exports = router;