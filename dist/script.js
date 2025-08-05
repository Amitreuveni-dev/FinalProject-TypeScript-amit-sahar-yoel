var Player = /** @class */ (function () {
    function Player(startX, startY) {
        this.location = { x: startX, y: startY };
        this.width = 30;
        this.height = 30;
        this.speed = 5;
    }
    Player.prototype.render = function (container) {
        this.playerElement = document.createElement("div");
        this.playerElement.className = "game-player";
        container.appendChild(this.playerElement);
    };
    Player.prototype.move = function (moveX, moveY) {
        this.location.x += moveX;
        this.location.y += moveY;
        this.updatePosition();
    };
    Player.prototype.updatePosition = function () {
        this.playerElement.style.left = this.location.x + "px";
        this.playerElement.style.top = this.location.y + "px";
    };
    return Player;
}());
var player = new Player(0, 0);
console.log(player);
