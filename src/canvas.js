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

	setPixel(x, y, newColour) {
		let oldColour = this.data[y][x]
		this.data[y][x] = newColour;
		this.redrawCanvas();
		return oldColour
	}

	serialiseCanvas() {
		let output = "";
		this.data.forEach((y) => {
			y.forEach((x) => {
				output = output + x.toString(16);
			});
		});
		return output
	}
	deserialiseCanvas(input) {
		this.init();
		let shortInput = input;
		this.data.forEach((y, yIndex) => {
			y.forEach((x, xIndex) => {
				this.data[yIndex][xIndex] = parseInt(input, this.shortInput.substr(0, 6));
				this.shortInput = this.shortInput.substr(0, 6);
			})
		})
		this.redrawCanvas();
	}

	attachToDOMCanvas(element) {
		if(element.width == 640 && element.height == 640) { 
			this.ctx = element.getContext('2d');
		}
	}

	redrawCanvas() {
		if(typeof this.ctx !== 'undefined') {
			this.data.forEach((y, yIndex) => {
				y.forEach((x, xIndex) => {
					this.ctx.fillStyle = "#" + x.toString(16).padStart(6, "0");
					this.ctx.fillRect(xIndex*4, yIndex*4, 4, 4);
				});
			});
		}
	}
}
if(typeof module !== 'undefined') {
	module.exports = Canvas;
}
