//html - модуль для работы с протоколом html
//url - модуль для работы с url-запросом пользователя
//util - модуль, предоставляюшь множество удобного вспоготельного функционала
//mysql - модуль для работы с базами данных mysql
//fs - модуль для работы с файлами
//debug - модуль для работы с логами (можно поставить winston - более наворочен)
//supervisor - модуль для отладки 

const express = require('express');
const bodyParser = require('body-parser');

const Post = require('./models/test'); 

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

//Middleware
app.get('/',(req,res)=>{
    Post.find({}).then(tests => {
        res.render('index',{tests:tests});
    })  
});
app.get('/create',(req,res)=>{
    res.render('create');
})

app.post('/create', (req,res)=>{ 
    
    Post.create({
        name: req.body.name,
        author: req.body.author,
        subject: req.body.subject,
        theme: req.body.theme,
        rate:req.body.rate,
        date:Date.now()
        //questions:req.body.questions
    })
        .then(post => console.log(post.id))
        .catch(err => console.log(err));
    res.redirect("/");
})

module.exports = app;