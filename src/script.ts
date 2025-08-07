type Direction = "up" | "down" | "left" | "right";

const gridSize = 11;

class Tank {
  private row: number;
  private col: number;
  private direction: Direction;

  constructor(row: number, col: number, direction: Direction) {
    this.row = row;
    this.col = col;
    this.direction = direction;
  }

  move(newDirection: Direction, isCellFree: (row: number, col: number) => boolean): void {
    this.direction = newDirection;

    let newRow = this.row;
    let newCol = this.col;

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
      this.col = newCol;
    }
  }

  getPosition() {
    return { row: this.row, col: this.col };
  }

  getDirection() {
    return this.direction;
  }
}

const main = document.querySelector(".main") as HTMLElement;

function createGrid() {
  main.innerHTML = "";

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      if (col === Math.floor(gridSize / 2)) {
        cell.classList.add("wall");
      }

      main.appendChild(cell);
    }
  }
}

createGrid();

const isCellFree = (row: number, col: number): boolean => {
  return row >= 0 && row < gridSize && col >= 0 && col < gridSize;
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