//html - модуль для работы с протоколом html
//url - модуль для работы с url-запросом пользователя
//util - модуль, предоставляюшь множество удобного вспоготельного функционала
//mysql - модуль для работы с базами данных mysql
//fs - модуль для работы с файлами
//debug - модуль для работы с логами (можно поставить winston - более наворочен)
//supervisor - модуль для отладки 

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const Post = require('./models/test'); 

const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));//экспресс будет брать статику из этой дирректории
app.use(
    '/javascripts',
    express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist' 
))
);
//Middleware
app.get('/',(req,res)=>{
    Post.find({}).then(tests => {//вывод всех тестов, какие есть
        res.render('index.ejs',{tests:tests});
    })  
});
app.get('/create',(req,res)=>{
    res.render('create.ejs');
})

app.post('/create', (req,res)=>{ 
    
    Post.create({//добавление в коллекцию tests нового документа
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