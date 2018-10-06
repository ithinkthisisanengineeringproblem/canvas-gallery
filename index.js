let express = require('express');
let app = express(); 
let server = require('http').Server(app);
let io = require('socket.io')(server);
let path = require("path");
let Pixel = require("./src/pixel.js");
let Canvas = require('./src/canvas.js');
let canvas = new Canvas();

server.listen(80);

app.use("/", express.static(path.join(__dirname, "public")));

io.on('connection', (client) => {
	client.emit("clear", canvas.deserialiseCanvas());
	client.on('request', (data) => {
		let properties = Pixel.deserialise(data);
		canvas.setPixel(properties[0], properties[1], properties[2]);
		io.emit("update", data);
	})
})
