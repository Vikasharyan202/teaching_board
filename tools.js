// toggle feature : hamburger
let optionsContainer = document.querySelector('.options_container');
let toolsContainer = document.querySelector('.tools_container');
let optionsFlag = true;
let pencilContainer = document.querySelector('.pencil_container');
let eraserContainer = document.querySelector('.eraser_container');
let pencil = document.querySelector('.pencil');
let eraser = document.querySelector('.eraser');
let pencilFlag = false;
let eraserFlag = false;

optionsContainer.addEventListener('click', (e) => {
  optionsFlag = !optionsFlag;

  if(optionsFlag) openTools();
  else closeTools();
})

function openTools() {
  let iconElem = optionsContainer.children[0];
  iconElem.classList.remove('fa-times');
  iconElem.classList.add('fa-bars');
  toolsContainer.style.display = 'flex';
}

function closeTools() {
  let iconElem = optionsContainer.children[0];
  iconElem.classList.remove('fa-bars');
  iconElem.classList.add('fa-times');
  toolsContainer.style.display = 'none'
  pencilContainer.style.display = 'none';
  eraserContainer.style.display = 'none'
}

pencil.addEventListener('click', (e) => {
  pencilFlag = !pencilFlag;

  if(pencilFlag) pencilContainer.style.display = 'block';
  else pencilContainer.style.display= 'none';
})

eraser.addEventListener('click', (e) => {
  eraserFlag = !eraserFlag;

  if(eraserFlag) eraserContainer.style.display = 'flex';
  else eraserContainer.style.display= 'none';
})