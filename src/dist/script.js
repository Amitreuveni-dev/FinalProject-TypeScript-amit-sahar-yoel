//Model//
var gridSize = 11;
var Tank = /** @class */ (function () {
    function Tank(tankImage, width, height, speed, row, columns, direction, team, location) {
        this.tankImage = tankImage;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.row = row;
        this.columns = columns;
        this.direction = direction;
        this.team = team;
        this.location = location;
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
    Tank.prototype.renderTank = function () {
        try {
            var container = document.querySelector(".tanksRoot");
            if (this.playerElement && this.playerElement.parentNode) {
                this.playerElement.style.transform = "translate(" + this.location.x + "px, " + this.location.y + "px)";
                return;
            }
            this.playerElement = document.createElement("div");
            this.playerElement.className = "tankRoot__tank";
            this.playerElement.style.position = "absolute";
            this.playerElement.innerHTML = this.tankImage;
            this.playerElement.style.transform = "translate(" + this.location.x + "px, " + this.location.y + "px)";
            this.playerElement.style.width = this.width + "px";
            this.playerElement.style.height = this.height + "px";
            container.appendChild(this.playerElement);
        }
        catch (error) {
            console.error("Error rendering tank:", error);
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
var Bullet = /** @class */ (function () {
    function Bullet(rows, columns, direction) {
        this.position = { rows: rows, columns: columns };
        this.direction = direction;
        this.active = true;
    }
    Bullet.prototype.move = function (isCellFree) {
        if (!this.active)
            return;
        var newRow = this.position.rows;
        var newCol = this.position.columns;
        switch (this.direction) {
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
        if (isCellFree(newRow, newCol)) {
            this.position.rows = newRow;
            this.position.columns = newCol;
        }
        else {
            this.active = false;
        }
    };
    return Bullet;
}());
var main = document.querySelector(".main");
function createGrid() {
    main.innerHTML += "";
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
var tankA = new Tank("<img src='./assets/playerTank.png' alt='playerTank'>", 50, 50, 2, 0, 0, "up", 1, { x: 40, y: 0 });
var tankB = new Tank("<img src='./assets/enemyTank.png' alt='enemyTank'>", 50, 50, 2, 10, 10, "down", 2, { x: 10, y: 5 });
//---------view------------//
createGrid();
tankA.renderTank();
tankB.renderTank();
var isCellFree = function (row, columns) {
    return row >= 0 && row < gridSize && columns >= 0 && columns < gridSize;
};
// Render tanks
//-----------controller-----------//
document.addEventListener("keydown", function (e) {
    switch (e.key) {
        case "ArrowUp":
            tankA.move("up", isCellFree);
            break;
        case "ArrowDown":
            tankA.move("down", isCellFree);
            break;
        case "ArrowLeft":
            tankA.move("left", isCellFree);
            break;
        case "ArrowRight":
            tankA.move("right", isCellFree);
            break;
    }
    console.log("Tank position:", tankA.getPosition(), "direction:", tankA.getDirection());
});
document.addEventListener("keydown", function (e) {
    switch (e.key) {
        case "w":
            tankB.move("up", isCellFree);
            break;
        case "s":
            tankB.move("down", isCellFree);
            break;
        case "a":
            tankB.move("left", isCellFree);
            break;
        case "d":
            tankB.move("right", isCellFree);
            break;
    }
    console.log("Tank position:", tankB.getPosition(), "direction:", tankB.getDirection());
});
