const COUNTRY_CONTAINER = document.getElementById("country-container");
const COUNTRY = new URLSearchParams(window.location.search).get("country");
const LOADER = document.getElementById("loader");

let loaded = false;

async function fetchData() {
  try {
    const RESPONSE = await fetch(`https://restcountries.com/v3.1/name/${COUNTRY}`);
    const DATA = await RESPONSE.json();
    console.log(DATA);

    DATA.map((country) => {
      LOADER.style.display = "none";
      COUNTRY_CONTAINER.innerHTML += `
      <div class="w-1/3">
      <img src="${country.flags.svg}" alt="${country.flags.alt}" class="w-full h-full" />
    </div>
    <div class="w-2/3 py-6 flex flex-col gap-10 justify-center">
      <h2 class="font-bold text-2xl">${country.name.common}</h2>
      <div class="flex gap-36">
        <div class="flex flex-col gap-2">
          <p class="text-md">
            <span class="font-bold"> Native Name:</span>
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
          </p>
          <p class="text-md">
            <span class="font-bold">Languages: </span>
            ${country.languages.deu},
            ${country.languages.fra},
            ${country.languages.nld}
          </p>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <p class="me-4 font-bold">Bored Countires:</p>
        <div class="px-6 py-2 flex shadow-md">
          <span>France</span>
        </div>
        <div class="px-6 py-2 flex shadow-md">
          <span>Germany</span>
        </div>
        <div class="px-6 py-2 flex shadow-md">
          <span>Netherlands</span>
        </div>
      </div>
    </div>

      `;
    });
  } catch (error) {
    console.error(error);
  }
}

fetchData();
