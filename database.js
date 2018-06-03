const config = require('./config');
const mongoose = require('mongoose');

module.exports = () =>{
    return new Promise((resolve, reject) =>{
        mongoose.Promise = global.Promise;
        mongoose.set('debug', true);

        mongoose.connection //обработчик соединения
            .on('error', (error) => reject(error))
            .on('close', () => console.log("connection with db was closed!"))
            .once('open', () => resolve(mongoose.connections[0]));//передает объект с информацией о подключенной бд

        mongoose.connect(config.MONGO_URL, {useMongoClient: true});
    });
}