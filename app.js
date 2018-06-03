//const app = require('./app');
const database = require('./database');
const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan')

const testsRouter = require('./routes/tests');
const testViewRouter = require('./routes/test_view');
const createRouter = require('./routes/create');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', testsRouter);
app.use('/create', createRouter);
app.use('/test_view', testViewRouter);



database()
    .then(info =>{//тот самый объект с инфой
        console.log(`connected to ${info.host}: ${info.port}/${info.name}`);
        app.listen(config.PORT, ()=>{ //слушаем порт только в случае удачного подключения к бд
            console.log("we are listening port:" + config.PORT);
        });
    })
    .catch(err=>{//ловим reject и обрабатываем(нет)
        console.log("couldn't coonect to db\n" + err);
        process.exit(1);//вырубаем сервер если не получается подключится
    })

