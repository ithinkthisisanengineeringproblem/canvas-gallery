const socket = io('http://localhost:8080'); // Connect to the server

let canvas = new Canvas(); // Create a new Canvas object
canvas.attachToDOMCanvas(document.getElementById('mainCanvas')); // Attach the Canvas object to the DOM so that it can draw

let paintColour = 0x000000; // Set the default paint colour
let toolState = 0; // Can either be 0 or 1, 0 being paint tool, 1 being pan and zoom
let mouseDown = false;
let lastCoords = [0, 0];
let moveing = false;

function toolSwitch() {
	if (toolState == 0) {
		toolState = 1;
	} else {
		toolState = 0;
	}
}

function setPixel(e) { // For when something a pixel gets clicked
	let x = Math.floor((e.pageX - e.currentTarget.offsetLeft)/canvas.scaleFactor) - canvas.origin[0] / canvas.scaleFactor; // | Get click position
	let y = Math.floor((e.pageY - e.currentTarget.offsetTop)/canvas.scaleFactor) - canvas.origin[1] / canvas.scaleFactor; //  |
	socket.emit('request', Pixel.serialise(x, y, paintColour)); // Send our request off to the server
}

socket.on('update', (data) => { // When we receive an updated pixel from the server
	let properties = Pixel.deserialise(data); // Unpack the data into an array
	canvas.setPixel(...properties); // Set the pixel
});

socket.on('clear', (data) => { // When the server sends a whole new canvas
	canvas.deserialiseCanvas(data); // Deserialise and paint the data
});

socket.emit('sync'); // Let the server know that we are ready to receive the canvas

//on mouse down
document.getElementById('mainCanvas').addEventListener("mousedown", (e) => {
	if (e.button == 1) { //on middle click (scrollwheel click)
		toolSwitch();	//switch toolState
		moving = false;
	} else if (e.button == 0) { //on left click
		if(toolState == 0) { //if drawing
			setPixel(e); //set pixel
			moving = false;
		} else { //if moving
			lastCoords = [e.pageX - e.currentTarget.offsetLeft, e.pageY - e.currentTarget.offsetTop]; //store current coords
			console.log('should move from' + lastCoords); //debug msg
			moving = true; //set moving flag true
		}
	}
});

//on mouse up
document.getElementById('mainCanvas').addEventListener("mouseup", (e) => {
	if (moving == true) { //if moveing flag is set true
		here = [e.pageX - e.currentTarget.offsetLeft, e.pageY - e.currentTarget.offsetTop]; //get current coords
		dis = [here[0] - lastCoords[0], here[1] - lastCoords[0]]; //get distance between current and last (where mouse was held down)
		canvas.translate(...dis); //translate by this distance (allows user to 'drag' the canvas around)
	}
})

document.getElementById('mainCanvas').addEventListener('wheel', (e) => {
	canvas.scale(Math.floor(e.deltaX)); //TODO: make scale on scroll work
})


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
