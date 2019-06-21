var Client = {};
Client.socket = io.connect();

Client.askNewPlayer = function() {
    Client.socket.emit('newplayer');
};

Client.sendTest = function() {
    Client.socket.emit('test');
};


