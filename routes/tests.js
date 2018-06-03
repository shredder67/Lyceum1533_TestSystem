var express = require('express');
var Post = require('../models/test');
var router = express.Router();


//GET tests list
router.get('/',(req,res)=>{
    Post.find({}).then(tests => {//вывод всех тестов, какие есть
        res.render('index.ejs',{tests:tests});
    })  
});

module.exports = router;