class Canvas {
	constructor() {
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
		redrawCanvas();
	}

	getPixel(x, y) {
		return this.data[y][x]
	}

	setPixels(x, y, newColour) {
		let oldColour = this.data[y][x]
		this.data[y][x] = newColour;
		redrawCanvas();
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
			y.ForEach((x, xIndex) => {
				this.data[yIndex][xIndex] = parseInt(input, shortInput.substr(0, 6));
			})
		})
		this.redrawCanvas();
	}

	attachToDOMCanvas(element) {
		if(element.width == 640 && element.height == 640) }
			this.ctx = element.getContext('2d');
		}
	}

	redrawCanvas() {
		if(this.ctx) {
			this.data.forEach((y, yIndex) => {
				y.forEach((x, xIndex) => {
					this.ctx.fillStyle = "#" + x;
					this.ctx.fillRect(xIndex*4, yIndex*4, 4, 4);
				});
			});
		}
	}
}

module.exports = Canvas;
