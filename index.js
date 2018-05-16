const app = require('./app');
const database = require('./database');
const config = require('./config');

database()
    .then(info =>{//тот самый объект с инфой
        console.log(`connected to ${info.host}: ${info.port}/${info.name}`);
        app.listen(config.PORT, ()=>{ //слушаем порт только в случае удачного подключения к бд
            console.log("we are listening port:" + config.PORT);
        });
    })
    .catch(()=>{//ловим reject и обрабатываем(нет)
        console.log("couldn't coonect to db");
        process.exit(1);//вырубаем сервер если не получается подключится
    })

