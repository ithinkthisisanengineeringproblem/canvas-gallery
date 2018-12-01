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
		this.updated = true;
		this.redrawCanvas();
	}

	getPixel(x, y) { // Because y is stored first in the actually data this makes retrieving pixels easier
		return this.data[y][x]
	}

	setPixel(x, y, newColour) { // Set a pixel to newColour
			if(x > -1 && x < 160 && y > -1 && y < 160) {
				let oldColour = this.data[y][x]
				this.data[y][x] = newColour;
<<<<<<< Updated upstream
				this.updated = true;
=======
>>>>>>> Stashed changes
				this.redrawCanvas();
			return oldColour
		}
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
		this.updated = true;
		this.redrawCanvas();
	}

	attachToDOMCanvas(element) { // Attach to a <canvas> element so that the data can be displayed visually
		if(element.width == 640 && element.height == 640) { 
			this.ctx = element.getContext('2d');
			this.scaleFactor = 4;
			this.origin = [0, 0];
			this.ctx.scale(4, 4);
			this.ctx.imageSmoothingEnabled = false;
		}
	}

	redrawCanvas() { // Draw data to a <canvas> element
		if(typeof this.ctx !== 'undefined') {
			if(this.updated) {
				this.convertCanvasToByteArray();
			}
			createImageBitmap(this.cachedImageData, 0, 0, 160, 160, {resizeQuality: "high"}).then((image) => {
				this.ctx.drawImage(image, 0, 0, 160, 160);
			})
			this.ctx.fillStyle = "#F0F";
			this.ctx.fillRect(-50, -50, 50, 260);
			this.ctx.fillRect(160, -50, 50, 260);
			this.ctx.fillRect(0, 160, 160, 50);
			this.ctx.fillRect(0, -50, 160, 50);
		}
	}

	scale(factor) {
		if(this.scaleFactor * factor >= 4) {
			this.scaleFactor = this.scaleFactor * factor;
			this.ctx.scale(factor, factor);
		} else {
			this.ctx.scale(4/this.scaleFactor, 4/this.scaleFactor);
			this.scaleFactor = 4;
		}
		this.translate(0, 0, this.scaleFactor);
		this.redrawCanvas();
	}

	translate(x, y) {
		this.setOrigin(...this.limitXY(this.origin[0] + x, this.origin[1] + y, this.viewportSize()));
		this.redrawCanvas();
	}

	setOrigin(x, y, draw) {
		this.ctx.setTransform(this.scaleFactor, 0, 0, this.scaleFactor, x, y);
		this.origin = [x, y];
		if(draw) {
			this.redrawCanvas();
		}
	}
	
	limitXY(x, y, size) { // TODO: Make this function work with non-square boxes
		let coords = [0, 0]; // x then y
		if(x + size > 210) {
			coords[0] = 210 - size;
		} else if(x < -50) {
			coords[0] = -50;
		} else {
			coords[0] = x;
		}

		if(y + size > 210) {
			coords[1] = 210 - size;
		} else if(y < -50) {
			coords[1] = -50;
		} else {
			coords[1] = y;
		}
		return coords
	}

	viewportSize() { // It's important to note that this the viewport size in relation to standard scale (4x). This means that a scaleFactor being 8 makes the viewport size 80.
		return 160 * 4 / this.scaleFactor // The four is in there because the canvas starts off scaled.
	}

	convertCanvasToByteArray() {
		let bytes = this.data.map((row) => {
			return row.map((colour) => {
				return [(colour & 0xFF0000) >>> 16, (colour & 0x00FF00) >> 8, (colour & 0x0000FF), 0xFF];
			})
		})
		bytes = bytes.flat(2);
		this.cachedBytes = Uint8ClampedArray.of(...bytes);
		this.cachedImageData = new ImageData(this.cachedBytes, 160, 160);
		this.updated = false;
		return this.cachedBytes
	}
}

if(typeof module !== 'undefined') { // Boiler plate to make this work in nodejs and the browser
	module.exports = Canvas;
}
