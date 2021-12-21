const pixelBoard = document.querySelector("#pixel-board");
const numberOfSquares = document.querySelector("#select-size");
const paintArea = document.querySelector("#paint-area");

const pallete = document.querySelector("#pallete");
let colors = ["#000000", "#acdeb2", "#e1eab5", "#edad9e", "#fe4b74", "#390d2d"];

function selectColor(event) {
  const colorSpaceSelected = document.querySelector(".selected");
  colorSpaceSelected.classList.remove("selected");
  event.target.classList.add("selected");
}

function createSpaceColor(color) {
  const colorSpace = document.createElement("div");
  colorSpace.classList.add("color");
  colorSpace.style.backgroundColor = color;
  colorSpace.addEventListener("click", selectColor);
  pallete.appendChild(colorSpace);
}

function createPallete() {
  colors.forEach((element) => {
    const color = element;
    createSpaceColor(color);
  });
  pallete.children[0].classList.add("selected");
}
createPallete();
/*==========================================*/
const getColor = (e) => window.getComputedStyle(e).backgroundColor;

function paint(e) {
  const selectedColor = getColor(document.querySelector(".selected"));
  const square = e.target;
  square.style.backgroundColor = selectedColor;
  square.classList.add("colored");
}

const svg = document.querySelector("#paint-area svg");

function paintAreaDimensions() {
  const areaSize = 100 * Math.log2(numberOfSquares.value);
  paintArea.style.height = areaSize + "px";
  svg.setAttribute("viewBox", `0 0 ${areaSize} ${areaSize}`);
  svg.setAttribute("width", areaSize);
  svg.setAttribute("height", areaSize);
  return areaSize;
}

function squareSize() {
  const boardWidth = paintAreaDimensions();
  return parseInt(boardWidth, 10) / numberOfSquares.value + "px";
}

function createSquare() {
  const square = document.createElement("div");
  square.className = "square";
  square.style.width = squareSize();
  square.style.height = squareSize();
  square.addEventListener("click", paint);
  return square;
}

function createPixelBoard() {
  const boardSize = numberOfSquares.value ** 2;
  for (let n = 0; n < boardSize; n += 1) {
    const square = createSquare();
    pixelBoard.appendChild(square);
  }
}

window.onload = createPixelBoard();

function removeChildren(parent) {
  while (parent.hasChildNodes()) {
    parent.firstChild.remove();
  }
}

function createNewBoard() {
  removeChildren(pixelBoard);
  createPixelBoard();
}

numberOfSquares.addEventListener("change", createNewBoard);
/*==========================================*/
const linkDownload = document.querySelector("#link-download");
const image = document.querySelector("#my-image");

function formatText(text) {
  let exceptLineBreak = new RegExp("[^\f\n\r\t\v]", "g");
  let array = text.match(exceptLineBreak);
  return array.join("");
}

function createSVG() {
  let mimeType = "image/svg+xml";
  let svgString = paintArea.innerHTML;
  let svgFile = formatText(svgString);
  let blob = new Blob([svgFile], { type: mimeType });
  let svgUrl = URL.createObjectURL(blob);
  image.src = svgUrl;
  linkDownload.href = svgUrl;
}

const buttonViewImage = document.querySelector("#view-image");
const viewArea = document.querySelector("#view-area");

function showImage() {
  viewArea.classList.remove("hidden");
  createSVG();
}

buttonViewImage.addEventListener("click", showImage);

/*==========================================*/
const customizeArea = document.querySelector("#customize-area");
const customizePallete = document.querySelector("#customize-pallete");
const buttonCustomize = document.querySelector("#customize");

function toggleHidden() {
  pallete.classList.toggle("hidden");
  buttonCustomize.classList.toggle("hidden");
  customizeArea.classList.toggle("hidden");
}

function createInputColor(color) {
  const inputColor = document.createElement("input");
  inputColor.type = "color";
  inputColor.value = color;
  customizePallete.appendChild(inputColor);
}

function createNewPallete() {
  removeChildren(customizePallete);
  toggleHidden();
  colors.forEach((element) => {
    const color = element;
    createInputColor(color);
  });
}

buttonCustomize.addEventListener("click", createNewPallete);

const buttonAddColor = document.querySelector("#add-color");
const buttonSaveCustomize = document.querySelector("#save-customize");

function newColor() {
  const numOfColors = customizePallete.children.length;
  const numMaxOfColors = 20;
  if (numOfColors < numMaxOfColors) {
    const whiteColor = "#ffffff";
    createInputColor(whiteColor);
  }
}

buttonAddColor.addEventListener("click", newColor);

function setNewColors() {
  const newColors = document.querySelectorAll("#customize-pallete input");
  newColors.forEach((element, index) => {
    const color = element.value;
    colors[index] = color;
  });
  console.log(colors);
}

function saveNewPallete() {
  removeChildren(pallete);
  setNewColors();
  createPallete();
  toggleHidden();
}

buttonSaveCustomize.addEventListener("click", saveNewPallete);
