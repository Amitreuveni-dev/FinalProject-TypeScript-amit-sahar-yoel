// ==============================
// ========   MODEL   ==========
// ==============================

type Direction = "up" | "down" | "left" | "right";

class Tank {
  tankImage: string;
  width: number;
  height: number;
  speed: number;
  row: number;
  columns: number;
  direction: Direction;
  team: number;
  location: { x: number; y: number };
  playerElement?: HTMLElement;

  constructor(
    tankImage: string,
    width: number,
    height: number,
    speed: number,
    row: number,
    columns: number,
    direction: Direction,
    team: number,
    location: { x: number; y: number }
  ) {
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

  move(
    newDirection: Direction,
    isCellFree: (row: number, columns: number) => boolean
  ): void {
    this.direction = newDirection;
    let newRow = this.row;
    let newCol = this.columns;

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

    if (isCellFree(newRow, newCol)) {
      this.row = newRow;
      this.columns = newCol;
    } else {
      console.log("Cannot move to the cell, it is occupied or out of bounds.");
    }
  }

  renderTank() {
    try {
      const container = document.querySelector(".tanksRoot") as HTMLElement;

      if (this.playerElement && this.playerElement.parentNode) {
        this.playerElement.style.transform = `translate(${this.location.x}px, ${this.location.y}px)`;
        return;
      }

      this.playerElement = document.createElement("div");
      this.playerElement.className = "tankRoot__tank";
      this.playerElement.style.position = "absolute";
      this.playerElement.innerHTML = this.tankImage;
      this.playerElement.style.transform = `translate(${this.location.x}px, ${this.location.y}px)`;
      this.playerElement.style.width = `${this.width}px`;
      this.playerElement.style.height = `${this.height}px`;
      
      container.appendChild(this.playerElement);
    } catch (error) {
      console.error("Error rendering tank:", error);
    }
  }

  getPosition() {
    return { row: this.row, columns: this.columns };
  }

  getDirection() {
    return this.direction;
  }
}

class Bullet {
  position: { rows: number; columns: number };
  direction: Direction;
  active: boolean;

  constructor(rows: number, columns: number, direction: Direction) {
    this.position = { rows, columns };
    this.direction = direction;
    this.active = true;
  }

  move(isCellFree: (rows: number, columns: number) => boolean): void {
    if (!this.active) return;

    let newRow = this.position.rows;
    let newCol = this.position.columns;

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
    } else {
      this.active = false;
    }
  }
}

// ==============================
// =========  VIEW   ============
// ==============================

const main = document.querySelector(".main") as HTMLElement;
const gridSize = 11;



const tankA = new Tank(
  "<img src='./assets/playerTank.png' alt='playerTank'>",
  50,
  50,
  2,
  0,
  0,
  "up",
  1,
  { x: 40, y: 0 }
);
const tankB = new Tank(
  "<img src='./assets/enemyTank.png' alt='enemyTank'>",
  50,
  50,
  2,
  10,
  10,
  "down",
  2,
  { x: 10, y: 5}
);

//---------view------------//

tankA.renderTank();
tankB.renderTank();

// ==============================
// ======== CONTROLLER =========
// ==============================

const bullets: Bullet[] = [];

const isCellFree = (row: number, columns: number): boolean => {
  return row >= 0 && row < gridSize && columns >= 0 && columns < gridSize;
};

// Render tanks

function shootBullet(tank: Tank): void {
  const { row, columns } = tank.getPosition();
  const direction = tank.getDirection();
  const bullet = new Bullet(row, columns, direction);
  bullets.push(bullet);

  const interval = setInterval(() => {
    if (bullet.active) {
      bullet.move(isCellFree);
      console.log(`Bullet moved to position: ${bullet.position.rows}, ${bullet.position.columns}`);
    } else {
      clearInterval(interval);
      console.log("Bullet has stopped moving.");
    }
  }, 100);
}

//-----------controller-----------//

document.addEventListener("keydown", (e) => {
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
    case "Enter":
      shootBullet(tankA);
      break;

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
    case " ":
      shootBullet(tankB);
      break;
  }
});

console.log("Tank A position:", tankA.getPosition(), "direction:", tankA.getDirection());
console.log("Tank B position:", tankB.getPosition(), "direction:", tankB.getDirection());
