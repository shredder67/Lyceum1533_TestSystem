var express = require('express');
var Post = require('../models/test');
var router = express.Router();

router.get('/', (req,res,next)=>{
        res.render('entry.ejs',{}); 
});

module.exports = router;