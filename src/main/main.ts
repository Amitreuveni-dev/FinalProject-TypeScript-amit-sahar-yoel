////////////////////////////////////////////
//////////// MODEL /////////////////////////
////////////////////////////////////////////
let tankAscore = 0;
let tankBscore = 0;

type Direction =
  | "up"
  | "down"
  | "left"
  | "right"
  | "none"
  | "up-right"
  | "up-left"
  | "down-right"
  | "down-left";

class screenSize {
  gameWidth: number;
  gameHeight: number;
  constructor(gameWidth: number, gameHeight: number) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }
  largeScreen() {
    this.gameWidth = 1106;
    this.gameHeight = 712;
  }
  mediumScreen() {
    this.gameWidth = 708;
    this.gameHeight = 570;
  }
  smallScreen() {
    this.gameWidth = 457;
    this.gameHeight = 460;
  }

  adjustGameWidthAndHeight() {
    try {
      const windowWidth = window.innerWidth;
      if (windowWidth) {
        if (windowWidth >= 1211) {
          this.largeScreen();
        } else if (windowWidth > 815) {
          this.mediumScreen();
        } else {
          this.smallScreen();
        }
      } else {
        throw new Error("Main element not found");
      }
    } catch (error) {
      console.error("Error checking main size:", error);
      return undefined;
    }
  }
}

const screenAdjustment = new screenSize(0, 0);

screenAdjustment.adjustGameWidthAndHeight();

class Bullet {
  position: { x: number; y: number };
  direction: Direction;
  speed: number;
  element?: HTMLElement;

  constructor(
    direction: Direction,
    speed: number,
    startX: number,
    startY: number
  ) {
    this.position = { x: startX, y: startY };
    this.direction = direction;
    this.speed = speed;
  }

  move(): void {
    switch (this.direction) {
      case "up":
        this.position.y -= this.speed;
        break;
      case "down":
        this.position.y += this.speed;
        break;
      case "left":
        this.position.x -= this.speed;
        break;
      case "right":
        this.position.x += this.speed;
        break;
      case "up-right":
        this.position.x += this.speed;
        this.position.y -= this.speed;
        break;
      case "up-left":
        this.position.x -= this.speed;
        this.position.y -= this.speed;
        break;
      case "down-right":
        this.position.x += this.speed;
        this.position.y += this.speed;
        break;
      case "down-left":
        this.position.x -= this.speed;
        this.position.y += this.speed;
        break;
      default:
        console.error("Invalid direction for bullet movement");
    }
    this.render();
  }

  hitTheWall(): boolean {
    if (
      this.position.x < 0 ||
      this.position.x > screenAdjustment.gameWidth + 50 ||
      this.position.y < 0 ||
      this.position.y > screenAdjustment.gameHeight + 45
    ) {
      return true;
    }
    return false;
  }

  render() {
    const container = document.querySelector(".tanksRoot");
    if (!container) return;

    if (!this.element) {
      this.element = document.createElement("div");
      this.element.className = "bullet";
      if (container) container.appendChild(this.element);
    }

    this.element.style.left = this.position.x + "px";
    this.element.style.top = this.position.y + "px";
  }
}

class Tank {
  tankImageUrl: string;
  width: number;
  height: number;
  speed: number = 0;
  baseSpeed: number;
  initialLocation: { x: number; y: number };
  maxSpeed: number;
  acceleration: number;
  deceleration: number;
  direction: Direction;
  lastDirection: Direction = "none";
  location: { x: number; y: number };
  controls: { up: string; down: string; left: string; right: string };
  keysPressed: Set<string> = new Set();
  playerElement?: HTMLElement;
  team: number;
  isAlive: boolean = true;
  moveSound?: HTMLAudioElement;


