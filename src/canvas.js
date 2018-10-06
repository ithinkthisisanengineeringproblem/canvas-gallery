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
	}

	getPixel(x, y) {
		return this.data[y][x]
	}

	setPixels(x, y, newColour) {
		let oldColour = this.data[y][x]
		this.data[y][x] = newColour;
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
	}
}

module.exports = Canvas;
