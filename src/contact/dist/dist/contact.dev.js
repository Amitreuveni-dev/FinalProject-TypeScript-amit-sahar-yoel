"use strict";

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var contactForm = document.querySelector('.contact__form');

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var formData = new FormData(this);
    var data = Object.fromEntries(formData.entries());
    var savedMessages = JSON.parse(localStorage.getItem("contactMessages") || "[]");
    savedMessages.push(__assign(__assign({}, data), {
      date: new Date().toISOString().slice(0, 10)
    }));
    localStorage.setItem("contactMessages", JSON.stringify(savedMessages));
    alert("Thank you for your message! We'll get back to you soon.");
    this.reset();
  });
}