// const name = 'japan';
const base = 'https://restcountries.com/v3.1/';
const endPoint = 'name/';

export default function fetchCountries(name) {
  //   const name = 'japan';
  return fetch(
    `${base}${endPoint}${name}?fields=name,capital,population,flags,languages`
  ).then(res => {
    if (res.status === 404) {
      return Promise.reject(new Error());
    }
    return res.json();
  });
}
