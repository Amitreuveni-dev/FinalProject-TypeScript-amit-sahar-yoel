var Login = /** @class */ (function () {
    function Login(username, password) {
        this.correctUsername = "admin";
        this.correctPassword = "1234";
        this.username = username;
        this.password = password;
    }
    Login.prototype.checkCredentials = function () {
        return (this.username === this.correctUsername &&
            this.password === this.correctPassword);
    };
    return Login;
}());
document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("loginDetails");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var username = document.getElementById("username");
        var password = document.getElementById("password");
        var loginInput = new Login(username.value, password.value);
        if (loginInput.checkCredentials()) {
            // alert("loged in")
            window.location.href = "../main/main.html";
            form.reset();
            return;
        }
        alert("try again");
        form.reset();
    });
});
document.addEventListener("DOMContentLoaded", function () {
    var usernameInput = document.getElementById("username");
    var passwordInput = document.getElementById("password");
    var loginButton = document.querySelector("button[type='submit']");
    function toggleButtonState() {
        var isFormValid = usernameInput.value.trim() !== "" && passwordInput.value.trim() !== "";
        loginButton.disabled = !isFormValid;
    }
    usernameInput.addEventListener("input", toggleButtonState);
    passwordInput.addEventListener("input", toggleButtonState);
});
