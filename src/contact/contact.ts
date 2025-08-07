const contactForm = document.querySelector('.contact__form');

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    const savedMessages = JSON.parse(localStorage.getItem("contactMessages") || "[]");

    savedMessages.push({
      ...data,
      date: new Date().toISOString().slice(0, 10),
    });

    localStorage.setItem("contactMessages", JSON.stringify(savedMessages));

    alert("Thank you for your message! We'll get back to you soon.");
    (this as HTMLFormElement).reset();
  });
}
