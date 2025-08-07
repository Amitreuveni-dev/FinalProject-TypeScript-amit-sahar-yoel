class GameMap {
    width: number;
    height: number;
}

class Wall {
    width: number;
    heigth: number;
    x: number;
    y: number;
}

const main = document.querySelector(".main") as HTMLElement;

const gridSize = 11;

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

