//setting of the speed save it to the local storage
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("settingsForm") as HTMLFormElement;
  const inputA = document.getElementById("tankA-speed") as HTMLInputElement;
  const inputB = document.getElementById("tankB-speed") as HTMLInputElement;

  // טעינה מה־localStorage בעת פתיחת הדף
  const savedA = localStorage.getItem("tankA-speed");
  const savedB = localStorage.getItem("tankB-speed");
  if (savedA !== null) inputA.value = savedA;
  if (savedB !== null) inputB.value = savedB;

  form.addEventListener("submit", (event) => {
    event.preventDefault();


    localStorage.setItem("tankA-speed", inputA.value);
    localStorage.setItem("tankB-speed", inputB.value);

    console.log("A now:", inputA.value);
    console.log("B now:", inputB.value);
  });
});
//reset button make the local storage to be 0.2 = tank speed is 0.2
document.getElementById("resetBtn")?.addEventListener("click", () => {
  localStorage.setItem("tankA-speed","0.2");
  localStorage.setItem("tankB-speed","0.2");
  location.reload();
});

