var shelljs = require('shelljs');
var express = require('express');
var app = express();

var server = app.listen (1337, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log ('server started on http://' + host + ':' + port);
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get ('/api', function (req, res) {

	R = req.query.R;
	C = req.query.C;
	//console.log(req.query);
	//console.log(R);
	string = 'CircleRect.exe ' + R[0][0] + ' '
	 													 + R[0][1] + ' '
														 + R[1][0] + ' '
														 + R[1][1] + ' '
														 + C[0] + ' '
														 + C[1] + ' '
														 + C[2];
	//console.log(string);
	shelljs.exec(string, function(status, output){
		console.log('Exit status:', status);
		console.log('Program output:', output);

		var output = {
        status: status,
        output: output
      };

		res.writeHead(200, {
		  "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type"
	  });

		res.write( JSON.stringify(output) );
	  res.end();
	});
});
