const socket = io('http://localhost:8080'); // Connect to the server
let canvas = new Canvas(); // Create a new Canvas object
canvas.attachToDOMCanvas(document.getElementById('mainCanvas')); // Attach the Canvas object to the DOM so that it can draw

let paintColour = 0x000000; // Set the default paint colour

socket.on('update', (data) => { // When we receive an updated pixel from the server
	let properties = Pixel.deserialise(data); // Unpack the data into an array
	canvas.setPixel(...properties); // Set the pixel
}); 

socket.on('clear', (data) => { // When the server sends a whole new canvas
	canvas.deserialiseCanvas(data); // Deserialise and paint the data
});

socket.emit('sync'); // Let the server know that we are ready to receive the canvas

document.getElementById('mainCanvas').onmousedown = (e) => { // When the canvas gets clicked
	let x = Math.floor((e.pageX - e.currentTarget.offsetLeft)/4); // | Get click position
	let y = Math.floor((e.pageY - e.currentTarget.offsetTop)/4); //  |
	socket.emit('request', Pixel.serialise(y, x, paintColour)); // Send our request off to the server
}

let colourList = [0x000000, 0xFFFFFF, 0x00FF00, 0x0000FF, 0xFF0000, 0xFFFF00, 0xFF00FF, 0x00FFFF]; // List of colours avaliable in the colour picker

for (let colour of colourList) { // Make a button for each colour
	let button = document.createElement("button");
	button.className = "pickerButton";                                         // |
	button.style.backgroundColor = "#" + colour.toString(16).padStart(6, "0"); // | Style the buttons
	button.style.border = "none";                                              // |
	button.addEventListener("mousedown", (e) => { // Let the button change the paint colour
		paintColour = colour;
	})
	document.getElementById("controls").appendChild(button); // Add the new button to the DOM
}

document.getElementById("controls").style["max-width"] = colourList.length * 25 + "px"; // | Programmatically style the button parent to fit the button properly
document.getElementById("controls").style["min-width"] = colourList.length * 25 + "px"; // |
