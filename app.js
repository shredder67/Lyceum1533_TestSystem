const express = require('express');
const database = require('./database');//обработка подключения к бд
const config = require('./config');//константы для работы приложения
const cookieParser = require('cookie-parser');//обработчик cookie-файлов
const session = require('express-session');//хранение сессий
const bodyParser = require('body-parser');//работа с данными, передаваемые post-запросом 
const mongoStore = require('connect-mongo')(session);
const path = require('path');
const createError = require('http-errors');//для обработки ошибок
const logger = require('morgan')

const testsRouter = require('./routes/tests');
const testViewRouter = require('./routes/test_view');
const createRouter = require('./routes/create');
const entryRouter = require('./routes/entry');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev')); //логгирование в консоль
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(session({
    secret: '0293g;n23410sif-wlh23;h42i2opk234', //ключ для шифрования 
    store: new mongoStore({
        dbPromise: database()
    })
}));
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', entryRouter);

//Middleware for teacher
app.use('/teacher/tests', testsRouter);
app.use('/teacher/create', createRouter);
app.use('/teacher/test_view', testViewRouter);

//Middleware for student
/*
app.use('/student/tests');
app.use('/student/test_view');
app.use('/student/pass_test');
app.use('/student/results');
*/

// catch 404 and forward to error handler

app.use(function(req, res, next) {
    next(createError(404));
  });
  
 /* 
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.render('error');
    res.status(err.status || 500);
  });
*/

database()
    .then(info => { //тот самый объект с инфой
        console.log(`connected to ${info.host}: ${info.port}/${info.name}`);
        app.listen(config.PORT, () => { //слушаем порт только в случае удачного подключения к бд
            console.log("we are listening port:" + config.PORT);
        });
    })
    .catch(err => { //ловим reject и обрабатываем(нет)
        console.log("couldn't coonect to db\n" + err);
        process.exit(1); //вырубаем сервер если не получается подключится
    })