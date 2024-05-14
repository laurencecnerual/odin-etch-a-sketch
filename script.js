const button = document.querySelector("button");

const container = document.querySelector(".container");
container.style.display = "flex";
container.style.justifyContent = "center";

const groupings = [];
const cells = [];
const cellGrayoutStatus = new Map(); // To track whether or not a given cell was previously grayed out

setGrid(4); // Initializes the grid to 4x4 on page load

function setGrid(size) {

    if (!Number.isInteger(size)) {
        alert("Error: Input received is not an integer.");
    } else if (size < 1) {
        alert("Error: Input received is not a postive number.");
    } else if (size > 100) {
        alert("Error: Input received is too large.");
    } else {
        const cellDimension = 960/size + "px";

        for (let i = 0; i < size; i++) {
            groupings[i] = document.createElement("div");
            groupings[i].className = "grouping" + i;
            groupings[i].style.display = "flex";
            groupings[i].style.flexDirection = "column";
    
            container.appendChild(groupings[i]);
    
            for (let j = 0; j < size; j++) {
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

function getUserInput() {
    return parseInt(prompt("Input your desired grid size as an integer.\n(Note: For number N, a grid of size N x N will be created.)"));
}

function clearGrid() {
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
}

button.addEventListener("click", () => {
    clearGrid();
    setGrid(getUserInput());
});