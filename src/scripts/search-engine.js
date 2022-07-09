const provider = new GeoSearch.OpenStreetMapProvider();

const form = document.querySelector('form');
const input = form.querySelector('#search-engine-input');


form.addEventListener('submit', async (event) => {

  document.getElementById("search-engine-results").innerHTML = "";

  event.preventDefault();

  const results = await provider.search({ query: input.value });
  for (let i=0; i<results.length; i++){
    console.log(results[i]);
    document.getElementById("search-engine-results").innerHTML += `
    <div class='search-engine-location' id='location-${i}'>
      ${results[i].label}
    <div>
    `;
  }
  for (let i=0; i<results.length; i++){
    document.getElementById(`location-${i}`).addEventListener("click", function(){
      const d = distance(results[i].bounds[0][0], results[i].bounds[1][0], results[i].bounds[0][1], results[i].bounds[1][1]);
      map.flyTo([results[i].y, results[i].x], -((Math.log(d/40075))/(Math.log(2))));
      document.getElementById("search-engine-results").innerHTML = "";
    });
  }
});
  