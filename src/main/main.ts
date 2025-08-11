// MODEL
type Direction = "up" | "down" | "left" | "right" | "none";

class Tank {
  tankImageUrl: string;
  width: number;
  height: number;
  speed: number;
  direction: Direction;
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
    tankImageUrl: string,
    width: number,
    height: number,
    speed: number,
    direction: Direction,
    location: { x: number; y: number },
    controls: { up: string; down: string; left: string; right: string }
  ) {
    this.tankImageUrl = tankImageUrl;
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.baseSpeed = speed;
    this.maxSpeed = speed * 5;
    this.acceleration = speed * 0.1;
    this.deceleration = speed * 0.15;
    this.direction = direction;
    this.location = location;
    this.controls = controls;

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

  move(gameWidth: number, gameHeight: number) {
    let moved = false;
    const isMoving = this.keysPressed.size > 0;

    if (this.keysPressed.has(this.controls.up)) {
      this.location.y -= this.speed;
      moved = true;
      this.direction = "up";

      if (this.location.y < 0) this.location.y = gameHeight;
    }
    if (this.keysPressed.has(this.controls.down)) {
      this.location.y += this.speed;
      moved = true;
      this.direction = "down";

      if (this.location.y > gameHeight) this.location.y = 0;
    }
    if (this.keysPressed.has(this.controls.left)) {
      this.location.x -= this.speed;
      moved = true;
      this.direction = "left";

      if (this.location.x < 0) this.location.x = gameWidth;
    }
    if (this.keysPressed.has(this.controls.right)) {
      this.location.x += this.speed;
      moved = true;
      this.direction = "right";

      if (this.location.x > gameWidth) this.location.x = 0;
    }

    // Acceleration / Deceleration
    if (isMoving) {
      this.speed = Math.min(this.speed + this.acceleration, this.maxSpeed);
    } else {
      this.speed = Math.max(this.speed - this.deceleration, 0);
    }

    if (moved || this.speed > 0) {
      this.render();
    }
  }

  render() {
    const container = document.querySelector(".tanksRoot") as HTMLElement;
    if (!container) {
      console.error("tank container not found");
      return;
    }
    if (!this.playerElement) {
      this.playerElement = document.createElement("div");
      this.playerElement.className = "tank";
      this.playerElement.style.position = "absolute";
      this.playerElement.style.width = `${this.width}px`;
      this.playerElement.style.height = `${this.height}px`;
      this.playerElement.style.backgroundImage = `url(${this.tankImageUrl})`;
      this.playerElement.style.backgroundSize = "contain";
      this.playerElement.style.backgroundRepeat = "no-repeat";
      this.playerElement.style.backgroundPosition = "center";
      container.appendChild(this.playerElement);
    }
    this.updatePosition();
  }

  updatePosition() {
    if (!this.playerElement) return;

    // Remove previous direction classes
    this.playerElement.classList.remove(
      "facing-up",
      "facing-down",
      "facing-left",
      "facing-right"
    );

    // Add current direction class
    switch (this.direction) {
      case "up":
        this.playerElement.classList.add("facing-up");
        break;
      case "down":
        this.playerElement.classList.add("facing-down");
        break;
      case "left":
        this.playerElement.classList.add("facing-left");
        break;
      case "right":
        this.playerElement.classList.add("facing-right");
        break;
    }

    this.lastDirection = this.direction;

    // Update position
    this.playerElement.style.left = `${this.location.x}px`;
    this.playerElement.style.top = `${this.location.y}px`;
  }
}

// ==============================
// =========  CONTROLLER =========
// ==============================

const GAME_WIDTH = 1121;
const GAME_HEIGHT = 657;

const tankA = new Tank(
  "../assets/playerTank.png",
  50,
  50,
  0.2,
  "left",
  { x: 1100, y: 0 },
  { up: "ArrowUp", down: "ArrowDown", left: "ArrowLeft", right: "ArrowRight" }
);

const tankB = new Tank(
  "../assets/enemyTank.png",
  50,
  50,
  0.2,
  "right",
  { x: 10, y: 5 },
  { up: "w", down: "s", left: "a", right: "d" }
);

tankA.render();
tankB.render();

function gameLoop() {
  tankA.move(GAME_WIDTH, GAME_HEIGHT);
  tankB.move(GAME_WIDTH, GAME_HEIGHT);
  requestAnimationFrame(gameLoop);
}

gameLoop();
