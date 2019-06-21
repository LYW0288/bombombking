var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

//  Import files from source folder( css, js, assets)
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/lib', express.static(__dirname + '/lib'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/music', express.static(__dirname + '/music'));
app.use('/obj', express.static(__dirname + '/obj'));


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.lastPlayderID = 0;

server.listen(process.env.PORT || 8082, function() {
    console.log('Listening on ' + server.address().port);
});

io.on('connection', function(socket) {
    // Triggered whe new user is in 
    // We can use socket to communicate with clients

    // Add eventlistener to message "newplayer"
    socket.on('newplayer', function() {

    

        // socket.emit is used to trigger the designated function to all connection
        // we can send parameter(the value that getAllPlayers() return) along with message
        socket.emit('allplayers', getAllPlayers());

        // socket.broadcast.emit is used to trigger the designated function to all connection except itself
        socket.broadcast.emit('newplayer', socket.player);

    });

    socket.on('disconnect', function() {
        io.emit('remove', socket.player.id);
    });
})

// Get all the players which are already in the game
// in order to let new player can update old players data
function getAllPlayers() {
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID) {
        var player = io.sockets.connected[socketID].player;
        if (player) players.push(player);
    });
    return players;
}

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}