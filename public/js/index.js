"use strict";

//initialize websocket with server
const socket = io("http://localhost:80");
socket.on('echo', (data) => {
console.log(data);
});
socket.emit('update', 'hello');
