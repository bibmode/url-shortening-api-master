"use strict";

const inputField = document.querySelector(".link-shorten__field");
const appDiv = document.querySelector(".app");

let countResults = 0;

inputField.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    getUserInput(inputField.value);
    inputField.value = "";
    inputField.blur();
  }
});

const getUserInput = async function (userLink) {
  const dataSource = await fetch(
    `https://api.shrtco.de/v2/shorten?url=${userLink}`
  );
  const data = await dataSource.json();
  const shortenLink = data.result.short_link;

  showResult(userLink, shortenLink);
  countResults++;
};

const showResult = function (userLink, shortenLink) {
  const arr = shortenLink.split(/\W/g);
  const generateId = arr[arr.length - 1];

  const html = `<div class="result negative-margin" id="${generateId}">
          <h3 class="result__input heading-3">
            ${userLink}
          </h3>
          <h3 class="result__link heading-3">${shortenLink}</h3>
          <button class="result__btn btn-cyan">Copy</button>
        </div>`;

  appDiv.insertAdjacentHTML("beforeend", html);
  if (countResults > 0) {
    document
      .querySelector(`#${generateId}`)
      .classList.remove("negative-margin");
  }
};
