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

//const tableOfTest;//чтение тестов из бд
var app = express();
app.use(bodyParser.urlencoded({extended: true}));

//get - запрос на получение данных, post - объект, содержащий данные, созданные пользователем
//set - установка переменных окружения 

app.set('view engine', 'ejs');

app.get('/',(req,res)=>{//вывод таблицы тестов из базы
    res.render('index');
});
app.get('/create',(req,res)=>{//рендер редактор тестирования
    res.render('create');
})

app.post('/create', (req,res)=>{ //добавление теста в базу
    console.log(req.body);
    res.end();
})

app.listen(config.PORT, ()=>{
    console.log("we are listening port:" + config.PORT);
});
