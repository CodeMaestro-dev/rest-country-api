const COUNTRY_CONTAINER = document.getElementById("country-container");
const LOADER = document.getElementById("loader");
let COUNTRY_CARD;
// const THEME = localStorage.getItem("theme");
let COUNTRY_NAME;

async function fetchData() {
  try {
    const RESPONSE = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital");
    const DATA = await RESPONSE.json();
    DATA.map((country) => {
      LOADER.style.display = "none";
      COUNTRY_CONTAINER.innerHTML += `
      <div class="bg-white w-full rounded-md shadow-md country-card">
      <div class="h-[150px] md:h-[230px]">
          <img src="${country.flags.png}" alt="${country.flags.alt}" class="rounded-t-md w-full h-full cursor-pointer" onclick="displayMoreInformation('${country.name.official}')"/>
      </div>
      <div class="h-1/2 flex flex-col gap-3 px-5 pt-5 pb-12">
          <h2 class="font-bold text-lg">${country.name.official}</h2>
          <div class="flex flex-col gap-2">
          <p>Population: ${country.population}</p>
          <p>Region: ${country.region}</p>
          <p>Capital: ${country.capital[0]}</p>
      </div>
  </div>
      `;
      COUNTRY_NAME = `${country.name.common}`;
    });
    COUNTRY_CARD = document.querySelectorAll(".country-card");
    themeHandler();
  } catch (error) {
    console.error(error);
    if (error) {
      LOADER.style.display = "none";
      COUNTRY_CONTAINER.innerHTML = `
      <div class="w-full flex items-center h-screen">
      <h1 class="text-2xl text-red-500 w-full text-center mt-10">Internal Server Error. Consider refresshing the page to do the fecthing again</h1>;
      </div>`;
    }
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
  if (!localStorage.getItem("theme") || localStorage.getItem("theme") === "light") {
    localStorage.setItem("theme", "dark");
  } else if (localStorage.getItem("theme") === "dark") {
    localStorage.setItem("theme", "light");
  }
  themeHandler();
});

function themeHandler() {
  if (localStorage.getItem("theme") === "dark") {
    HEADER.classList.remove("bg-white");
    HEADER.classList.add("bg-dark-blue");
    H1.classList.add("text-white");
    THEME_TOGGLE.classList.add("text-white");
    MAIN.classList.remove("bg-lmbg-very-light-gray");
    MAIN.classList.add("bg-dmbg-very-dark-blue");
    SEARCH_DIV.classList.remove("bg-white");
    SEARCH_DIV.classList.add("text-white");
    SEARCH_DIV.classList.add("bg-dark-blue");
    SELECT.classList.add("bg-dark-blue");
    SELECT.classList.remove("bg-white");
    SELECT.classList.add("text-white");
    for (let CARD of COUNTRY_CARD) {
      CARD.classList.remove("bg-white");
      CARD.classList.add("bg-dark-blue");
      CARD.classList.add("text-white");
    }
  } else {
    HEADER.classList.add("bg-white");
    HEADER.classList.remove("bg-dark-blue");
    H1.classList.remove("text-white");
    THEME_TOGGLE.classList.remove("text-white");
    MAIN.classList.add("bg-lmbg-very-light-gray");
    MAIN.classList.remove("bg-dmbg-very-dark-blue");
    SEARCH_DIV.classList.add("bg-white");
    SEARCH_DIV.classList.remove("text-white");
    SEARCH_DIV.classList.remove("bg-dark-blue");
    SELECT.classList.remove("bg-dark-blue");
    SELECT.classList.add("bg-white");
    SELECT.classList.remove("text-white");
    for (let CARD of COUNTRY_CARD) {
      CARD.classList.add("bg-white");
      CARD.classList.remove("bg-dark-blue");
      CARD.classList.remove("text-white");
    }
  }
}

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
    if (error) {
      LOADER.style.display = "none";
      COUNTRY_CONTAINER.innerHTML = `
      <div class="w-full flex items-center h-screen">
      <h1 class="text-2xl text-red-500 w-full text-center mt-10">Internal Server Error. Consider refresshing the page to do the fecthing again</h1>;
      </div>`;
    }
  }
});

const SELECT_FORM = document.getElementById("select-form");
const FILTER_COUNTRY = document.getElementById("filter-country");

FILTER_COUNTRY.addEventListener("input", () => {
  const FILTER = FILTER_COUNTRY.options[FILTER_COUNTRY.selectedIndex].text;
  COUNTRY_CONTAINER.innerHTML = "";
  LOADER.style.display = "flex";

  async function fetchRegion() {
    try {
      const RESPONSE = await fetch(`https://restcountries.com/v3.1/region/${FILTER}`);
      const DATA = await RESPONSE.json();
      DATA.map((country) => {
        LOADER.style.display = "none";
        COUNTRY_CONTAINER.innerHTML += `
            <div class="bg-white w-full rounded-md shadow-md country-card">
                <div class="h-[150px] md:h-[230px]">
                    <img src="${country.flags.png}" alt="${country.flags.alt}" class="rounded-t-md w-full h-full cursor-pointer" onclick="displayMoreInformation('${country.name.official}')"/>
                </div>
                <div class="h-1/2 flex flex-col gap-3 px-5 pt-5 pb-12">
                    <h2 class="font-bold text-lg">${country.name.official}</h2>
                    <div class="flex flex-col gap-2">
                    <p>Population: ${country.population}</p>
                    <p>Region: ${country.region}</p>
                    <p>Capital: ${country.capital}</p>
                </div>
            </div>
        `;
        // localStorage.setItem("country", `${country.name.common}`);
        COUNTRY_NAME = `${country.name.common}`;
      });
      COUNTRY_CARD = document.querySelectorAll(".country-card");
    } catch (error) {
      console.error(error);
      if (error) {
        LOADER.style.display = "none";
        COUNTRY_CONTAINER.innerHTML = `
        <div class="w-full flex items-center h-screen">
        <h1 class="text-2xl text-red-500 w-full text-center mt-10">Internal Server Error. Consider refresshing the page to do the fecthing again</h1>;
        </div>`;
      }
    }
  }

  fetchRegion();
});
