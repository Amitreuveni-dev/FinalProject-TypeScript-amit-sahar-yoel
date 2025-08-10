// ==============================
// ========   MODEL   ==========
// ==============================
var Tank = /** @class */ (function () {
    function Tank(tankImage, width, height, speed, direction, team, location, controls) {
        var _this = this;
        this.keysPressed = new Set();
        this.lastDirection = "none";
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
    Tank.prototype.move = function () {
        var moved = false;
        var isMoving = this.keysPressed.size > 0;
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
        }
        else {
            this.speed = Math.max(this.speed - this.deceleration, 0);
        }
        if (moved || this.speed > 0) {
            this.renderTank();
        }
    };
    Tank.prototype.renderTank = function () {
        var container = document.querySelector(".tanksRoot");
        if (!container) {
            console.error("tank container not found");
            return;
        }
        if (!this.playerElement) {
            this.playerElement = document.createElement("div");
            this.playerElement.className = "tankRoot__tank";
            this.playerElement.style.position = "absolute";
            this.playerElement.style.height = this.height + "px";
            this.playerElement.style.width = this.width + "px";
            this.playerElement.innerHTML = this.tankImage;
            container.appendChild(this.playerElement);
        }
        this.updatePosition();
    };
    Tank.prototype.updatePosition = function () {
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
            this.playerElement.style.left = this.location.x + "px";
            this.playerElement.style.top = this.location.y + "px";
        }
    };
    return Tank;
}());
// ==============================
// =========  VIEW   ============
// ==============================
var tankA = new Tank("<img src='./assets/playerTank.png' alt='playerTank'>", 50, 50, 0.15, "none", 2, //team
{ x: 1000, y: 0 }, {
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight"
});
var tankB = new Tank("<img src='./assets/enemyTank.png' alt='enemyTank'>", 50, 50, 0.15, "none", 2, //team
{ x: 10, y: 5 }, {
    up: "w",
    down: "s",
    left: "a",
    right: "d"
});
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
