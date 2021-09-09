"use strict";

const inputField = document.querySelector(".link-shorten__field");

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

  console.log(shortenLink);
};
