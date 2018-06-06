const express = require('express');
const database = require('./database');
const config = require('./config');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoStore = require('connect-mongo')(session);   
const path = require('path');   
const createError = require('http-errors');
const logger = require('morgan')

const testsRouter = require('./routes/tests');
const testViewRouter = require('./routes/test_view');
const createRouter = require('./routes/create');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));//логгирование в консоль
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: '0293g;n23410sif-wlh23;h42i2opk234',//ключ для шифрования 
    store: new mongoStore({
        dbPromise: database()
    })
}));
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

//Middleware
app.use('/', testsRouter);
app.use('/create', createRouter);
app.use('/test_view', testViewRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error', {error: err});
  });

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

