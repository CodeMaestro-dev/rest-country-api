const COUNTRY_CONTAINER = document.getElementById("country-container");
const LOADER = document.getElementById("loader");
let COUNTRY_CARD;
const THEME = localStorage.getItem("theme");
let COUNTRY_NAME;

async function fetchData() {
  try {
    const RESPONSE = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital");
    const DATA = await RESPONSE.json();
    // console.log(DATA);

    DATA.map((country) => {
      LOADER.style.display = "none";
      COUNTRY_CONTAINER.innerHTML += `
              <div class="bg-white w-full rounded-md shadow-md country-card">
                  <div class="h-[230px]">
                      <img src="${country.flags.png}" alt="${country.flags.alt}" class="rounded-t-md w-full h-full cursor-pointer" onclick="displayMoreInformation('${country.name.official}')"/>
                  </div>
                  <div class="h-1/2 flex flex-col gap-3 px-5 pt-5 pb-12 border-red-500">
                      <h2 class="font-bold text-lg">${country.name.official}</h2>
                      <div class="flex flex-col gap-2">
                      <p>Population: ${country.population}</p>
                      <p>Region: ${country.region}</p>
                      <p>Capital: ${country.capital[0]}</p>
                  </div>
              </div>
      `;
      // localStorage.setItem("country", `${country.name.common}`);
      COUNTRY_NAME = `${country.name.common}`;
    });
    COUNTRY_CARD = document.querySelectorAll(".country-card");
  } catch (error) {
    console.error(error);
  }
}

fetchData();

const THEME_TOGGLE = document.getElementById("theme-toggle");
const HEADER = document.querySelector("header");
const H1 = document.querySelector("h1");
const MAIN = document.querySelector("main");
const SEARCH_DIV = document.getElementById("search-div");
const SELECT = document.querySelector("select");

THEME_TOGGLE.addEventListener("click", () => {
  if (THEME === "dark") {
    localStorage.setItem("theme", "light");
  } else if (THEME === "light") {
    localStorage.setItem("theme", "dark");
  }
  HEADER.classList.toggle("bg-white");
  HEADER.classList.toggle("bg-dark-blue");
  H1.classList.toggle("text-white");
  THEME_TOGGLE.classList.toggle("text-white");
  MAIN.classList.toggle("bg-lmbg-very-light-gray");
  MAIN.classList.toggle("bg-dmbg-very-dark-blue");
  SEARCH_DIV.classList.toggle("bg-white");
  SEARCH_DIV.classList.toggle("text-white");
  SEARCH_DIV.classList.toggle("bg-dark-blue");
  SELECT.classList.toggle("bg-dark-blue");
  SELECT.classList.toggle("bg-white");
  SELECT.classList.toggle("text-white");
  for (let CARD of COUNTRY_CARD) {
    CARD.classList.toggle("bg-white");
    CARD.classList.toggle("bg-dark-blue");
    CARD.classList.toggle("text-white");
  }
});

function displayMoreInformation(country) {
  window.location.href = `./more-details.html?country=${country}`;
}

const SEARCH_FORM = document.getElementById("search-form");
const SEARCH = document.getElementById("country-search");
let SEARCH_WORD;

SEARCH.addEventListener("input", (e) => {
  SEARCH_WORD = e.target.value;
});

SEARCH_FORM.addEventListener("submit", async (e) => {
  e.preventDefault();
  COUNTRY_CONTAINER.innerHTML = "";
  LOADER.style.display = "flex";

  try {
    const RESPONSE = await fetch(`https://restcountries.com/v3.1/name/${SEARCH_WORD}`);
    const DATA = await RESPONSE.json();
    // console.log(DATA);

    DATA.map((country) => {
      LOADER.style.display = "none";
      COUNTRY_CONTAINER.innerHTML += `
              <div class="bg-white w-full rounded-md shadow-md country-card">
                  <div class="h-[230px]">
                      <img src="${country.flags.png}" alt="${country.flags.alt}" class="rounded-t-md w-full h-full cursor-pointer" onclick="displayMoreInformation('${country.name.official}')"/>
                  </div>
                  <div class="h-1/2 flex flex-col gap-3 px-5 pt-5 pb-12 border-red-500">
                      <h2 class="font-bold text-lg">${country.name.official}</h2>
                      <div class="flex flex-col gap-2">
                      <p>Population: ${country.population}</p>
                      <p>Region: ${country.region}</p>
                      <p>Capital: ${country.capital[0]}</p>
                  </div>
              </div>
      `;
      // localStorage.setItem("country", `${country.name.common}`);
      COUNTRY_NAME = `${country.name.common}`;
    });
    COUNTRY_CARD = document.querySelectorAll(".country-card");
  } catch (error) {
    console.error(error);
  }
});
