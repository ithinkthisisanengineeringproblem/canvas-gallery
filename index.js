let express = require('express');
let app = express(); 
let server = require('http').Server(app);
let io = require('socket.io')(server);
let path = require("path");
let Pixel = require("./src/pixel.js");
let Canvas = require('./src/canvas.js');
let canvas = new Canvas();

server.listen(8080);

// Setup static file serving
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/js", express.static(path.join(__dirname, "public/js")));
app.use("/css", express.static(path.join(__dirname, "public/css")));
app.use("/modules", express.static(path.join(__dirname, "src")));

io.on('connection', (client) => { // When a client connects (ie. someone loads the webpage)
	client.on('request', (data) => { // When client sends request to update a pixel
		let properties = Pixel.deserialise(data); // Deserialise data sent from client
		canvas.setPixel(...properties); // Update the canvas's pixel values
		io.emit("update", data); // Send update to other clients 
	})
	client.on('sync', () => { // Because you can't just send this as soon as the client connects (they won't be ready) we use to 'sync' event to show that we are
		client.emit("clear", canvas.serialiseCanvas()); // Currently the clear event is only used for this, however, you could use it if you wanted to reset the canvas
	})
})
