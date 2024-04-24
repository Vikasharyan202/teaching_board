let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mousedown = false;

let myTool = canvas.getContext("2d");

myTool.strokeStyle = "black";
myTool.lineWidth = "3";

// mousedown : start new path, mousemove : fill path
canvas.addEventListener("mousedown", (e) => {
	mousedown = true;
	beginPath({
    x: e.clientX,
    y: e.clientY
  })
});

canvas.addEventListener("mousemove", (e) => {
	if (mousedown) drawStroke({
    x: e.clientX,
    y: e.clientY
  })
});

canvas.addEventListener("mouseup", (e) => {
  mousedown = false;
})

function beginPath(strokeObject) {
  myTool.beginPath();
	myTool.moveTo(strokeObject.x, strokeObject.y);
}

function drawStroke(strokeObject) {
  myTool.lineTo(strokeObject.x, strokeObject.y);
	myTool.stroke();
}