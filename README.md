# canvas-gallery
A group drawing website

## notes

| server | ----- | idk something here? | ------- web sockets ------- [client]



## Single Pixel websocket message format
This uses the socket.io message name "update"

(does not include "")

"pixelX;pixelY;color"


pixelX - X value of pixel
 
pixelY - Y value of pixel 

color - a hexadecimal color string 


eg

"134;15;000087"

"563;412;005faf"

## Full Canvas message format
This uses the socket.io message name "clear"

The actual content sent is just the serialisation of the canvas

## Client Message Format
This uses the socket.io message name "request"
The reason the client has to wait for the server to actually paint the canvas is to allow for a sort of rudimentary rate limiting.
This using the format as the server's update message.
