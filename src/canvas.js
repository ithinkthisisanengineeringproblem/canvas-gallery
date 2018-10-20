class Canvas {
	constructor() {
		this.init();
	}

	init() { // Make the whole canvas white
		let newCanvas = [];
		for(let i = 0; i < 160; i++) {
			newCanvas.push([]);
		}
		newCanvas.forEach((e) => {
			for(let j = 0; j < 160; j++) {
				e.push(0xFFFFFF);
			}
		});
		this.data = newCanvas;
		this.redrawCanvas();
	}

	getPixel(x, y) { // Because y is stored first in the actually data this makes retrieving pixels easier
		return this.data[y][x]
	}

	setPixel(x, y, newColour) { // Set a pixel to newColour
		let oldColour = this.data[y][x]
		this.data[y][x] = newColour;
		this.redrawCanvas();
		return oldColour
	}

	serialiseCanvas() { // Convert canvas's pixels to string
		let output = "";
		this.data.forEach((y) => {
			y.forEach((x) => {
				output = output + x.toString(16).padStart(6, "0");
			});
		});
		return output
	}

	
	deserialiseCanvas(input) { // Read in a serialised string of canvas pixels and draw them to the canvas
		this.init();
		let shortInput = input;
		for(let i = 0; i < 160; i++) {
			for(let j = 0; j < 160; j++) {
				this.data[i][j] = parseInt(shortInput.slice(0, 6), 16);
				shortInput = shortInput.slice(6);
			}
		}
		this.redrawCanvas();
	}

	attachToDOMCanvas(element) { // Attach to a <canvas> element so that the data can be displayed visually
		if(element.width == 640 && element.height == 640) { 
			this.ctx = element.getContext('2d');
		}
	}

	redrawCanvas() { // Draw data to a <canvas> element
		if(typeof this.ctx !== 'undefined') {
			for(let k = 0; k < 160; k++) {
				for(let j = 0; j < 160; j++) {
					this.ctx.fillStyle = "#" + this.data[j][k].toString(16).padStart(6, "0");
					this.ctx.fillRect(j*4, k*4, 4, 4);
				}
			}
		}
	}
}

if(typeof module !== 'undefined') { // Boiler plate to make this work in nodejs and the browser
	module.exports = Canvas;
}
