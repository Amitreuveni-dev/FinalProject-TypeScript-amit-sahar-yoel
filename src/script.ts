type Direction = "up" | "down" | "left" | "right";

const gridSize = 11;

class Tank {
  image:string
  width: number;
  height: number;
  speed: number;
  row: number;
  columns: number;
  direction: Direction;
  team: number;
  
  

  constructor(image: string, width: number, height: number, speed: number, row: number, columns: number, direction: Direction, team: number) {
    this.image = image;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.row = row;
    this.columns = columns;
    this.direction = direction;
    this.team = team;
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

const tankA = new Tank("tankA.png", 5, 5, 2, 0, 0, "up", 1);\
const tankB = new Tank("tankB.png", 5, 5, 2, 10, 10, "down", 2);

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