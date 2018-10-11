//initialize websocket with server
const socket = io('http://localhost:8080');
//create canvas
let canvas = new Canvas();
//attach canvas to DOM canvas
canvas.attachToDOMCanvas(document.getElementById('mainCanvas'));

console.log("***********************\n"
						+document.querySelector("#content")+
						"\n***********************\n");

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
document.querySelector('#content').childNodes[1].onmousedown = (e) => {
	//get click position
	let x = Math.floor((e.pageX - e.currentTarget.offsetLeft)/4);
	let y = Math.floor((e.pageY - e.currentTarget.offsetTop)/4);
	//send pixel-change data to websocket server 
	socket.emit('request', Pixel.serialise(x, y, 0xff00ff))
};
