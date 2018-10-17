let express = require('express');
let app = express(); 
let server = require('http').Server(app);
let io = require('socket.io')(server);
let path = require("path");
let Pixel = require("./src/pixel.js");
let Canvas = require('./src/canvas.js');
let canvas = new Canvas();

server.listen(8080);

//setup express app
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/js", express.static(path.join(__dirname, "public/js")));
app.use("/css", express.static(path.join(__dirname, "public/css")));
app.use("/modules", express.static(path.join(__dirname, "src")));

//websocket server:
io.on('connection', (client) => {
	//when client sends request
	client.on('request', (data) => {
		//deserialise data sent from client
		let properties = Pixel.deserialise(data);
		//update the canvas's pixel values
		canvas.setPixel(properties[0], properties[1], properties[2]);
		//send update ?
		io.emit("update", data);
	})
	client.on('sync', () => {
		debugger;
		//console.log(canvas.serialiseCanvas());
		client.emit("clear", canvas.serialiseCanvas());
	})
})
