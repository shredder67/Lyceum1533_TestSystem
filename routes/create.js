var express = require('express');
var Post = require('../models/test');
var router = express.Router();


//GET test editor
router.get('/', roleHandler(),(req, res) => {
    res.render('./teacher/create.ejs', {role: req.role});
});

//POST edited test
router.post('/', roleHandler(), (req, res) => {
    Post.create({ //добавление в коллекцию tests нового документа
            name: req.body.name,
            author: req.user.FIO, //тот, что сейчас залогинен
            subject: req.body.subject,
            theme: req.body.theme,
            rate: req.body.rate,
            date: Date.now(),
            questions: req.body.question,
        })
        .then(post => {
            console.log(post.id);
            console.log(req.body.question[0].all_options)
        })
        .catch(err => console.log(err));
    res.redirect('/tests');
});

function roleHandler() {
    return (req,res,next)=>{
        switch (req.role) {
            case 'teacher':
                next();
                break;
            case 'student':
                res.send('КУДА ЭТО ТЫ СОБРАЛСЯ? А НУ ВЕРНИСЬ!');
                break;
        }
    }
}

module.exports = router;