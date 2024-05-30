# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode _(optional)_

### Links

- Solution URL: (https://rest-country-api-nine-pied.vercel.app/)
- Live Site URL: (https://rest-country-api-nine-pied.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- [Tailwind CSS](https://tailwindcss.com/) - For CSS styling
- Flexbox
- CSS Grid
- Desktop-first workflow

### What I learned

I learned how to use a search params and get search params using Javacript for searching for country details within my work.

```js
function displayMoreInformation(country) {
  window.location.href = `./more-details.html?country=${country}`;
}

const COUNTRY = new URLSearchParams(window.location.search).get("country");
```

### Useful resources

- [StackOverflow](https://stackoverflow.com/questions/38824349/how-to-convert-an-object-to-an-array-of-key-value-pairs-in-javascript) - This helped me for learning how to convert objects to array. I really liked this pattern and will use it going forward.

## Author

- Website - [Tioluwani REST Country API](https://rest-country-api-nine-pied.vercel.app/)

## Acknowledgments

I would specially ike to thank my supervisor at work. Mr. Golden Azubuike for helping me with the idea of using serch params for displying the country details.
