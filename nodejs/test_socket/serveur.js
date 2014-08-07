var http    =   require('http');
var fs      =   require('fs');

// Creation du serveur
var app = http.createServer(function (req, res) {
    // On lit notre fichier app.html
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.end(content);
    });
});


var io = require('socket.io');

io = io.listen(app);

io.sockets.on('connection', function (socket) {
    // On donne la liste des messages (evenement cree du cote client)
    socket.emit('recupererMessages', messages);
    // Quand on recoit un nouveau message
    socket.on('nouveauMessage', function (mess) {
        // On l'ajout au tableau (variable globale commune a tous les clients connectes au serveur)
        messages.push(mess);
        // On envoie a tout les clients connectes (sauf celui qui a appelle l'evenement) le nouveau message
        socket.broadcast.emit('recupererNouveauMessage', mess);
    });
});

app.listen(8080);
