let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pencilColor = document.querySelectorAll(".pencil_color");
let pencilWidthElem = document.querySelector(".pencil_width");
let eraserWidthElem = document.querySelector(".eraser_width");
let undo = document.querySelector(".undo");
let redo = document.querySelector(".redo");

let penColor = "black";
let eraserColor = "white";
let penWidth = pencilWidthElem.value;
let eraserWidth = eraserWidthElem.value;

let undoRedotracker = [];
let track = 0;

let mousedown = false;

let myTool = canvas.getContext("2d");

myTool.strokeStyle = "black";
myTool.lineWidth = "3";

// mousedown : start new path, mousemove : fill path
canvas.addEventListener("mousedown", (e) => {
	mousedown = true;
	let data = {
		x: e.clientX,
		y: e.clientY,
	};
	// data send to server
	socket.emit("beginPath", data);
});

canvas.addEventListener("mousemove", (e) => {
	if (mousedown) {
		let data = {
			x: e.clientX,
			y: e.clientY,
			color: eraserFlag ? eraserColor : penColor,
			width: eraserFlag ? eraserWidth : penWidth,
		};
		socket.emit("drawStroke", data);
	}
});

canvas.addEventListener("mouseup", (e) => {
	mousedown = false;

	let url = canvas.toDataURL();
	undoRedotracker.push(url);
	track = undoRedotracker.length - 1;
});
undo.addEventListener("click", (e) => {
	if (track > 0) track--;

	let data = {
		trackValue: track,
		undoRedotracker,
	};
	socket.emit("redoUndo", data);
});
redo.addEventListener("click", (e) => {
	if (track < undoRedotracker.length - 1) track++;

	let data = {
		trackValue: track,
		undoRedotracker,
	};
	socket.emit("redoUndo", data);
});

function undoRedoCanvas(trackObj) {
	track = trackObj.trackValue;
	undoRedotracker = trackObj.undoRedotracker;

	let url = undoRedotracker[track];
	let img = new Image();
	img.src = url;
	img.onload = (e) => {
		myTool.drawImage(img, 0, 0, canvas.width, canvas.height);
	};
}

function beginPath(strokeObject) {
	myTool.beginPath();
	myTool.moveTo(strokeObject.x, strokeObject.y);
}

function drawStroke(strokeObject) {
	myTool.strokeStyle = strokeObject.color;
	myTool.lineWidth = strokeObject.width;
	myTool.lineTo(strokeObject.x, strokeObject.y);
	myTool.stroke();
}

pencilColor.forEach((coloeElem) => {
	coloeElem.addEventListener("click", (e) => {
		let color = coloeElem.classList[0];
		penColor = color;
		myTool.strokeStyle = penColor;
	});
});
pencilWidthElem.addEventListener("change", (e) => {
	penWidth = pencilWidthElem.value;
	myTool.lineWidth = penWidth;
});
eraserWidthElem.addEventListener("change", (e) => {
	eraserWidth = eraserWidthElem.value;
	myTool.lineWidth = eraserWidth;
});
eraser.addEventListener("click", (e) => {
	if (eraserFlag) {
		myTool.strokeStyle = eraserColor;
		myTool.lineWidth = eraserWidth;
	} else {
		myTool.strokeStyle = penColor;
		myTool.lineWidth = penWidth;
	}
});

download.addEventListener("click", (e) => {
	let url = canvas.toDataURL();

	let a = document.createElement("a");
	a.href = url;
	a.download = "canvas.jpg";
	a.click();
});

socket.on("beginPath", (data) => {
	// data received from server
	beginPath(data);
});
socket.on("drawStroke", (data) => {
	drawStroke(data);
});
socket.on("redoUndo", (data) => {
	undoRedoCanvas(data);
});
