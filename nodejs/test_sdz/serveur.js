var http = require('http');
var url = require('url');
var querystring = require('querystring');
var EventEmitter = require('events').EventEmitter;
var testmodule = require('testmodule'); // Fait appel à testmodule.js (sous-dossier node_modules)
 
var server = http.createServer(function(req, res) {
	res.writeHead(200, {"Content-Type": "text/html"});
    var page = url.parse(req.url).pathname;
    console.log(page);
    var params = querystring.parse(url.parse(req.url).query);
    console.log(params);
    switch(page){
    	case  '/':
	        res.write('Vous êtes à l\'accueil, que puis-je pour vous ? <br>');
	        if ('prenom' in params && 'nom' in params) {
	        	res.write('Vous vous appelez ' + params['prenom'] + ' ' + params['nom']);
	        }
	    break;
	    case '/sous-sol' :
	        res.write('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
	    break;
	    case '/etage/1/chambre' :
	        res.write('Hé ho, c\'est privé ici ! <br>');
	    break;
	    case '/gameover' :
	        res.write('perdu <br>');
			jeu.emit('gameover', 'Vous avez perdu !');
	    break;
	    case '/testmodule' :
	    	res.write("test module<br>");
	    		res.write(testmodule.publicfunction());
	    break;
	    default :
			res.writeHead(404, {"Content-Type": "text/html"});
			res.write("404 not found")
	    break;
	}
	res.end();
});


var jeu = new EventEmitter();
jeu.on('gameover', function(message){
    console.log(message);
});

server.listen(8080);