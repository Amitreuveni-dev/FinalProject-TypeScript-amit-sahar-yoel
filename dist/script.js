var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameMap = /** @class */ (function () {
    function GameMap() {
    }
    return GameMap;
}());
var Tank = /** @class */ (function () {
    function Tank() {
    }
    return Tank;
}());
var PlayerTank = /** @class */ (function (_super) {
    __extends(PlayerTank, _super);
    function PlayerTank() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PlayerTank;
}(Tank));
var EnemyTank = /** @class */ (function (_super) {
    __extends(EnemyTank, _super);
    function EnemyTank() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EnemyTank;
}(Tank));
var Wall = /** @class */ (function () {
    function Wall() {
    }
    return Wall;
}());
