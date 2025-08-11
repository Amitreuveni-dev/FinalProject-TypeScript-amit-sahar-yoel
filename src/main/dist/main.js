var Tank = /** @class */ (function () {
    function Tank(tankImageUrl, width, height, speed, direction, location, controls) {
        var _this = this;
        this.keysPressed = new Set();
        this.lastDirection = "none";
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
        window.addEventListener("keydown", function (event) {
            if ([
                _this.controls.up,
                _this.controls.down,
                _this.controls.left,
                _this.controls.right,
            ].includes(event.key)) {
                _this.keysPressed.add(event.key);
            }
        });
        window.addEventListener("keyup", function (event) {
            _this.keysPressed["delete"](event.key);
        });
    }
    Tank.prototype.move = function (gameWidth, gameHeight) {
        var moved = false;
        var isMoving = this.keysPressed.size > 0;
        if (this.keysPressed.has(this.controls.up)) {
            this.location.y -= this.speed;
            moved = true;
            this.direction = "up";
            if (this.location.y < 0)
                this.location.y = gameHeight;
        }
        if (this.keysPressed.has(this.controls.down)) {
            this.location.y += this.speed;
            moved = true;
            this.direction = "down";
            if (this.location.y > gameHeight)
                this.location.y = 0;
        }
        if (this.keysPressed.has(this.controls.left)) {
            this.location.x -= this.speed;
            moved = true;
            this.direction = "left";
            if (this.location.x < 0)
                this.location.x = gameWidth;
        }
        if (this.keysPressed.has(this.controls.right)) {
            this.location.x += this.speed;
            moved = true;
            this.direction = "right";
            if (this.location.x > gameWidth)
                this.location.x = 0;
        }
        // Acceleration / Deceleration
        if (isMoving) {
            this.speed = Math.min(this.speed + this.acceleration, this.maxSpeed);
        }
        else {
            this.speed = Math.max(this.speed - this.deceleration, 0);
        }
        if (moved || this.speed > 0) {
            this.render();
        }
    };
    Tank.prototype.render = function () {
        var container = document.querySelector(".tanksRoot");
        if (!container) {
            console.error("tank container not found");
            return;
        }
        if (!this.playerElement) {
            this.playerElement = document.createElement("div");
            this.playerElement.className = "tank";
            this.playerElement.style.position = "absolute";
            this.playerElement.style.width = this.width + "px";
            this.playerElement.style.height = this.height + "px";
            this.playerElement.style.backgroundImage = "url(" + this.tankImageUrl + ")";
            this.playerElement.style.backgroundSize = "contain";
            this.playerElement.style.backgroundRepeat = "no-repeat";
            this.playerElement.style.backgroundPosition = "center";
            container.appendChild(this.playerElement);
        }
        this.updatePosition();
    };
    Tank.prototype.updatePosition = function () {
        if (!this.playerElement)
            return;
        // Remove previous direction classes
        this.playerElement.classList.remove("facing-up", "facing-down", "facing-left", "facing-right");
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
        this.playerElement.style.left = this.location.x + "px";
        this.playerElement.style.top = this.location.y + "px";
    };
    return Tank;
}());
// ==============================
// =========  CONTROLLER =========
// ==============================
var GAME_WIDTH = 1121;
var GAME_HEIGHT = 657;
var tankA = new Tank("../assets/playerTank.png", 50, 50, 0.2, "left", { x: 1100, y: 0 }, { up: "ArrowUp", down: "ArrowDown", left: "ArrowLeft", right: "ArrowRight" });
var tankB = new Tank("../assets/enemyTank.png", 50, 50, 0.2, "right", { x: 10, y: 5 }, { up: "w", down: "s", left: "a", right: "d" });
tankA.render();
tankB.render();
function gameLoop() {
    tankA.move(GAME_WIDTH, GAME_HEIGHT);
    tankB.move(GAME_WIDTH, GAME_HEIGHT);
    requestAnimationFrame(gameLoop);
}
gameLoop();
