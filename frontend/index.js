"use strict";

//initialize websocket with server
const socket = io("http://localhost:3000", {
'origins': '*'
});
socket.on('echo', (data) => {
console.log(data);
});
socket.emit('update', 'hello');
