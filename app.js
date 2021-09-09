"use strict";

const inputField = document.querySelector(".link-shorten__field");
const inputButton = document.querySelector(".link-shorten__btn");
const appDiv = document.querySelector(".app");

let countResults = 0;

//////////////////////////////////////////////////////////////
// FUNCTIONS

// Get Data from API
const getData = async function (userLink) {
  const dataSource = await fetch(
    `https://api.shrtco.de/v2/shorten?url=${userLink}`
  );
  const data = await dataSource.json();
  const shortenLink = data.result.short_link;

  showResult(userLink, shortenLink);

  countResults++;
};

// Show Result to UI
const showResult = function (userLink, shortenLink) {
  const arr = shortenLink.split(/\W/g);
  const generatedId = arr[arr.length - 1];

  const html = `<div class="result negative-margin" id="${generatedId}">
          <h3 class="result__input heading-3">
            ${userLink}
          </h3>
          <h3 class="result__link heading-3">${shortenLink}</h3>
          <button class="result__btn btn-cyan">Copy</button>
        </div>`;

  appDiv.insertAdjacentHTML("beforeend", html);

  if (countResults > 0) {
    document
      .querySelector(`[id="${generatedId}"]`)
      .classList.remove("negative-margin");
  }

  const resultDiv = document.querySelector(`[id="${generatedId}"]`);
  copyResult(resultDiv);
};

// Copy result to Clipboard
const copyResult = function (resultDiv) {
  resultDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("result__btn")) {
      const result = resultDiv.querySelector(".result__link").innerHTML;
      const btn = resultDiv.querySelector(".result__btn");

      //copy to clipboard
      navigator.clipboard.writeText(result);

      //change button style for 3 seconds
      btn.innerHTML = "Copied!";
      btn.classList.add("btn-violet");

      setTimeout(() => {
        btn.innerHTML = "Copy";
        btn.classList.remove("btn-violet");
      }, 3000);
    }
  });
};

//////////////////////////////////////////////////////////////
// EVENT LISTENERS
inputField.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    getData(inputField.value);
    inputField.value = "";
    inputField.blur();
  }
});

inputButton.addEventListener("click", () => {
  getData(inputField.value);
  inputField.value = "";
  inputField.blur();
});
