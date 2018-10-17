class Canvas {
	constructor() {
		this.init();
	}

	init() {
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

	getPixel(x, y) {
		return this.data[y][x]
	}

	//set the pixel, at xy to newColour
	setPixel(x, y, newColour) {
		let oldColour = this.data[y][x]
		this.data[y][x] = newColour;
		this.redrawCanvas();
		return oldColour
	}

	//convert canvas's pixels to string
	serialiseCanvas() {
		let output = "";
		this.data.forEach((y) => {
			y.forEach((x) => {
				output = output + x.toString(16).padStart(6, "0");
			});
		});
		return output
	}

	
	deserialiseCanvas(input) {
		this.init();
		let shortInput = input;
		console.log(`shortInput length is ${shortInput.length/6}`);
		for(let i = 0; i < 160; i++) {
			for(let j = 0; j < 160; j++) {
				this.data[i][j] = parseInt(shortInput.slice(0, 6), 16);
				shortInput = shortInput.slice(6);
			}
		}
		console.log(`shortInput is ${shortInput}`);
		this.redrawCanvas();
	}

	attachToDOMCanvas(element) {
		if(element.width == 640 && element.height == 640) { 
			this.ctx = element.getContext('2d');
		}
	}

	redrawCanvas() {
		if(typeof this.ctx !== 'undefined') {
			console.log('called');
			if(true) {
				console.log(this.data);
			}
			for(let k = 0; k < 160; k++) {
				for(let j = 0; j < 160; j++) {
					this.ctx.fillStyle = "#" + this.data[j][k].toString(16).padStart(6, "0");
					this.ctx.fillRect(j*4, k*4, 4, 4);
					if(this.ctx.fillStyle == "#ff00ff") {
						console.log("fillStyle is pink");
					}
				}
			}
		}
	}
}

if(typeof module !== 'undefined') {
	module.exports = Canvas;
}
