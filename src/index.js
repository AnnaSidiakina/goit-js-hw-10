import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// console.log(fetchCountries);

const DEBOUNCE_DELAY = 300;

const search = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

search.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function cleanMarkup(ref) {
  ref.innerHTML = '';
}

function onInput(event) {
  const name = event.target.value.trim();

  if (!name) {
    cleanMarkup(countryList);
    cleanMarkup(countryInfo);
    return;
  }

  fetchCountries(name)
    .then(data => {
      console.log(data);
      if (data.length >= 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      renderMarkup(data);
    })
    .catch(error => {
      cleanMarkup(countryList);
      cleanMarkup(countryInfo);
      Notify.failure('Oops, there is no country with that name');
    });

  //   console.log(name);
}

function renderMarkup(data) {
  if (data.length === 1) {
    cleanMarkup(countryList);
    const markupInfo = createCountryInfo(data);
    countryInfo.innerHTML = markupInfo;
  } else {
    cleanMarkup(countryInfo);
    const markupList = createCountryList(data);
    countryList.innerHTML = markupList;
  }
}

function createCountryList(data) {
  return data
    .map(
      ({ name, flags }) =>
        `<li><img src = "${flags.svg}" alt="${name.official}" width='30' height='20'>${name.official}</li>`
    )
    .join('');
}

function createCountryInfo(data) {
  return data.map(
    ({ name, capital, population, flags, languages }) =>
      `<h1><img src="${flags.svg}" alt="${
        name.official
      } width="40" height="25">${name.official}</h1>
      <p>Capital: <span> ${capital}</span></p>
      <p>Population: <span> ${population}</span></p>
      <p>Languages: <span> ${Object.values(languages).join(', ')}</span></p>`
  );
}
