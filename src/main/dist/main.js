////////////////////////////////////////////
//////////// MODEL /////////////////////////
////////////////////////////////////////////
var Bullet = /** @class */ (function () {
    function Bullet(direction, speed, startX, startY) {
        this.position = { x: startX, y: startY };
        this.direction = direction;
        this.speed = speed;
    }
    Bullet.prototype.move = function () {
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
            default:
                console.error("Invalid direction for bullet movement");
        }
        this.render();
    };
    Bullet.prototype.hitTheWall = function () {
        if (this.position.x < 0 ||
            this.position.x > GAME_WIDTH ||
            this.position.y < 0 ||
            this.position.y > GAME_WIDTH) {
            return true;
        }
        return false;
    };
    Bullet.prototype.render = function () {
        if (!this.element) {
            this.element = document.createElement("div");
            this.element.classList = "bullet";
            this.element.style.position = "absolute";
            document.body.appendChild(this.element);
        }
        this.element.style.left = this.position.x + "px";
        this.element.style.top = this.position.y + "px";
    };
    return Bullet;
}());
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
        var moved = false;
        var isMoving = this.keysPressed.size > 0;
        if (this.keysPressed.has(this.controls.up)) {
            this.location.y -= this.speed;
            moved = true;
            this.direction = "up";
            if (this.location.y < 0)
                this.location.y = 0;
        }
        if (this.keysPressed.has(this.controls.down)) {
            this.location.y += this.speed;
            moved = true;
            this.direction = "down";
            if (this.location.y > gameHeight)
                this.location.y = gameHeight;
        }
        if (this.keysPressed.has(this.controls.left)) {
            this.location.x -= this.speed;
            moved = true;
            this.direction = "left";
            if (this.location.x < 0)
                this.location.x = 0;
            if (this.location.x < gameWidth / 2 && this.team == 1)
                this.location.x = gameWidth / 2;
        }
        if (this.keysPressed.has(this.controls.right)) {
            this.location.x += this.speed;
            moved = true;
            this.direction = "right";
            if (this.location.x > gameWidth)
                this.location.x = gameWidth;
            if (this.location.x > gameWidth / 2 && this.team == 2)
                this.location.x = gameWidth / 2;
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
    Tank.prototype.shoot = function () {
        return new Bullet(this.direction, 5, this.location.x + this.width / 2, this.location.y + this.height / 2);
    };
    ////////////////////////////////////////////
    //////////// VIEW //////////////////////////
    ////////////////////////////////////////////
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
        this.playerElement.classList.remove("facing-up", "facing-down", "facing-left", "facing-right");
        this.playerElement.classList.add("facing-" + this.direction);
        this.lastDirection = this.direction;
        this.playerElement.style.left = this.location.x + "px";
        this.playerElement.style.top = this.location.y + "px";
    };
    return Tank;
}());
////////////////////////////////////////////
//////////// CONTROLLER ////////////////////
////////////////////////////////////////////
var GAME_WIDTH = 1114;
var GAME_HEIGHT = 660;
var bullets = [];
var tankA = new Tank("../assets/playerTank.png", 50, 50, 0.2, "left", { x: 1100, y: 0 }, { up: "ArrowUp", down: "ArrowDown", left: "ArrowLeft", right: "ArrowRight" }, 1);
var tankB = new Tank("../assets/enemyTank.png", 50, 50, 0.2, "right", { x: 10, y: 5 }, { up: "w", down: "s", left: "a", right: "d" }, 2);
document.addEventListener("keypress", function (e) {
    if (e.key === "enter")
        bullets.push(tankA.shoot());
    if (e.key === " ")
        bullets.push(tankB.shoot());
});
function gameLoop() {
    tankA.move(GAME_WIDTH, GAME_HEIGHT);
    tankB.move(GAME_WIDTH, GAME_HEIGHT);
    requestAnimationFrame(gameLoop);
}
////////////////////////////////////////////
//////////// INIT //////////////////////////
////////////////////////////////////////////
tankA.render();
tankB.render();
gameLoop();
