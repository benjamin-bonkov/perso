var express = require('express');
var app = express();
 

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à l\'accueil');
});
 
app.get('/sous-sol', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
});

// ":etafenum" => route dynamique, accessible via req.params.etagenum
app.get('/etage/:etagenum/chambre', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    if(!isNaN(req.params.etagenum)){
		// res.end('Vous êtes à la chambre de l\'étage n°' + req.params.etagenum);
		res.render('chambre.ejs', {etage: req.params.etagenum});
    }else{
    	res.send(404, 'Page introuvable !');
    }
});

app.get('/compter/:nombre', function(req, res) {
    var noms = ['Robert', 'Jacques', 'David'];
    res.render('compter.ejs', {compteur: req.params.nombre, noms: noms});
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});
 
app.listen(8080);