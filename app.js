const express = require('express');
const database = require('./database');//обработка подключения к бд
const config = require('./config');//константы для работы приложения

const session = require('express-session');//хранение сессий
const bodyParser = require('body-parser');//работа с данными, передаваемые post-запросом 
const mongoStore = require('connect-mongo')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');


const path = require('path');
const createError = require('http-errors');//для обработки ошибок
const logger = require('morgan')
var expressValidator = require('express-validator');

const testsRouter = require('./routes/tests');
const testViewRouter = require('./routes/test_view');
const createRouter = require('./routes/create');
const entryRouter = require('./routes/entry');
const profileRouter = require('./routes/profile');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(expressValidator()) //логгирование в консоль
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(session({
    secret: '0293g;n23410sif-wlh23;h42i2opk234', //ключ для шифрования 
    store: new mongoStore({
        dbPromise: database(),
    }),
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(function(username, password, done){
    User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (password!= user.password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    });
}))

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', entryRouter);

app.use('/tests', testsRouter);
app.use('/entry', entryRouter);
app.use('/create', createRouter);
app.use('/test_view', testViewRouter);
app.use('/profile', profileRouter);

//Middleware for student
/*
app.use('/student/tests');
app.use('/student/test_view');
app.use('/student/pass_test');
app.use('/student/results');
*/

// catch 404 and forward to error handler
/*
app.use(function(req, res, next) {
    next(createError(404));
  });

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