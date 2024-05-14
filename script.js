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
        cells[j] = document.createElement("div");
        cells[j].className = groupings[i].className + "-cell" + j;
        cells[j].style.border = "2px solid black";
        cells[j].style.height = cellDimension;
        cells[j].style.width = cellDimension;
        groupings[i].appendChild(cells[j]);
    }
}