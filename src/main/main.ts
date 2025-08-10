// ==============================
// ========   MODEL   ==========
// ==============================

type Direction = "up" | "down" | "left" | "right" | "none";

class Tank {
  tankImage: string;
  width: number;
  height: number;
  speed: number;
  direction: Direction;
  team: number;
  location: { x: number; y: number };
  playerElement?: HTMLElement;
  controls: { up: string; down: string; left: string; right: string };
  keysPressed: Set<string> = new Set();
  baseSpeed: number;
  maxSpeed: number;
  acceleration: number;
  deceleration: number;
  lastDirection: Direction = "none";

  constructor(
    tankImage: string,
    width: number,
    height: number,
    speed: number,
    direction: Direction,
    team: number,
    location: { x: number; y: number },
    controls: { up: string; down: string; left: string; right: string }
  ) {
    this.tankImage = tankImage;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.direction = direction;
    this.team = team;
    this.location = location;
    this.controls = controls;
    this.baseSpeed = speed;
    this.maxSpeed = speed * 5;
    this.acceleration = speed * 0.1;
    this.deceleration = speed * 0.15;
    this.speed = 0;
    

    window.addEventListener("keydown", (event) => {
      if (
        [
          this.controls.up,
          this.controls.down,
          this.controls.left,
          this.controls.right,
        ].includes(event.key)
      ) {
        this.keysPressed.add(event.key);
      }
    });
    window.addEventListener("keyup", (event) => {
      this.keysPressed.delete(event.key);
    });
  }
  move() {
    let moved = false;
    let isMoving = this.keysPressed.size > 0;
  
    
    if (this.keysPressed.has(this.controls.up)) {
      this.location.y -= this.speed;
      moved = true;
      this.direction = "up";

    }
    if (this.keysPressed.has(this.controls.down)) {
      this.location.y += this.speed;
      moved = true;
      this.direction = "down";
    
    }
    if (this.keysPressed.has(this.controls.left)) {
      this.location.x -= this.speed;
      moved = true;
      this.direction = "left";
    }
    if (this.keysPressed.has(this.controls.right)) {
      this.location.x += this.speed;
      moved = true;
      this.direction = "right";
    }

    // Handle acceleration/deceleration
    if (isMoving) {
      this.speed = Math.min(this.speed + this.acceleration, this.maxSpeed);
    } else {
      this.speed = Math.max(this.speed - this.deceleration, 0);
    }

    if (moved || this.speed > 0) {
      this.renderTank();
    }
  }
  renderTank() {
    const container = document.querySelector(".tanksRoot") as HTMLElement;
    if (!container) {
      console.error("tank container not found");
      return;
    }
    if (!this.playerElement) {
      this.playerElement = document.createElement("div");
      this.playerElement.className = "tankRoot__tank";
      this.playerElement.style.position = "absolute";
      this.playerElement.style.height = `${this.height}px`;
      this.playerElement.style.width = `${this.width}px`;
      this.playerElement.innerHTML = this.tankImage;
      container.appendChild(this.playerElement);
    }
    this.updatePosition();
  }
updatePosition() {
  if (this.playerElement) {
 
    if (this.direction !== this.lastDirection && this.direction !== "none") {

      this.playerElement.classList.remove('tank-flip-left', 'tank-flip-right', 'tank-rotate-up', 'tank-rotate-down');
      
      switch (this.direction) {
        case "left":
          this.playerElement.classList.add('tank-flip-left');
          break;
        case "right":
          this.playerElement.classList.add('tank-flip-right');
          break;
        case "up":
          this.playerElement.classList.add('tank-rotate-up');
          break;
        case "down":
          this.playerElement.classList.add('tank-rotate-down');
          break;
      }
      
      this.lastDirection = this.direction;
    }
    
    // Update position //
    this.playerElement.style.left = `${this.location.x}px`;
    this.playerElement.style.top = `${this.location.y}px`;
  }
}
}

// ==============================
// =========  VIEW   ============
// ==============================

const tankA = new Tank(
  "<img src='../assets/playerTank.png' alt='playerTank'>",
  50,
  50,
  0.15,

  "left",
  2, //team
  { x: 1000, y: 0 },
  {
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight",
  }
);
const tankB = new Tank(
  "<img src='../assets/enemyTank.png' alt='enemyTank'>",
  50,
  50,
  0.15,
  "right",
  2, //team
  { x: 10, y: 5 },
  {
    up: "w",
    down: "s",
    left: "a",
    right: "d",
  }
);

tankA.renderTank();
tankB.renderTank();

// ==============================
// ======== CONTROLLER =========
// ==============================
function gameLoop() {
  tankA.move();
  tankB.move();
  requestAnimationFrame(gameLoop); // Continue the loop
}

// Start the game loop
gameLoop();


