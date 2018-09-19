"use strict";

//initialize websocket with server
var websock = new WebSocket("ws://path-gos-here", "protocolOne");

var canvas = document.getElementById("mainCanvas").getCanvasContext("2d");

websock.onopen = function (event)	{
	websock.send("some-find-of-id");
};

websock.onmessage = function (event) {
	var x, y, clr = event.data.split(";");
	x = Number(x);
	y = Number(y);

	canvas.fillrect(x, y, 1, 1, clr);
};

