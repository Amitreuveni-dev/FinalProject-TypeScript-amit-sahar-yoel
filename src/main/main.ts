////////////////////////////////////////////
//////////// MODEL /////////////////////////
////////////////////////////////////////////

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
    this.gameHeight = 650;
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
    startY: number,
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
      this.initialLocation.x = 8
      this.initialLocation.y = 280;
    }
    if (this.team === 2) {
      this.initialLocation.x = screenAdjustment.gameWidth
      this.initialLocation.y = 280;
    }

  }

  move(gameWidth: number, gameHeight: number) {
    if(!this.isAlive) return;
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
      if (this.location.x > screenAdjustment.gameWidth / 2 - 25 && this.team === 1) {
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
  shoot(alive: boolean): Bullet|null {
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
    if(!this.isAlive) return false;
    
    const bulletX = bullet.position.x;
    const bulletY = bullet.position.y;

    return(
      bulletX + 8 > this.location.x &&
      bulletX < this.location.x + this.width &&
      bulletY + 8 > this.location.y &&
      bulletY < this.location.y + this.height
    );
  }

  destroy() {
    this.isAlive = false;
    if(this.playerElement) {
      this.playerElement.remove();
      this.playerElement = undefined;
    }
  }

  
  
  ////////////////////////////////////////////
  //////////// VIEW //////////////////////////
  ////////////////////////////////////////////
  
  render() {
    if(!this.isAlive) return;
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
}

////////////////////////////////////////////
//////////// CONTROLLER ////////////////////
////////////////////////////////////////////
const tankB = new Tank(
  "../assets/enemyTank.png",
  50,
  50,
  0.2,
  "right",
  { x: 10, y: 5 },
  { up: "w", down: "s", left: "a", right: "d" },
  1
);
const bullets: Bullet[] = []


const tankA = new Tank(
  "../assets/playerTank.png",
  50,
  50,
  0.2,
  "left",
  { x: 1100, y: 0 },
  { up: "ArrowUp", down: "ArrowDown", left: "ArrowLeft", right: "ArrowRight" },
  2
);

document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const bullet = tankA.shoot(tankA.isAlive);
    if (bullet) bullets.push(bullet);
  }
  if (e.key === " ") {
    const bullet = tankB.shoot(tankB.isAlive);
    if (bullet) bullets.push(bullet);
  }
});

window.addEventListener("resize", () => {
  screenAdjustment.adjustGameWidthAndHeight();
});
  
tankA.setInitialLocation();
tankB.setInitialLocation();
tankA.render();
tankB.render();


const gameLoop = () => {

  tankA.move(screenAdjustment.gameWidth, screenAdjustment.gameHeight);
  tankB.move(screenAdjustment.gameWidth, screenAdjustment.gameHeight);

  bullets.forEach((bullet, index) => {
    bullet.move();

    if(tankA.isAlive && tankA.isHitBy(bullet)) {
      tankA.destroy();
      if(bullet.element) bullet.element.remove();
      bullets.splice(index, 1);
      return;
    }

    if(tankB.isHitBy(bullet)) {
      tankB.destroy();
      if(bullet.element) bullet.element.remove();
      bullets.splice(index, 1);
      return;
    }

    if(tankA.isAlive && tankA.isHitBy(bullet)) {
      tankA.destroy();
      if(bullet.element) bullet.element.remove();
      bullets.splice(index, 1);
      return;
    }

    if(tankB.isHitBy(bullet)) {
      tankB.destroy();
      if(bullet.element) bullet.element.remove();
      bullets.splice(index, 1);
      return;
    }

    if (bullet.hitTheWall()) {
      if (bullet.element) bullet.element.remove();
      bullets.splice(index, 1);
    }
  });


  requestAnimationFrame(gameLoop);
};



gameLoop();