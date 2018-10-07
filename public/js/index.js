//initialize websocket with server
const socket = io("http://localhost:80");
socket.on('echo', (data) => {
console.log(data);
});
socket.emit('update', 'hello');
let canvas = new Canvas();
canvas.attachToDOMCanvas(document.querySelector("#content").childNodes[1]);
console.log("Canvas attached");
document.querySelector('#content').childNodes[1].onmousedown = (e) => {
	let x = Math.floor((e.pageX - e.currentTarget.offsetLeft)/4);
	let y = Math.floor((e.pageY - e.currentTarget.offsetTop)/4);
	console.log(`mouseX: ${x}, mouseY: ${y}`);
	canvas.setPixel(x, y, 0x000000);
};
