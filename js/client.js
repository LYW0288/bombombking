var Client = {};
Client.socket = io.connect();

Client.askNewPlayer = function() {
    Client.socket.emit('newplayer');
};

Client.sendTest = function() {
    console.log("send test")
    Client.socket.emit('test');
};


