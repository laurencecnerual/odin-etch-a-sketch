const body = document.querySelector("body");
body.style.display = "flex";
body.style.flexDirection = "column";
body.style.gap = "8px";
body.style.alignItems = "center";

const button = document.querySelector("button");
button.style.fontSize = "16px";
button.style.width = "240px";
button.style.height = "30px";

const container = document.querySelector(".container");
container.style.display = "flex";
container.style.width = "960px";
container.style.height = "960px";

const groupings = [];
const cells = [];
const cellFadeoutStatus = new Map(); // To track whether or not a given cell was previously faded out

// For mouseout effect - Not 0 to 255 to prevent white and black
const randomColorMin = 1;
const randomColorMax = 254;

const gridLineColor = 211; // "lightgray"

setGrid(4); // Initializes the grid to 4x4 on page load
setCellEventListeners(); // Makes the cells respond to mouse-hovering

button.addEventListener("click", () => {
    clearGrid();
    setGrid(getUserInput());
    setCellEventListeners();
});

function setGrid(size) {

    if (!Number.isInteger(size)) {
        alert("Error: Input received is not an integer.");
    } else if (size < 1) {
        alert("Error: Input received is not a postive number.");
    } else if (size > 100) {
        alert("Error: Input received is too large.");
    } else {
        for (let i = 0; i < size; i++) {
            groupings[i] = document.createElement("div");
            groupings[i].className = "grouping" + i;
            groupings[i].style.display = "flex";
            groupings[i].style.flexDirection = "column";
            groupings[i].style.flexGrow = "1";
    
            container.appendChild(groupings[i]);
    
            for (let j = 0; j < size; j++) {
                let k = size * i + j; // to keep index unique for each cell within 1D-array "cells"
    
                cells[k] = document.createElement("div");
                cells[k].className = groupings[i].className + "-cell" + j;
                cells[k].style.border = `1px solid rgb(${gridLineColor}, ${gridLineColor}, ${gridLineColor})`;
                cells[k].style.flexGrow = "1";
    
                cellFadeoutStatus.set(cells[k].className, false); // Initialize to "not previously grayed out" (since starting color is white)
    
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

    if (!cellFadeoutStatus.get(cellClass)) {
        cell.style.backgroundColor = `rgb(${getRandomIntInclusive(randomColorMin, randomColorMax)}, ${getRandomIntInclusive(randomColorMin, randomColorMax)}, ${getRandomIntInclusive(randomColorMin, randomColorMax)})`;
        cellFadeoutStatus.set(cellClass, true);
    } else {
        cell.style.backgroundColor = "white";
        cellFadeoutStatus.set(cellClass, false);
    }
}

function setCellEventListeners () {
    cells.forEach((cell) => {
        cell.addEventListener("mouseover", () => {
          fillCell(cell.className);
        });

        cell.addEventListener("mouseout", () => {
            fadeCell(cell.className);
          });
    });
}

function getUserInput() {
    return parseInt(prompt("Input your desired grid size as a positive integer.\n(Note: For input N, a grid of size N x N will be created.)"));
}

function clearGrid() {
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
}

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}