  constructor(
    tankImageUrl: string,
    width: number,
    height: number,
    baseSpeed: number,
    initialDirection: Direction,
    initialLocation: { x: number; y: number },
    controls: { up: string; down: string; left: string; right: string },
    team: number
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
    this.initialLocation = initialLocation;
    this.controls = controls;
    this.team = team;

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

  setInitialLocation() {
    if (this.team === 1) {
      this.initialLocation.x = 8;
      this.initialLocation.y = 280;
    }
    if (this.team === 2) {
      this.initialLocation.x = screenAdjustment.gameWidth;
      this.initialLocation.y = 280;
    }
  }

  move(gameWidth: number, gameHeight: number) {
    if (!this.isAlive) return;
    let moved = false;
    const isMoving = this.keysPressed.size > 0;

    // Get current key states
    const up = this.keysPressed.has(this.controls.up);
    const down = this.keysPressed.has(this.controls.down);
    const left = this.keysPressed.has(this.controls.left);
    const right = this.keysPressed.has(this.controls.right);

    // Handle vertical movement
    if (up) {
      this.location.y -= this.speed;
      moved = true;
      this.location.y = Math.max(0, this.location.y);
    }

    if (down) {
      this.location.y += this.speed;
      moved = true;
      this.location.y = Math.min(screenAdjustment.gameHeight, this.location.y);
    }

    // Handle horizontal movement
    if (left) {
      this.location.x -= this.speed;
      moved = true;
      this.location.x = Math.max(0, this.location.x);

      // Team 2 boundary
      if (this.location.x < gameWidth / 2 + 25 && this.team === 2) {
        this.location.x = gameWidth / 2 + 25;
      }
    }

    if (right) {
      this.location.x += this.speed;
      moved = true;
      this.location.x = Math.min(screenAdjustment.gameWidth, this.location.x);

      // Team 1 boundary
      if (
        this.location.x > screenAdjustment.gameWidth / 2 - 25 &&
        this.team === 1
      ) {
        this.location.x = gameWidth / 2 - 25;
      }
    }

    // Update direction based on key combinations
    if (up && right) {
      this.direction = "up-right";
    } else if (up && left) {
      this.direction = "up-left";
    } else if (down && right) {
      this.direction = "down-right";
    } else if (down && left) {
      this.direction = "down-left";
    } else if (up) {
      this.direction = "up";
    } else if (down) {
      this.direction = "down";
    } else if (left) {
      this.direction = "left";
    } else if (right) {
      this.direction = "right";
    }

    // Handle speed acceleration/deceleration
    if (isMoving) {
      this.speed = Math.min(this.speed + this.acceleration, this.maxSpeed);
    } else {
      this.speed = Math.max(this.speed - this.deceleration, 0);
    }

    if (moved || this.speed > 0) {
      this.render();
    }
  }
  shoot(alive: boolean): Bullet | null {

    const audio = new Audio("../assets/shootSound.mp3");
    audio.play();

    if (!alive) return null;

    const bulletSize = 8;
    const centerX = this.location.x + this.width / 2 - bulletSize / 2;
    const centerY = this.location.y + this.height / 2 - bulletSize / 2;
    let startX = centerX;
    let startY = centerY;


    switch (this.direction) {
      case "up":
        startY = this.location.y - bulletSize;
        startX = centerX;
        break;
      case "down":
        startY = this.location.y + this.height;
        startX = centerX;
        break;
      case "left":
        startX = this.location.x - bulletSize;
        startY = centerY;
        break;
      case "right":
        startX = this.location.x + this.width;
        startY = centerY;
        break;
      case "up-right":
        startX = this.location.x + this.width;
        startY = this.location.y - bulletSize;
        break;
      case "up-left":
        startX = this.location.x - bulletSize;
        startY = this.location.y - bulletSize;
        break;
      case "down-right":
        startX = this.location.x + this.width;
        startY = this.location.y + this.height;
        break;
      case "down-left":
        startX = this.location.x - bulletSize;
        startY = this.location.y + this.height;
        break;
    }

    return new Bullet(this.direction, 5, startX, startY);
  }

  isHitBy(bullet: Bullet): boolean {
    if (!this.isAlive) return false;

    const bulletX = bullet.position.x;
    const bulletY = bullet.position.y;

    const hitboxPadding = 10;

    return (
      bulletX + 8 > this.location.x + hitboxPadding &&
      bulletX < this.location.x + this.width - hitboxPadding &&
      bulletY + 8 > this.location.y + hitboxPadding &&
      bulletY < this.location.y + this.height - hitboxPadding
    );
  }

  destroy() {
    this.isAlive = false;
    if (this.playerElement) {
      this.playerElement.remove();
      this.playerElement = undefined;
    }
  }

  ////////////////////////////////////////////
  //////////// VIEW //////////////////////////
  ////////////////////////////////////////////

  render() {
    if (!this.isAlive) return;
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
      "facing-right",
      "facing-up-right",
      "facing-up-left",
      "facing-down-right",
      "facing-down-left"
    );

    this.playerElement.classList.add("facing-" + this.direction);

    this.lastDirection = this.direction;

    this.playerElement.style.left = this.location.x + "px";
    this.playerElement.style.top = this.location.y + "px";
  }
  setMoveSound() {
    if (!this.moveSound) {
      this.moveSound = this.getMoveSound();
      this.moveSound.loop = true;
    }
    if (this.moveSound.paused) {
      this.moveSound.currentTime = 0;
      this.moveSound.play();
    }
  }

