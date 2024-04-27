// toggle feature : hamburger
let optionsContainer = document.querySelector(".options_container");
let toolsContainer = document.querySelector(".tools_container");
let optionsFlag = true;
let pencilContainer = document.querySelector(".pencil_container");
let eraserContainer = document.querySelector(".eraser_container");
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let sticky = document.querySelector(".sticky");
let download = document.querySelector(".download");
let upload = document.querySelector(".upload");
let pencilFlag = false;
let eraserFlag = false;

optionsContainer.addEventListener("click", (e) => {
	optionsFlag = !optionsFlag;

	if (optionsFlag) openTools();
	else closeTools();
});

function openTools() {
	let iconElem = optionsContainer.children[0];
	iconElem.classList.remove("fa-times");
	iconElem.classList.add("fa-bars");
	toolsContainer.style.display = "flex";
}

function closeTools() {
	let iconElem = optionsContainer.children[0];
	iconElem.classList.remove("fa-bars");
	iconElem.classList.add("fa-times");
	toolsContainer.style.display = "none";
	pencilContainer.style.display = "none";
	eraserContainer.style.display = "none";
}

pencil.addEventListener("click", (e) => {
	pencilFlag = !pencilFlag;

	if (pencilFlag) pencilContainer.style.display = "block";
	else pencilContainer.style.display = "none";
});

eraser.addEventListener("click", (e) => {
	eraserFlag = !eraserFlag;

	if (eraserFlag) eraserContainer.style.display = "flex";
	else eraserContainer.style.display = "none";
});

upload.addEventListener("click", (e) => {
	// open the files
	let input = document.createElement("input");
	input.setAttribute("type", "file");
	input.click();

	input.addEventListener("change", (e) => {
		let file = input.files[0];
		let url = URL.createObjectURL(file);

		let stickyTemplateHTML = `
			<div class="sticky_header">
					<div class="minimize"><span class="span">-</span></div>
					<div class="remove"><span class="span">x</span></div>
				</div>
				<div class="sticky_note">
					<img src="${url}" />
				</div>
			`;

			createSticky(stickyTemplateHTML);

		document.body.appendChild(stickyContainer);

		let minimize = stickyContainer.querySelector(".minimize");
		let remove = stickyContainer.querySelector(".remove");
		stickyNoteActions(minimize, remove, stickyContainer);

		stickyContainer.onmousedown = function (event) {
			dragAndDrop(stickyContainer, event);
		};

		stickyContainer.ondragstart = function () {
			return false;
		};
	});
});

sticky.addEventListener("click", (e) => {
	let stickyTemplateHTML = `
  <div class="sticky_header">
      <div class="minimize"><span class="span">-</span></div>
      <div class="remove"><span class="span">x</span></div>
    </div>
    <div class="sticky_note">
      <textarea></textarea>
    </div>
  `;

	createSticky(stickyTemplateHTML);

	document.body.appendChild(stickyContainer);

	let minimize = stickyContainer.querySelector(".minimize");
	let remove = stickyContainer.querySelector(".remove");
	stickyNoteActions(minimize, remove, stickyContainer);

	stickyContainer.onmousedown = function (event) {
		dragAndDrop(stickyContainer, event);
	};

	stickyContainer.ondragstart = function () {
		return false;
	};
});

function createSticky(stickyTemplateHTML) {
	let stickyContainer = document.createElement("div");
	stickyContainer.setAttribute("class", "sticky_container");
	stickyContainer.innerHTML = stickyTemplateHTML;
	document.body.appendChild(stickyContainer);

	let minimize = stickyContainer.querySelector(".minimize");
	let remove = stickyContainer.querySelector(".remove");
	stickyNoteActions(minimize, remove, stickyContainer);

	stickyContainer.onmousedown = function (event) {
		dragAndDrop(stickyContainer, event);
	};

	stickyContainer.ondragstart = function () {
		return false;
	};
}

function stickyNoteActions(minimize, remove, stickyContainer) {
	remove.addEventListener("click", (e) => {
		stickyContainer.remove();
	});
	minimize.addEventListener("click", (e) => {
		let stickyNote = stickyContainer.querySelector(".sticky_note");
		let display = getComputedStyle(stickyNote).getPropertyValue("display");
		if (display === "none") stickyNote.style.display = "block";
		else stickyNote.style.display = "none";
	});
}

// Drag and Drop features for sticky notes
function dragAndDrop(element, event) {
	let shiftX = event.clientX - element.getBoundingClientRect().left;
	let shiftY = event.clientY - element.getBoundingClientRect().top;

	element.style.position = "absolute";
	element.style.zIndex = 1000;

	moveAt(event.pageX, event.pageY);

	// moves the element at (pageX, pageY) coordinates
	// taking initial shifts into account
	function moveAt(pageX, pageY) {
		element.style.left = pageX - shiftX + "px";
		element.style.top = pageY - shiftY + "px";
	}

	function onMouseMove(event) {
		moveAt(event.pageX, event.pageY);
	}
	
	// move the element on mousemove
	document.addEventListener("mousemove", onMouseMove);

	// drop the element, remove unneeded handlers
	element.onmouseup = function () {
		document.removeEventListener("mousemove", onMouseMove);
		element.onmouseup = null;
	};
}
