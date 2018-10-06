let canvas = {
	init: function() {
		let newCanvas = [];
		for(let i = 0; i < 640; i++) {
			newCanvas.push([]);
		}
		newCanvas.forEach((e) => {
			for(let j = 0; i< 640; i++) {
				e.push(0xFFFFFF);
			}
		}
		this.data = newCanvas;
		)
	},
	getPixel: function(x, y) {
		return this.data[y][x]
	},
	setPixel: function(x, y, newColour) {
		let oldColour = this.data[y][x]
		this.data[y][x] = newColour;
		return oldColour
	},
	serialiseCanvas: function() {
		let output = "";
		this.data.forEach((y) => {
			y.forEach((x) => {
				output = output + x.toString(16);
			});
		});
		return output
	},
	deserialiseCanvas: function(input) {
		this.init();
		let shortInput = input;
		this.data.forEach((y, yIndex) => {
			y.ForEach((x, xIndex) => {
				this.data[yIndex][xIndex] = parseInt(input, shortInput.substr(0, 6));
			})
		})
	}
}

module.exports = canvas;
