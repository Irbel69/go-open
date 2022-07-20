const provider = new GeoSearch.OpenStreetMapProvider();

const form = document.querySelector('form');
const input = document.querySelector('#search-engine-input');
const result = document.querySelector("#search-engine-results");

form.addEventListener('submit', function (e){
  e.preventDefault();
});

input.addEventListener('input', async (e) => {
  result.innerHTML="<div class='loading-screen'><div class='loader'></div> <p>Searching results...</p></div>";
  var i1 = input.value;
  await sleep(200);
  if (i1 != input.value)
    return 0; //stop function
  window.stop(); //in order to stop other previous requests
  const results = await provider.search({ query: input.value}); //this migth trhow an error if the order stop order has been executed;
  console.log(results);
  result.innerHTML="";
  if (results.length==0){
    console.log("empty")
    result.innerHTML="<div class='no-results-screen'><i class='fa-solid fa-magnifying-glass'></i><p>No results for this search :( <br>Contribute in <a href='https://www.openstreetmap.org' target='_blank'>OSM</a>!</p></div>";
  }
  for (let i=0; i<results.length; i++){
    result.innerHTML += `
    <div class='search-engine-location' id='location-${i}'>
      ${results[i].label}
    <div>
    `.replace(input.value, `<b>${input.value}</b>`);
  }
  for (let i=0; i<results.length; i++){
    document.getElementById(`location-${i}`).addEventListener("click", function(){
      const d = distance(results[i].bounds[0][0], results[i].bounds[1][0], results[i].bounds[0][1], results[i].bounds[1][1]);
      var zoom = (-((Math.log(d/40075))/(Math.log(2))))+1;
      if (zoom > 18)
        zoom = 18;
      map.flyTo([results[i].y, results[i].x], zoom);
      result.innerHTML = "";
    });
  }
});

input.addEventListener("keydown", function(e){
  if (e.code == "Escape")
    result.innerHTML = "";
  else if (e.code == "Enter")
    console.log("Finish this");
})
  