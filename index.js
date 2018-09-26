let server = require('http').createServer();
let io = require('socket.io', {
'origins': "*"
})(server);
io.on('connection', (client) => {
	client.on('update', (data) => {
		client.emit('echo', data);
	})
})
server.listen(3000);
