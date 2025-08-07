type Direction = "up" | "down" | "left" | "right";

const gridSize = 11;

class Tank {
  private row: number;
  private columns: number;
  private direction: Direction;

  constructor(rows: number, columns: number, direction: Direction) {
    this.row = rows;
    this.columns = columns;
    this.direction = direction;
  }

  move(newDirection: Direction, isCellFree: (row: number, columns: number) => boolean): void {
    this.direction = newDirection;

    let newRow = this.row;
    let newCol = this.columns;

    switch (newDirection) {
      case "up": newRow--; break;
      case "down": newRow++; break;
      case "left": newCol--; break;
      case "right": newCol++; break;
    }

    if (!isCellFree(newRow, newCol)) {
      console.log("Cannot move to the cell, it is occupied or out of bounds.");
    } else {
      this.row = newRow;
      this.columns = newCol;
    }
  }

  getPosition() {
    return { row: this.row, columns: this.columns };
  }

  getDirection() {
    return this.direction;
  }
}

const main = document.querySelector(".main") as HTMLElement;

function createGrid() {
  main.innerHTML = "";

  for (let row = 0; row < gridSize; row++) {
    for (let columns = 0; columns < gridSize; columns++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      if (columns === Math.floor(gridSize / 2)) {
        cell.classList.add("wall");
      }

      main.appendChild(cell);
    }
  }
}

createGrid();

const isCellFree = (row: number, columns: number): boolean => {
  return row >= 0 && row < gridSize && columns >= 0 && columns < gridSize;
};

const tank = new Tank(5, 5, "up");

document.addEventListener("keydown", (e) => {
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