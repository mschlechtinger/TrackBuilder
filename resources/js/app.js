$(document).foundation();

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

/**
 * create trackpieces menu
 * @param trackPiece: current trackpiece from JSON
 */
createTrackPiece = function (trackPiece) {

	// Clickable Box
	var box = document.createElement("div");
	box.className = "primary callout";
	box.onclick = createBox;

	//
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

	var imageObj = new Image();
	imageObj.onload = function() {

		var box = new Konva.Image({
			x: rectX,
			y: rectY,
			image: imageObj,
			draggable: true
		});
		// add cursor styling
		box.on('mouseover', function () {
			document.body.style.cursor = 'pointer';
		});
		box.on('mouseout', function () {
			document.body.style.cursor = 'default';
		});
		layer.add(box);
		that.stage.add(layer);
	};
	imageObj.src = 'resources/images/Pylonentor.svg';
};
