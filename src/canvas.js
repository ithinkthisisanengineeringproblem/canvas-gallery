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
		this.data.forEach((y, yIndex) => {
			y.forEach((x, xIndex) => {
				this.data[yIndex][xIndex] = parseInt(shortInput.substr(0, 6), 16);
				//console.log(shortInput.substr(0, 6));
				this.shortInput = shortInput.substr(0, 6);
			})
		})
		console.log("received canvas")
		this.redrawCanvas();
	}

	attachToDOMCanvas(element) {
		if(element.width == 640 && element.height == 640) { 
			this.ctx = element.getContext('2d');
		}
	}

	redrawCanvas() {
		if(typeof this.ctx !== 'undefined') {
			console.log("ctx defined");
			this.data.forEach((y, yIndex) => {
				y.forEach((x, xIndex) => {
					setTimeout(() => {
						//alert("#" + x.toString(16).padStart(6, "0"));
						this.ctx.fillStyle = "#" + x.toString(16);//.padStart(6, "0").toUpperCase();
						//console.log(this.ctx.fillStyle);
						this.ctx.fillRect(xIndex*4, yIndex*4, 4, 4);

					}, xIndex*100);
				});
			});
		} else {
			console.log("ctx undefined");
		}
	}
}
if(typeof module !== 'undefined') {
	module.exports = Canvas;
}
