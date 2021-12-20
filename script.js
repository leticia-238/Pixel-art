const pixelBoard = document.querySelector("#pixel-board");
const numberOfSquares = document.querySelector("#select-size");
const paintArea = document.querySelector("#paint-area");

const palleteColors = document.querySelectorAll(".color");
const colors = ["black", "yellow", "blue", "red", "green", "pink"];

function selectColor(event) {
  const colorSpaceSelected = document.querySelector(".selected");
  colorSpaceSelected.classList.remove("selected");
  event.target.classList.add("selected");
}

function createPallete(colorSpace, color) {
  colorSpace.classList.add(color);
  colorSpace.style.backgroundColor = color;
  colorSpace.addEventListener("click", selectColor);
}

palleteColors.forEach((element, index) => {
  const color = colors[index];
  const colorSpace = element;
  createPallete(colorSpace, color);
});

const getColor = (e) => window.getComputedStyle(e).backgroundColor;

function paint(e) {
  const selectedColor = getColor(document.querySelector(".selected"));
  const square = e.target;
  square.style.backgroundColor = selectedColor;
  square.classList.add("colored");
}

const svg = document.querySelector("#paint-area svg");

function paintAreaDimensions() {
  const areaSize = parseInt(window.getComputedStyle(paintArea).width);
  svg.setAttribute("viewBox", `0 0 ${areaSize} ${areaSize}`);
  svg.setAttribute("width", areaSize);
  svg.setAttribute("height", areaSize);
  return areaSize;
}

function squareSize() {
  const boardWidth = paintAreaDimensions();
  return parseInt(boardWidth) / numberOfSquares.value + "px";
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

const link = document.querySelector("#link-download");
const image = document.querySelector("#my-image");

function createSVG() {
  let mimeType = "image/svg+xml";
  let str = paintArea.innerHTML;
  let re = new RegExp("[^\f\n\r\t\v]", "g");
  let array = str.match(re);
  let file = [array.join("")];
  let blob = new Blob(file, { type: mimeType });
  let url = URL.createObjectURL(blob);
  image.src = url;
  link.href = url;
}
createSVG();
