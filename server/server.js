//html - модуль для работы с протоколом html
//url - модуль для работы с url-запросом пользователя
//util - модуль, предоставляюшь множество удобного вспоготельного функционала
//mysql - модуль для работы с базами данных mysql
//fs - модуль для работы с файлами
//debug - модуль для работы с логами (можно поставить winston - более наворочен)

var sql = require('mysql');
var http = require('http');
var mysql = require('mysql');
var url = require('url');


var server = new http.Server(function(req, res){
  console.log(req.method, req.url );

  var urlParsed = url.parse(req.url, true);
  console.log(urlParsed);

  if(urlParsed.pathname == '/echo' && urlParsed.query.message){
    res.end(`${urlParsed.query.message}`);
  } else {
    res.statusCode = 404;
    res.end('Page not found');
  }
});//создание сервера с протоколом http


var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'123456',
  database: 'mydb'
});

connection.connect(function(err,args){
  if(err)
  {
    console.log(err);//ошибка при состыковке протоколов !!!
  } else{
    console.log('success');
  }
}); 
connection.query('INSERT INTO `authors` VALUES (`Иванов`, `18.01.2018`, `1`); INSERT INTO `tests` VALUES (`Контрольная`,`Математика`)', function(err, results, fields){
  if(err){
    console.log(err);
  }
})
connection.query('SELECT * FROM `authors` INNER JOIN `tests`',function(err, results, fields){
  if(err){
    console.log(err);
  }else{
    console.log(results);
  }
})
 
server.listen(3000, '127.0.0.1');
