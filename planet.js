// declare variables for HTML elements
let nameH1;
let climateSpan;
let surfaceWaterSpan;
let diameterSpan;
let rotationPeriodSpan;
let terrainSpan;
let gravitySpan;
let orbitalPeriodSpan;
let populationSpan;
let filmsUl;

// URL for API requests
const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  // assign HTML elements to variables
  nameH1 = document.querySelector('h1#name');
  climateSpan = document.querySelector('span#climate');
  surfaceWaterSpan = document.querySelector('span#surface_water');
  diameterSpan = document.querySelector('span#diameter');
  rotationPeriodSpan = document.querySelector('span#rotation_period');
  terrainSpan = document.querySelector('span#terrain');
  gravitySpan = document.querySelector('span#gravity');
  orbitalPeriodSpan = document.querySelector('span#orbital_period');
  populationSpan = document.querySelector('span#population');
  filmsUl = document.querySelector('#films>ul');
  // get planet ID from URL query parameter
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  // fetch planet data and render it
  getPlanet(id)
});

// function to fetch planet data from the API
async function getPlanet(id) {
  let planet;
  try {
    planet = await fetchPlanet(id)
    planet.films = await fetchFilms(planet)
  }
  catch (ex) {
    console.error(`Error reading planet ${id} data.`, ex.message);
  }
  renderPlanet(planet);
}

// function to fetch planet data from the API
async function fetchPlanet(id) {
  let planetUrl = `${baseUrl}/planets/${id}`;
  return await fetch(planetUrl)
    .then(res => res.json())
}

// function to fetch films associated with the planet
async function fetchFilms(planet) {
  const url = `${baseUrl}/planets/${planet?.id}/films`;
  const films = await fetch(url)
    .then(res => res.json())
  return films;
}

// function to render planet data on the web page
const renderPlanet = planet => {
  // set the title of the document to the planet's name
  document.title = `SWAPI - ${planet?.name}`;  
  // update HTML elements with planet data
  nameH1.textContent = planet?.name;
  climateSpan.textContent = planet?.climate;
  surfaceWaterSpan.textContent = planet?.surface_water;
  diameterSpan.textContent = planet?.diameter;
  rotationPeriodSpan.textContent = planet?.rotation_period;
  terrainSpan.textContent = planet?.terrain;
  gravitySpan.textContent = planet?.gravity;
  orbitalPeriodSpan.textContent = planet?.orbital_period;
  populationSpan.textContent = planet?.population;
  // create a list of films associated with the planet
  const filmsLis = planet?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
  // update films list with the created list items
  filmsUl.innerHTML = filmsLis.join("");
}
