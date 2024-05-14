const container = document.querySelector(".container");
container.style.display = "flex";
container.style.justifyContent = "center";
const groupings = [];
const cells = [];
const cellDimension = "180px";

for (let i = 0; i < 4; i++) {
    groupings[i] = document.createElement("div");
    groupings[i].className = "grouping" + i;
    groupings[i].style.display = "flex";
    groupings[i].style.flexDirection = "column";
    container.appendChild(groupings[i]);

    for (let j = 0; j < 4; j++) {
        let k = 4 * i + j; // to keep index unique for each cell within 1D-array "cells"
        cells[k] = document.createElement("div");
        cells[k].className = groupings[i].className + "-cell" + j;
        cells[k].style.border = "2px solid black";
        cells[k].style.height = cellDimension;
        cells[k].style.width = cellDimension;
        groupings[i].appendChild(cells[k]);
    }
}

function fillCell(cellClass) {
    const cell = document.querySelector("." + cellClass);
    cell.style.backgroundColor = "black";
}

function fadeCell(cellClass) {
    const cell = document.querySelector("." + cellClass);
    cell.style.backgroundColor = "gray";
}

cells.forEach((cell) => {
    cell.addEventListener("mouseover", () => {
      fillCell(cell.className);
    });
  });

  cells.forEach((cell) => {
    cell.addEventListener("mouseout", () => {
      fadeCell(cell.className);
    });
  });