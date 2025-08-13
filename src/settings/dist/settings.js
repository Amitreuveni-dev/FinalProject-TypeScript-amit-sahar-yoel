"use strict";
exports.__esModule = true;
exports.getTankSpeed = exports.setTankSpeed = void 0;
var tankSpeed = 8; // default value
function setTankSpeed(newSpeed) {
    tankSpeed = newSpeed;
}
exports.setTankSpeed = setTankSpeed;
function getTankSpeed(tankSpeed) {
    return tankSpeed;
}
exports.getTankSpeed = getTankSpeed;
