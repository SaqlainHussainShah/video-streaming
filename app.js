var express=require('express');
var app=new express();
var http=require("http").Server(app);
var io=require("socket.io")(http);

var Log=require('log'),
	log=new Log('debug');

var port=process.env.PORT||3000;

app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res){
	res.redirect('index.html');
});

io.on('connection', function(socket){
	socket.on('stream', function(image){
		socket.broadcast.emit('stream', image);
	})
});

http.listen(port,function(){
	log.info("Server running at port ",port);
});