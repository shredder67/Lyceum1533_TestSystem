
var express = require('express');
var Post = require('../models/test');
var router = express.Router();


//GET test editor
router.get('/',(req,res)=>{
    res.render('create.ejs');
});

//POST edited test
router.post('/', (req,res)=>{ 
    Post.create({//добавление в коллекцию tests нового документа
        name: req.body.name,
        author: req.body.author,
        subject: req.body.subject,
        theme: req.body.theme,
        rate:req.body.rate,
        date:Date.now(),
        question:req.body.question     
    })
        .then(post => {console.log(post.id); console.log(req.body.question[0].all_options)})
        .catch(err => console.log(err));
    
});

module.exports = router;