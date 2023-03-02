//1. import terminal library:
// import anime from '../uppgifter/node_modules/animejs/lib/anime.es.js'
// anime ({
//     targets: 'h1',
//     rotate: 360,
//     duration: 3000
// })

//2. 
import anime from '../uppgifter/node_modules/animejs/lib/anime.es.js'
import udnercore from '../uppgifter/node_modules/underscore/underscore-esm.js'

anime ({
    targets: 'div',
    rotate: 350,
    Duration: 5000
})


const form = document.querySelector('form');
const langInput = document.querySelector('#input');
const container = document.querySelector('#container');
form.addEventListener('submit', async (event) => {
    event.preventDefault();


    const lang = langInput.value;
    const countries = await fetchCountries(lang);

    const divs = document.createElement('div');

    const sortedCountries = sortCountries(countries);
    sortedCountries.forEach(country => {
        const countryDiv = document.createElement('div');
        countryDiv.textContent = `${country.name.common} (${country.population})`;
        // divs.append(countryDiv);
    });

    const biggestCountries = getBiggestCountries(sortedCountries);
    biggestCountries.forEach(country => {
        const countryDiv = document.createElement('div');
        countryDiv.textContent = `${country.name.common} (${country.population})`;
        divs.append(countryDiv);
    });

    container.append(divs);
})

async function fetchCountries(lang) {
    const url = `https://restcountries.com/v3.1/lang/${lang}`;

    const response = await fetch(url);
    const countries = await response.json();

    return countries;
}

function sortCountries(countryArray) {
    const countryClone = [...countryArray];
    return countryClone.sort((a, b) => b.population - a.population);
}

function getBiggestCountries(countryArray) {
    return [countryArray[0], countryArray[1], countryArray[2]];
}