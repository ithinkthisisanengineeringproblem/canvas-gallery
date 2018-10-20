//initialise websocket with server
const socket = io('http://localhost:8080');
//create canvas
let canvas = new Canvas();
//attach canvas to DOM canvas
canvas.attachToDOMCanvas(document.getElementById('mainCanvas'));

let paintColour = 0x000000;

//on update from websocket server
socket.on('update', (data) => { 
	//deserialise data from server
	let properties = Pixel.deserialise(data);
	//log that we are updateing
	console.log('updating');
	//update pixel value specifyed by server
	canvas.setPixel(properties[0], properties[1], properties[2]);
}); 

socket.on('clear', (data) => {
	canvas.deserialiseCanvas(data);
	console.log(data);
	console.log('clearing');
})

socket.emit('sync');

//on click
document.getElementById('mainCanvas').onmousedown = (e) => {
	//get click position
	let x = Math.floor((e.pageX - e.currentTarget.offsetLeft)/4);
	let y = Math.floor((e.pageY - e.currentTarget.offsetTop)/4);
	//send pixel-change data to websocket server 
	socket.emit('request', Pixel.serialise(y, x, paintColour));
}

let colourList = [0x000000, 0xFFFFFF, 0x00FF00, 0x0000FF, 0xFF0000, 0xFFFF00, 0xFF00FF, 0x00FFFF];

for (let colour of colourList) {
	let button = document.createElement("button");
	button.className = "pickerButton";
	button.style.backgroundColor = "#" + colour.toString(16).padStart(6, "0");
	button.style.border = "none";
	button.addEventListener("mousedown", (e) => {
		paintColour = colour;
	})
	document.getElementById("controls").appendChild(button);
}

document.getElementById("controls").style["max-width"] = colourList.length * 25 + "px";
document.getElementById("controls").style["min-width"] = colourList.length * 25 + "px";
