$(document).foundation();

this.stage;
var that = this;

// Din A4 == 210 * 297
window.onload = function () {
	/**
	 * Create Canvas
	 */
	console.log(this);

	var width = $("#canvas").width();
	var height = 500;
	this.stage = new Konva.Stage({
		container: 'canvas',
		width: width,
		height: height
	});


	var trackPieces;

	// Get all pieces
	$.getJSON("resources/data/trackpieces.json", function(json) {
		trackPieces = json;

		// create track pieces menu
		for (var i = 0; i < trackPieces.length; i++) {
			createTrackPiece(trackPieces[i]);
		}
	});

};

createTrackPiece = function (trackPiece) {

	var box = document.createElement("div");
	box.className = "primary callout";
	box.onclick = createBox;

	var text = document.createElement("p");
	text.textContent = trackPiece.name;

	box.appendChild(text);

	$("#trackPiecesContainer").append(box);
};


createBox = function() {


	// create an exampleBox
	var layer = new Konva.Layer();
	var rectX = that.stage.getWidth() / 2 - 50;
	var rectY = that.stage.getHeight() / 2 - 25;


	var box = new Konva.Rect({
		x: rectX,
		y: rectY,
		width: 100,
		height: 50,
		fill: '#00D2FF',
		stroke: 'black',
		strokeWidth: 4,
		draggable: true
	});
	// add cursor styling
	box.on('mouseover', function() {
		document.body.style.cursor = 'pointer';
	});
	box.on('mouseout', function() {
		document.body.style.cursor = 'default';
	});
	layer.add(box);
	that.stage.add(layer);
};
