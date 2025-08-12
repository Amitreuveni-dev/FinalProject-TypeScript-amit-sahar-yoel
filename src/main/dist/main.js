var Tank = /** @class */ (function () {
    function Tank(tankImageUrl, width, height, baseSpeed, initialDirection, initialLocation, controls, team) {
        var _this = this;
        this.speed = 0;
        this.lastDirection = "none";
        this.keysPressed = new Set();
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
        this.team = team;
        window.addEventListener("keydown", function (e) {
            if (e.key === _this.controls.up ||
                e.key === _this.controls.down ||
                e.key === _this.controls.left ||
                e.key === _this.controls.right) {
                _this.keysPressed.add(e.key);
            }
        });
        window.addEventListener("keyup", function (e) {
            _this.keysPressed["delete"](e.key);
        });
    }
    Tank.prototype.move = function (gameWidth, gameHeight) {
        var _a, _b, _c;
        var moved = false;
        var isMoving = this.keysPressed.size > 0;
        if (this.keysPressed.has(this.controls.up)) {
            this.location.y -= this.speed;
            moved = true;
            if (this.keysPressed.has(this.controls.up) && this.keysPressed.has(this.controls.right)) {
                this.direction = "up-right";
            }
            else {
                this.direction = "up";
            }
            if (this.location.y < 0)
                this.location.y = 0;
            ;
        }
        if (this.keysPressed.has(this.controls.down)) {
            this.location.y += this.speed;
            moved = true;
            this.direction = "down";
            (_a = this.playerElement) === null || _a === void 0 ? void 0 : _a.classList.toggle("tankColorChangeDown");
            if (this.location.y > gameHeight - 9)
                this.location.y = gameHeight - 9;
        }
        if (this.keysPressed.has(this.controls.left)) {
            this.location.x -= this.speed;
            moved = true;
            if (this.keysPressed.has(this.controls.up) && this.keysPressed.has(this.controls.left)) {
                this.direction = "up-left";
            }
            else if (this.keysPressed.has(this.controls.down) && this.keysPressed.has(this.controls.left)) {
                this.direction = "down-left";
            }
            else {
                this.direction = "left";
            }
            (_b = this.playerElement) === null || _b === void 0 ? void 0 : _b.classList.toggle("tankColorChangeLeft");
            if (this.location.x < 0)
                this.location.x = 0;
            if (this.location.x < gameWidth / 2 + 20 && this.team == 1)
                this.location.x = gameWidth / 2 + 20;
        }
        if (this.keysPressed.has(this.controls.right)) {
            this.location.x += this.speed;
            moved = true;
            if (this.keysPressed.has(this.controls.up) && this.keysPressed.has(this.controls.right)) {
                this.direction = "up-right";
            }
            else if (this.keysPressed.has(this.controls.down) && this.keysPressed.has(this.controls.right)) {
                this.direction = "down-right";
            }
            else {
                this.direction = "right";
            }
            (_c = this.playerElement) === null || _c === void 0 ? void 0 : _c.classList.toggle("tankColorChangeRight");
            if (this.location.x > gameWidth)
                this.location.x = gameWidth;
            if (this.location.x > gameWidth / 2 - 20 && this.team == 2)
                this.location.x = gameWidth / 2 - 20;
        }
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
            console.error("container .tanksRoot לא נמצא ב־DOM");
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
        this.playerElement.classList.remove("facing-up", "facing-down", "facing-left", "facing-right", "facing-up-right", "facing-up-left", "facing-down-right", "facing-down-left");
        this.playerElement.classList.add("facing-" + this.direction);
        this.lastDirection = this.direction;
        this.playerElement.style.left = this.location.x + "px";
        this.playerElement.style.top = this.location.y + "px";
    };
    return Tank;
}());
var GAME_WIDTH = 1114;
var GAME_HEIGHT = 660;
var tankA = new Tank("../assets/playerTank.png", 50, 50, 0.2, "left", { x: 1100, y: 0 }, { up: "ArrowUp", down: "ArrowDown", left: "ArrowLeft", right: "ArrowRight" }, 1);
var tankB = new Tank("../assets/enemyTank.png", 50, 50, 0.2, "right", { x: 10, y: 5 }, { up: "w", down: "s", left: "a", right: "d" }, 2);
tankA.render();
tankB.render();
function gameLoop() {
    tankA.move(GAME_WIDTH, GAME_HEIGHT);
    tankB.move(GAME_WIDTH, GAME_HEIGHT);
    requestAnimationFrame(gameLoop);
}
gameLoop();
