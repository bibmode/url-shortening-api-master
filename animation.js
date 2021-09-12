"use strict";

const title = document.querySelector(".statistics__title");
const text = document.querySelector(".statistics__text");
const cards = document.querySelector(".statistics__cards");
const staticticsSection = document.querySelector(".statistics");

document.addEventListener("scroll", () => {
  const clientHeight = document.documentElement.clientHeight;
  const sectionHeight = staticticsSection.getBoundingClientRect();

  if (sectionHeight.top < clientHeight / 2) {
    title.style.animation = "0.7s ease-in slideDown forwards";
    text.style.animation = "0.7s ease-in 0.7s slideDown forwards";
    cards.style.animation = "0.7s ease-in 1s showUp forwards";
  }
});
