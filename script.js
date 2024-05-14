const container = document.querySelector(".container");
container.style.display = "flex";
container.style.justifyContent = "center";
const groupings = [];
const cells = [];
const cellDimension = "180px";
const cellGrayoutStatus = new Map(); // To track whether or not a given cell was previously grayed out

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
        cellGrayoutStatus.set(cells[k].className, false); // Initialize to "not previously grayed out" (since starting color is white)
        groupings[i].appendChild(cells[k]);
    }
}

function fillCell(cellClass) {
    const cell = document.querySelector("." + cellClass);
    cell.style.backgroundColor = "black";
}

function fadeCell(cellClass) {
    const cell = document.querySelector("." + cellClass);

    if (!cellGrayoutStatus.get(cellClass)) {
        cell.style.backgroundColor = "gray";
        cellGrayoutStatus.set(cellClass, true);
    } else {
        cell.style.backgroundColor = "white";
        cellGrayoutStatus.set(cellClass, false);
    }
    
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