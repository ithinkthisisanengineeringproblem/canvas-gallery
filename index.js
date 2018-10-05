let app = require('express')();
let server = require('http').Server(app);
let io = require('socket.io')(server);

server.listen(80);

app.get('/', (req, res) => {
	res.sendfile(__dirname + '/frontend/index.html');
});

app.get('/index.js', (req, res) => {
	res.sendfile(__dirname + '/frontend/index.js');
});

io.on('connection', (client) => {
	client.on('update', (data) => {
		client.emit('echo', data);
	})
})
