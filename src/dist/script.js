var GameMap = /** @class */ (function () {
    function GameMap() {
    }
    return GameMap;
}());
var Wall = /** @class */ (function () {
    function Wall() {
    }
    return Wall;
}());
var main = document.querySelector(".main");
var gridSize = 11;
for (var row = 0; row < gridSize; row++) {
    for (var col = 0; col < gridSize; col++) {
        var cell = document.createElement("div");
        cell.classList.add("cell");
        if (col === Math.floor(gridSize / 2)) {
            cell.classList.add("wall");
        }
        main.appendChild(cell);
    }
}
