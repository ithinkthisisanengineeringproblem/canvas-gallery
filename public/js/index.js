//initialize websocket with server
const socket = io("http://localhost:80");
socket.on('echo', (data) => {
console.log(data);
});
socket.emit('update', 'hello');
let canvas = document.querySelector("#content").childNodes[1];
let ctx = canvas.getContext('2d');
canvas.onmousedown = (e) => {
	let x = e.pageX - e.currentTarget.offsetLeft;
	let y = e.pageY - e.currentTarget.offsetTop;
	//alert(`mouseX: ${x}, mouseY: ${y}`);
	e.currentTarget.getContext('2d').fillRect(x, y, 2, 2);
};
