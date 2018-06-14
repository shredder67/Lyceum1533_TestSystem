
var express = require('express');
var Post = require('../models/test');
var router = express.Router();


//GET test editor
router.get('/',(req,res)=>{
    res.render('./teacher/create.ejs');
});

//POST edited test
router.post('/', (req,res)=>{
    console.log(req.body); 
    Post.create({//добавление в коллекцию tests нового документа
        name: req.body.name,
        author: req.body.author,
        subject: req.body.subject,
        theme: req.body.theme,
        rate:req.body.rate,
        date:Date.now(),
        question:req.body.question     
    })
        .then(post => {console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');})
        .catch(err => console.log(err));
    res.redirect('/teacher/tests');
});

module.exports = router;