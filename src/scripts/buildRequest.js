function buildOverpassApiUrl(vehicleId) {
    var bounds = map.getBounds().getSouth() + ',' + map.getBounds().getWest() + ',' + map.getBounds().getNorth() + ',' + map.getBounds().getEast();
    return `
      https://www.overpass-api.de/api/interpreter?data=
      [out:json];
      ( 
      way${buildOverpassQuery(vehicleId)}(${bounds});
      );
      out body;
      >;
      out skel qt;`
    .replace("\n", "").replace(" ","");
  }
  
function buildOverpassQuery(vehicleId){
  if (vehicleId=="car")
    return `["highway"]`;
  else if (vehicleId == "walking")
    return `["highway"]["highway"!="motorway"]["highway"!="trunk"]`;

}
  //https://www.overpass-api.de/api/interpreter?data=[out:json];way(41.6004,0.5881,41.6298,0.6555);out%20meta;
/*
fetch('https://www.overpass-api.de/api/interpreter?data=[out:json];way(41.6004,0.5881,41.6298,0.6555);out%20meta;')
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.log(error));



*/




//https://www.overpass-api.de/api/interpreter?data=[out:json];(node["highway"](41.6004,0.5881,41.6298,0.6555);way["highway"](41.6004,0.5881,41.6298,0.6555);relation["highway"](41.6004,0.5881,41.6298,0.6555););

//https://www.overpass-api.de/api/interpreter?data=[out:json][timeout:25];(node["highway"](41.6004,0.5881,41.6298,0.6555);way["highway"](41.6004,0.5881,41.6298,0.6555);relation["highway"](41.6004,0.5881,41.6298,0.6555););out body;>;out skel qt;