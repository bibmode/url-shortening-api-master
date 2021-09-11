"use strict";

const hamburger = document.querySelector(".nav__right--hamburger");
const checkbox = document.querySelector("#nav-checkbox");
const dropDown = document.querySelector(".drop-down");

let checked = 0;

checkbox.addEventListener("change", function () {
  if (this.checked) {
    dropDown.style.opacity = "1";
    dropDown.style.visibility = "visible";
    checked = 1;
  } else {
    dropDown.style.opacity = "0";
    dropDown.style.visibility = "hidden";
    checked = 0;
  }
});

document.addEventListener("click", function (e) {
  if (checked && !dropDown.contains(e.target)) {
    dropDown.style.opacity = "0";
    dropDown.style.visibility = "hidden";
    checked = 0;
  }
});
