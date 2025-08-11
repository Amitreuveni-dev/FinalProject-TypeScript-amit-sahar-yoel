type Direction = "up" | "down" | "left" | "right" | "none";

class Tank {
  tankImageUrl: string;
  width: number;
  height: number;
  speed: number = 0;
  baseSpeed: number;
  maxSpeed: number;
  acceleration: number;
  deceleration: number;
  direction: Direction;
  lastDirection: Direction = "none";
  location: { x: number; y: number };
  controls: { up: string; down: string; left: string; right: string };
  keysPressed: Set<string> = new Set();
  playerElement?: HTMLElement;

  constructor(
    tankImageUrl: string,
    width: number,
    height: number,
    baseSpeed: number,
    initialDirection: Direction,
    initialLocation: { x: number; y: number },
    controls: { up: string; down: string; left: string; right: string }
  ) {
    this.tankImageUrl = tankImageUrl;
    this.width = width;
    this.height = height;
    this.baseSpeed = baseSpeed;
    this.maxSpeed = baseSpeed * 5;
    this.acceleration = baseSpeed * 0.1;
    this.deceleration = baseSpeed * 0.15;
    this.direction = initialDirection;
    this.location = initialLocation;
    this.controls = controls;

    window.addEventListener("keydown", (e) => {
      if (
        e.key === this.controls.up ||
        e.key === this.controls.down ||
        e.key === this.controls.left ||
        e.key === this.controls.right
      ) {
        this.keysPressed.add(e.key);
      }
    });

    window.addEventListener("keyup", (e) => {
      this.keysPressed.delete(e.key);
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
    const container = document.querySelector(".tanksRoot");
    if (!container) {
      console.error("container .tanksRoot לא נמצא ב־DOM");
      return;
    }
    if (!this.playerElement) {
      this.playerElement = document.createElement("div");
      this.playerElement.className = "tank";
      this.playerElement.style.position = "absolute";
      this.playerElement.style.width = this.width + "px";
      this.playerElement.style.height = this.height + "px";
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

    this.playerElement.classList.remove(
      "facing-up",
      "facing-down",
      "facing-left",
      "facing-right"
    );

    this.playerElement.classList.add("facing-" + this.direction);

    this.lastDirection = this.direction;

    this.playerElement.style.left = this.location.x + "px";
    this.playerElement.style.top = this.location.y + "px";
  }
}

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
