var express = require('express');
var passport = require('passport');

var router = express.Router();


router.get('/', (req, res, next) => {
        if(req.isUnauthenticated()){
                res.render('./entry.ejs', {
                        errors: undefined
                });
        } else{
                res.redirect('/tests');
        }
});

router.post('/', passport.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/'
}))

module.exports = router;