var express = require('express');
var app = express();
var fs = require('fs');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

var size = 0;

app.get('/', function(req, res) {
    var watcher = fs.watchFile('log.txt', function(event, filename){
        size = filename.size;
    });
    fs.readFile('log.txt', 'utf8', function (err,data){
        res.render('index.ejs', {data: data});
        size = data.length;
    });

});

app.get('/ajax/write/:text', function(req, res) {
    var log = fs.createWriteStream('log.txt', {'flags': 'a'});
    // use {'flags': 'a'} to append and {'flags': 'w'} to erase and write a new file
    log.write(req.params.text);
    size += req.params.text.length;
    // console.log(size);
});

app.get('/ajax/read/:start', function(req, res) {
    fs.readFile('log.txt', 'utf8', function (err,data){
        console.log(req.params.start);
        res.render('rep.ejs', {data: data.slice(req.params.start, size)});
    });
});

// app.use(function(req, res, next){
//     res.setHeader('Content-Type', 'text/plain');
//     res.send(404, 'Page introuvable !');
// });
 
app.listen(8080);