"use strict";

const inputField = document.querySelector(".link-shorten__field");
const inputButton = document.querySelector(".link-shorten__btn");
const inputError = document.querySelector(".link-shorten__error");
const appDiv = document.querySelector(".app");

const loader = document.querySelector(".loader");

let countResults = 0;

//////////////////////////////////////////////////////////////
// FUNCTIONS

// Get Data from API
const getData = async function (userLink) {
  try {
    loader.style.display = "flex";
    inputField.style.display = "none";
    inputButton.style.display = "none";

    const dataSource = await fetch(
      `https://api.shrtco.de/v2/shorten?url=${userLink}`
    );

    loader.style.display = "none";
    inputField.style.display = "block";
    inputButton.style.display = "block";

    const { ok, result } = await dataSource.json();

    if (!ok) throw new Error("An error occured please try again");

    const shortenLink = result.short_link;
    showResult(userLink, shortenLink);
    countResults++;
  } catch (err) {
    console.log(err);
    showError("An error occured. Please try again!");
  }
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

const showError = function (message) {
  inputField.classList.add("errorField");
  inputError.classList.remove("hidden");
  inputError.innerHTML = message;
};

const useData = function () {
  if (inputField.value.trim() !== "") {
    getData(inputField.value.trim());
    inputField.value = "";
    inputField.blur();
  } else {
    showError("Please add a link");
  }
};

//////////////////////////////////////////////////////////////
// EVENT LISTENERS

inputField.addEventListener("click", () => {
  inputField.classList.remove("errorField");
  inputError.classList.add("hidden");
});

inputField.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    useData();
  }
});

inputButton.addEventListener("click", () => {
  useData();
});
