var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var players = [];
var playerID = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('player ' + playerID + ' connected');
  socket.emit('ID', playerID);
  players.push({id: playerID, step: false});

  io.emit('update_status', players);

  ++playerID;

  socket.on('step', function(msg){
    console.log('player ' + msg.id + ' step = ' + msg.step);
    let i;
    for (i = 0; i < players.length; i++) {
  	  if (players[i].id === msg.id) break;
  	};
    players[i].step = msg.step;
    io.emit('update_status', players);
  });
});

http.listen(3000, function(){
  console.log('listening on :3000');
});
