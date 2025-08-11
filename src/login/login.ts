class Login {
  username: any;
  password: any;

  private correctUsername = "admin";
  private correctPassword = "1234";

  constructor(username: string, password: any) {
    this.username = username;
    this.password = password;
  }

  checkCredentials(): boolean {
    return (
      this.username === this.correctUsername &&
      this.password === this.correctPassword
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginDetails") as HTMLFormElement;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("username") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const loginInput = new Login(username.value, password.value);
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

document.addEventListener("DOMContentLoaded", () => {
  const usernameInput = document.getElementById("username") as HTMLInputElement;
  const passwordInput = document.getElementById("password") as HTMLInputElement;
  const loginButton = document.querySelector(
    "button[type='submit']"
  ) as HTMLButtonElement;

  function toggleButtonState() {
    const isFormValid =
      usernameInput.value.trim() !== "" && passwordInput.value.trim() !== "";
    loginButton.disabled = !isFormValid;
  }

  usernameInput.addEventListener("input", toggleButtonState);
  passwordInput.addEventListener("input", toggleButtonState);
});
