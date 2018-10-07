//initialize websocket with server
const socket = io("http://localhost:80");
let canvas = new Canvas();
canvas.attachToDOMCanvas(document.querySelector("#content").childNodes[1]);
socket.on('update', (data) => {
	let properties = Pixel.deserialise(data);
	console.log("updating");
	canvas.setPixel(properties[0], properties[1], properties[2]);
});
socket.on('clear', (data) => {
	canvas.deserialiseCanvas(data);
	console.log("clearing");
})
socket.emit('sync');
document.querySelector('#content').childNodes[1].onmousedown = (e) => {
	let x = Math.floor((e.pageX - e.currentTarget.offsetLeft)/4);
	let y = Math.floor((e.pageY - e.currentTarget.offsetTop)/4);
	console.log(`mouseX: ${x}, mouseY: ${y}`);
	socket.emit('request', Pixel.serialise(x, y, 0x000000))
};
