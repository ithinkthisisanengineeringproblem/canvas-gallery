# canvas-gallery
___A group drawing website.___

## Architecture
```
|--------|      regular
| server | ---- webpage ----> | client |
|--------|                        ^
    ^                             |
     \________ websockets _______/
```


## Single pixel websocket message format
This uses the socket.io message name "update"

(does not include "")

"pixelX;pixelY;color"


pixelX - X value of pixel
 
pixelY - Y value of pixel 

color - a hexadecimal color string 


eg

"134;15;000087"

"563;412;005faf"

## Full canvas message format
This uses the socket.io message name "clear"

The actual content sent is just the serialisation of the canvas

## Client message Format
This uses the socket.io message name "request"
The reason the client has to wait for the server to actually paint the canvas is to allow for a sort of rudimentary rate limiting.
This using the format as the server's update message.

## Client full canvas
The client can request the full canvas by using the message name 'sync'
