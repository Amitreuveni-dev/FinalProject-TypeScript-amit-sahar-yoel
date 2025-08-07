var gridSize = 11;
var Tank = /** @class */ (function () {
    function Tank(rows, columns, direction) {
        this.row = rows;
        this.columns = columns;
        this.direction = direction;
    }
    Tank.prototype.move = function (newDirection, isCellFree) {
        this.direction = newDirection;
        var newRow = this.row;
        var newCol = this.columns;
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
            this.columns = newCol;
        }
    };
    Tank.prototype.getPosition = function () {
        return { row: this.row, columns: this.columns };
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
        for (var columns = 0; columns < gridSize; columns++) {
            var cell = document.createElement("div");
            cell.classList.add("cell");
            if (columns === Math.floor(gridSize / 2)) {
                cell.classList.add("wall");
            }
            main.appendChild(cell);
        }
    }
}
createGrid();
var isCellFree = function (row, columns) {
    return row >= 0 && row < gridSize && columns >= 0 && columns < gridSize;
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
