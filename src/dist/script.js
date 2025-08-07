var gridSize = 11;
var Tank = /** @class */ (function () {
    function Tank(row, col, direction) {
        this.row = row;
        this.col = col;
        this.direction = direction;
    }
    Tank.prototype.move = function (newDirection, isCellFree) {
        this.direction = newDirection;
        var newRow = this.row;
        var newCol = this.col;
        switch (newDirection) {
            case "up":
                newRow--;
                break;
            case "down":
                newRow++;
                break;
            case "left":
                newCol--;
                break;
            case "right":
                newCol++;
                break;
        }
        if (!isCellFree(newRow, newCol)) {
            console.log("Cannot move to the cell, it is occupied or out of bounds.");
        }
        else {
            this.row = newRow;
            this.col = newCol;
        }
    };
    Tank.prototype.getPosition = function () {
        return { row: this.row, col: this.col };
    };
    Tank.prototype.getDirection = function () {
        return this.direction;
    };
    return Tank;
}());
var main = document.querySelector(".main");
function createGrid() {
    main.innerHTML = "";
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
}
createGrid();
var isCellFree = function (row, col) {
    return row >= 0 && row < gridSize && col >= 0 && col < gridSize;
};
var tank = new Tank(5, 5, "up");
document.addEventListener("keydown", function (e) {
    switch (e.key) {
        case "ArrowUp":
            tank.move("up", isCellFree);
            break;
        case "ArrowDown":
            tank.move("down", isCellFree);
            break;
        case "ArrowLeft":
            tank.move("left", isCellFree);
            break;
        case "ArrowRight":
            tank.move("right", isCellFree);
            break;
    }
    console.log("Tank position:", tank.getPosition(), "direction:", tank.getDirection());
});
