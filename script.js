const GRIDSIDE = 600;
let squaresPerSide = 16;
const sketchArea = document.querySelector("#sketch-area");
let grid_btn = document.querySelector("#grid");
let erase_btn = document.querySelector("#erase");
let random_color = document.querySelector("#randomColor");
let black_color = document.querySelector("#blackColor");

let currentColorMode = 'black';

sketchArea.style.width = sketchArea.style.height = `${GRIDSIDE}px`;
createGridCells();

grid_btn.addEventListener("click", function () {
  squaresPerSide = prompt("Enter the grid size (Between 10 and 100) :- ");

  while (isNaN(squaresPerSide) || squaresPerSide < 10 || squaresPerSide > 100) {
    squaresPerSide = prompt(
      "Please enter a valid number (Between 10 and 100) :- "
    );
  }
  createGridCells();
});

random_color.addEventListener("click", function () {
  currentColorMode = 'random';
});

black_color.addEventListener("click", ()=> {
  currentColorMode = 'black';
})

function getRandomHexColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function setBackgroundColor(event) {
  const cell = event.target;
  if (!cell.classList.contains("active")) {
      if (currentColorMode === 'random') {
          cell.dataset.initialColor = getRandomHexColor();
      } else {
          cell.dataset.initialColor = 'black';
      }
      cell.classList.add("active");
      cell.style.backgroundColor = cell.dataset.initialColor;
      cell.style.opacity = 0.1;
  } else {
      let opacity = parseFloat(cell.style.opacity);
      if (opacity < 1) {
          opacity += 0.1;
          cell.style.opacity = `${opacity}`;
      }
  }
}


function createGridCells() {
  sketchArea.innerHTML = "";
  const numberOfSquares = squaresPerSide * squaresPerSide;
  const widthOrHeight = `${GRIDSIDE / squaresPerSide - 2}px`;

  for (i = 0; i < numberOfSquares; i++) {
    const gridCell = document.createElement("div");
    gridCell.style.width = gridCell.style.height = widthOrHeight;
    gridCell.classList.add("cell");
    sketchArea.appendChild(gridCell);
   gridCell.addEventListener("mouseover", setBackgroundColor);
  }
}

function erase_colors() {
  let cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.style.backgroundColor = "";
    cell.style.opacity = "1";
    cell.classList.remove("active");
    delete cell.dataset.initialColor;
  });
}

erase_btn.addEventListener("click", function () {
  erase_colors();
});

