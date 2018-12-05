const socket = io('http://localhost:8080'); // Connect to the server

let canvas = new Canvas(); // Create a new Canvas object
canvas.attachToDOMCanvas(document.getElementById('mainCanvas')); // Attach the Canvas object to the DOM so that it can draw

let paintColour = 0x000000; // Set the default paint colour
let toolState = 0; // Can either be 0 or 1, 0 being paint tool, 1 being pan mode	
let mouseDown = false;
let lastCoords = [0, 0];
let panning = false;

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
		panning = false;
	} else if (e.button == 0) { //on left click
		if(toolState == 0) { //if drawing
			mouseDown = true; //set mouse down, allows mousemove listner to draw
			panning = false;
		} else { //if panning
			lastCoords = [e.clientX, e.clientY]; //store current coords
			panning = true; //set panning flag true
		}
	}
});

//on mouse up
document.getElementById('mainCanvas').addEventListener("mouseup", (e) => {
	if (panning == true) { //if panning flag is set true
		panning = false;   //set it flase
	}
	mouseDown = false;
})

document.getElementById('mainCanvas').addEventListener('mousemove', (e) => {
	if (panning) { //if panning
		//translate canvas relative to mouse movement
		let dis = [e.clientX - lastCoords[0], e.clientY - lastCoords[1]];
		canvas.translate(...dis);
		lastCoords = [e.clientX, e.clientY]; //restore current coords
	} else {
		if (mouseDown == true) {
			setPixel(e);
		}
	}
});


document.getElementById('mainCanvas').addEventListener('wheel', (e) => {
	//upton upwards scrolling, zoom in (scale up)
	if (e.deltaY < 2) {
		canvas.scale(1.25);
	}
	
	//upton downwards scrolling, zoom out (scale down)
	if (e.deltaY > -2){
		canvas.scale(0.75);
	}
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
