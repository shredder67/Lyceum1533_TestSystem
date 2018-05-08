//html - модуль для работы с протоколом html
//url - модуль для работы с url-запросом пользователя
//util - модуль, предоставляюшь множество удобного вспоготельного функционала
//mysql - модуль для работы с базами данных mysql
//fs - модуль для работы с файлами

var http = require('http');
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
});
 //создание сервера с протоколом http

server.listen(3000, '127.0.0.1');
