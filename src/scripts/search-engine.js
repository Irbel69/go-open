const provider = new GeoSearch.OpenStreetMapProvider();


const form = document.querySelector('form');
const input = form.querySelector('#search-engine-input');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const results = await provider.search({ query: input.value });
  console.log(results); // » [{}, {}, {}, ...]
});