  stopMoveSound() {
    if (this.moveSound && !this.moveSound.paused) {
      this.moveSound.pause();
      this.moveSound.currentTime = 0;
    }
  }

  getMoveSound() {
    return new Audio("../assets/movingSound.mp3");
  }
}

////////////////////////////////////////////
//////////// CONTROLLER ////////////////////
////////////////////////////////////////////

const tankB = new Tank(
  "../assets/enemyTank.png",
  50,
  50,
  Number(localStorage.getItem("tankB-speed") ?? 0),
  "right",
  { x: 10, y: 5 },
  { up: "w", down: "s", left: "a", right: "d" },
  1
);

const tankA = new Tank(
  "../assets/playerTank.png",
  50,
  50,
  Number(localStorage.getItem("tankA-speed") ?? 0),
  "left",
  { x: 1100, y: 0 },
  { up: "ArrowUp", down: "ArrowDown", left: "ArrowLeft", right: "ArrowRight" },
  2
);

const bullets: Bullet[] = [];

let tankAShootReady = true;
let tankBShootReady = true;

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && tankAShootReady) {
    if (tankA.isAlive) {
      const bullet = tankA.shoot(true);
      if (bullet) bullets.push(bullet);
      tankAShootReady = false;
    }
  }

  if (e.key === " " && tankBShootReady) {
    if (tankB.isAlive) {
      const bullet = tankB.shoot(true);
      if (bullet) bullets.push(bullet);
      tankBShootReady = false;
    }
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key === "Enter") tankAShootReady = true;
  if (e.key === " ") tankBShootReady = true;
});

window.addEventListener("resize", () => {
  screenAdjustment.adjustGameWidthAndHeight();
});

function hitBulledHitTank() {
  const audio = new Audio("../assets/hitSound.mp3");
  audio.play();
}

tankA.setInitialLocation();
tankB.setInitialLocation();
tankA.render();
tankB.render();

const gameLoop = () => {
  tankA.move(screenAdjustment.gameWidth, screenAdjustment.gameHeight);
  tankB.move(screenAdjustment.gameWidth, screenAdjustment.gameHeight);

  tankA.move(screenAdjustment.gameWidth, screenAdjustment.gameHeight);
  tankB.move(screenAdjustment.gameWidth, screenAdjustment.gameHeight);

  bullets.forEach((bullet, index) => {
    bullet.move();

    if (tankA.isAlive && tankA.isHitBy(bullet)) {
      tankA.destroy();
      console.log("A now:", tankAscore);
      hitBulledHitTank();
      if (bullet.element) bullet.element.remove();
      bullets.splice(index, 1);

      showVictory("Player B Wins!");
      tankA.isAlive = false;
      tankB.isAlive = false;
      return;
    }

    if (tankB.isAlive && tankB.isHitBy(bullet)) {
      tankB.destroy();
      hitBulledHitTank();
      if (bullet.element) bullet.element.remove();
      bullets.splice(index, 1);

      showVictory("Player A Wins!");
      tankA.isAlive = false; 
      tankB.isAlive = false; 
      
      return;
    }

    if (bullet.hitTheWall()) {
      if (bullet.element) bullet.element.remove();
      bullets.splice(index, 1);
    }
  });

  if (tankA.keysPressed.size > 0 && tankA.isAlive) {
    tankA.setMoveSound();
  } else {
    tankA.stopMoveSound();
  }

  if (tankB.keysPressed.size > 0 && tankB.isAlive) {
    tankB.setMoveSound();
  } else {
    tankB.stopMoveSound();
  }
  requestAnimationFrame(gameLoop);
};

function showVictory(winner: string) {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
  overlay.style.backdropFilter = "blur(5px)";
  overlay.style.display = "flex";
  overlay.style.flexDirection = "column";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.zIndex = "9999";
  overlay.style.color = "white";
  overlay.style.fontSize = "3rem";
  overlay.style.fontFamily = "sans-serif";
  overlay.style.textAlign = "center";

  const message = document.createElement("div");
  message.textContent = `${winner} 🏆`;

  const restartBtn = document.createElement("button");
  restartBtn.textContent = "Restart";
  restartBtn.style.marginTop = "20px";
  restartBtn.style.padding = "10px 20px";
  restartBtn.style.fontSize = "1.2rem";
  restartBtn.style.cursor = "pointer";
  restartBtn.style.border = "none";
  restartBtn.style.borderRadius = "8px";
  restartBtn.style.background = "#28a745";
  restartBtn.style.color = "white";
  restartBtn.addEventListener("click", () => {
    window.location.reload();
  });

  overlay.appendChild(message);
  overlay.appendChild(restartBtn);
  document.body.appendChild(overlay);
}

gameLoop();
