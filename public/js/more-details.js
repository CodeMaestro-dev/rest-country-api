const COUNTRY_CONTAINER = document.getElementById("country-container");
const COUNTRY = new URLSearchParams(window.location.search).get("country");
const LOADER = document.getElementById("loader");
const THEME = localStorage.getItem("theme");

let loaded = false;

async function fetchData() {
  try {
    const RESPONSE = await fetch(`https://restcountries.com/v3.1/name/${COUNTRY}`);
    console.log(RESPONSE);
    const DATA = await RESPONSE.json();
    // console.log(DATA);
    DATA.map((country) => {
      LOADER.style.display = "none";
      COUNTRY_CONTAINER.innerHTML += `
        <div class="w-full lg:w-1/3">
        <img src="${country.flags.svg}" alt="${country.flags.alt}" class="w-full h-full" />
      </div>
      <div class="w-full lg:w-2/3 py-6 flex flex-col gap-10 justify-center">
        <h2 class="font-bold text-2xl">${country.name.common}</h2>
        <div class="flex-column md:flex-row gap-36 ">
          <div class="flex flex-col gap-2">
            <p class="text-md">
              <span class="font-bold"> 
                Native Name: 
                ${Object.entries(country.name.nativeName)[0][1].common}
              </span>
            </p>
            <p class="text-md">
              <span class="font-bold"> Population:</span>
              ${country.population}
            </p>
            <p class="text-md">
              <span class="font-bold"> Region:</span>
              ${country.region}
            </p>
            <p class="text-md">
              <span class="font-bold">Sub Region:</span>
              ${country.subregion}
            </p>
            <p class="text-md">
              <span class="font-bold"> Capital:</span>
              ${country.capital}
            </p>
          </div>
          <div class="flex flex-col gap-2">
            <p class="text-md">
              <span class="font-bold"> Top Level Domain:</span>
              ${country.tld[0]}
            </p>
            <p class="text-md">
              <span class="font-bold"> Currencies:</span>
              ${Object.entries(country.currencies)[0][1].name}
            </p>
            <p class="text-md flex flex-col lg:flex-row">
              <span class="font-bold"> Languages:</span>
              ${Object.entries(country.languages)[0][1]}
            </p>
          </div>
        </div>
        <div class="flex flex-col lg:flex-row items-start lg:items-center gap-4">
          <p class="me-4 font-bold">Bored Countires:</p>
          <div class="flex flex-col md:flex-row">
          </div>
        </div>
      </div>

        `;
    });
    themeHandler();
  } catch (error) {
    console.error(error);
    if (error) {
      LOADER.style.display = "none";
      COUNTRY_CONTAINER.innerHTML = `<h1 class="text-2xl text-red-500 w-full text-center mt-10">Internal Server Error. Consider refresshing the page to do the fecthing again</h1>`;
    }
  }
}

fetchData();

const THEME_TOGGLE = document.getElementById("theme-toggle");
const HEADER = document.querySelector("header");
const H1 = document.querySelector("h1");
const MAIN = document.querySelector("main");
const COUNTRY_CONTAIN = document.getElementById("country-container");
const BACK_BUTTON = document.getElementById("back-button");
// const SELECT = document.querySelector("select");

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
    MAIN.classList.add("text-white");
  } else {
    HEADER.classList.add("bg-white");
    HEADER.classList.remove("bg-dark-blue");
    H1.classList.remove("text-white");
    THEME_TOGGLE.classList.remove("text-white");
    MAIN.classList.add("bg-lmbg-very-light-gray");
    MAIN.classList.remove("bg-dmbg-very-dark-blue");
    MAIN.classList.remove("text-white");
  }
}
