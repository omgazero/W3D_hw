var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var players = [];
var steps = [];
var playerID = 0;
var start = false;
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('player ' + playerID + ' connected');
  socket.emit('ID', playerID);

  let hue = Math.random();
  players.push({id: playerID, hue:hue});
  steps.push({id: playerID, step: false});

  io.emit('update_status', players);

  ++playerID;

  if(playerID === 4)
    if(start!=true){
      start = !start;
      console.log('game start!');
      io.emit('game_start', start);
    }

  socket.on('step', function(data){
    console.log('player ' + data.id + ' step = ' + data.step);
    let i;
    for (i = 0; i < players.length; i++) {
  	  if (steps[i].id === data.id) break;
  	};
    steps[i].step = data.step;
    io.emit('update_step', steps);
  });
  ///sync
  socket.on ('pos_now', function (data) {
  	socket.broadcast.emit ('pos_now', data);
  });
});

http.listen(3000, function(){
  console.log('listening on :3000');
});
