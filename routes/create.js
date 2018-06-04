
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
<<<<<<< HEAD
        .then(post => {console.log(post.id);console.log(req.body)})
=======
        .then(post => {console.log(post.id); console.log(req.body);})
>>>>>>> 781434048734bc5b82391df1c31ebd05ebcf286b
        .catch(err => console.log(err));
    
});


module.exports = router;