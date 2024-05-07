let titleH1;
let episodeIdSpan;
let directorSpan;
let producerSpan;
let releaseDateSpan;
let openingCrawlDiv;

const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  titleH1 = document.querySelector('span#title');
  episodeIdSpan = document.querySelector('span#episode_id');
  directorSpan = document.querySelector('span#director');
  producerSpan = document.querySelector('span#producer');
  releaseDateSpan = document.querySelector('span#release_date');
  openingCrawlDiv = document.querySelector('span#opening_crawl');
  charactersList = document.querySelector('#characters');

  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getFilm(id)
});
async function getFilm(id) {
    let film;
    let characters;
    try {
      film = await fetchFilm(id);
      characters = await fetchCharacters(id); // Fetch characters data
    } catch (ex) {
      console.error(`Error reading film ${id} data.`, ex.message);
    }
    renderFilm(film);
    renderCharacters(characters); // Render characters
  }

async function fetchCharacters(id) {
    const charactersUrl = `${baseUrl}/films/${id}/characters`;
    return await fetch(charactersUrl)
    .then(res => res.json());
}

async function fetchFilm(id) {
  const filmUrl = `${baseUrl}/films/${id}`;
  return await fetch(filmUrl)
    .then(res => res.json())
}


const renderFilm = film => {
  document.title = `SWAPI - ${film?.title}`;  
  titleH1.textContent = film?.title;
  episodeIdSpan.textContent = film?.episode_id;
  directorSpan.textContent = film?.director;
  producerSpan.textContent = film?.producer;
  releaseDateSpan.textContent = film?.release_date;
  openingCrawlDiv.textContent = film?.opening_crawl;
}

const renderCharacters = characters => {
    charactersList.innerHTML = ''; // Clear existing characters list
    characters.forEach(character => {
      const listItem = document.createElement('li');
      listItem.textContent = character.name;
      charactersList.appendChild(listItem);
    });
  }


