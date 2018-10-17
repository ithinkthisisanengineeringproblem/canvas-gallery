let Pixel = {
	serialise: function(x, y, colour) {
		return `${x};${y};${colour.toString(16)}`
	},
	deserialise: function(input) {
		let elements = input.split(';');
		elements[0] = parseInt(elements[0], 10);
		elements[1] = parseInt(elements[1], 10);
		elements[2] = parseInt(elements[2], 16);
		return elements
	}
}
if(typeof module !== 'undefined') {
	module.exports = Pixel;
}
