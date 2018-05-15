//html - модуль для работы с протоколом html
//url - модуль для работы с url-запросом пользователя
//util - модуль, предоставляюшь множество удобного вспоготельного функционала
//mysql - модуль для работы с базами данных mysql
//fs - модуль для работы с файлами
//debug - модуль для работы с логами (можно поставить winston - более наворочен)
//supervisor - модуль для отладки 

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');


var app = express();
app.use(bodyParser.urlencoded({extended: true}));

//get - запрос на получение данных, post - объект, содержащий данные, созданные пользователем
//set - установка переменных окружения 

app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
    res.render('index');
});
app.get('/create',(req,res)=>{
    res.render('create');
})

app.post('/create', (req,res)=>{
    console.log(req.body);
})

app.listen(config.PORT, ()=>{
    console.log("we are listening port:" + config.PORT);
});
