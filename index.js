var app = require('express')();
var http = require('http').Server(app)
var io = require('socket.io')(http)
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg);
      });
});

var port = process.env.PORT || 1337;
http.listen(port, function() {
    console.log("Server running at http://localhost:%d", port);
});