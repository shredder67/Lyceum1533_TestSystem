var express = require('express');
var Post = require('../models/test');
var router = express.Router();


//GET test editor
router.get('/', roleHandler(),(req, res) => {
    res.render('./teacher/create.ejs', {role: req.role});
});

//POST edited test
router.post('/', roleHandler(), (req, res) => {
    var name = req.body.name.replace(/^\s*/,'').replace(/\s*$/,'');
    var theme = req.body.theme.replace(/^\s*/,'').replace(/\s*$/,'');
    Post.create({ //добавление в коллекцию tests нового документа
            name: name,
            author: req.user.FIO, //тот, что сейчас залогинен
            subject: req.body.subject,
            theme: theme,
            rate: req.body.rate,
            date: Date.now(),
            questions: req.body.question,
        })
        .then(post => {
            console.log(post.id + '- test has been added to db\n');
        })
        .catch(err => {console.log(err); res.render(error.ejs, {});});
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