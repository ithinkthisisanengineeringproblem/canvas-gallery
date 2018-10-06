//initialize websocket with server
const socket = io("http://localhost:80");
socket.on('echo', (data) => {
console.log(data);
});
socket.emit('update', 'hello');
let canvas = document.querySelector("#content").childNodes[1];
let ctx = canvas.getContext('2d');
canvas.onmousedown = (e) => {
	let x = Math.floor((e.pageX - e.currentTarget.offsetLeft)/4)*4;
	let y = Math.floor((e.pageY - e.currentTarget.offsetTop)/4)*4;
	//alert(`mouseX: ${x}, mouseY: ${y}`);
	e.currentTarget.getContext('2d').fillRect(x, y, 4, 4);
};
