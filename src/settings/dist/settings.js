var _a;
//setting of the speed save it to the local storage
document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("settingsForm");
    var inputA = document.getElementById("tankA-speed");
    var inputB = document.getElementById("tankB-speed");
    // טעינה מה־localStorage בעת פתיחת הדף
    var savedA = localStorage.getItem("tankA-speed");
    var savedB = localStorage.getItem("tankB-speed");
    if (savedA !== null)
        inputA.value = savedA;
    if (savedB !== null)
        inputB.value = savedB;
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        localStorage.setItem("tankA-speed", inputA.value);
        localStorage.setItem("tankB-speed", inputB.value);
        console.log("A now:", inputA.value);
        console.log("B now:", inputB.value);
    });
});
//reset button make the local storage to be 0.2 = tank speed is 0.2
(_a = document.getElementById("resetBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    localStorage.setItem("tankA-speed", "0.2");
    localStorage.setItem("tankB-speed", "0.2");
    location.reload();
});
