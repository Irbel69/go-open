function buildOverpassApiUrl(vehicleId) {
    //var bounds = map.getBounds().getSouth() + ',' + map.getBounds().getWest() + ',' + map.getBounds().getNorth() + ',' + map.getBounds().getEast();
    var newBounds = getBounds(travelOptions.start, travelOptions.end);
    var bounds = newBounds.south + "," + newBounds.west + "," + newBounds.north + "," + newBounds.east;
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
  else if (vehicleId == "bike")
    return `["highway"]["highway"!="motorway"]["highway"!="trunk"]`;
}

function getBounds(startNode, endNode){
  var bounds = {};
  var unit = 1/distance(0,0,0,1); //111.19492664455873

  var horitzontalDistance = distance(startNode[0], startNode[0], startNode[1], endNode[1])

  if (horitzontalDistance < 2)
    horitzontalDistance = 2;

  var verticalDistance = distance(startNode[0], endNode[0], startNode[1], startNode[1]);

  if (verticalDistance < 2)
    verticalDistance = 2;

  if (verticalDistance/3 > horitzontalDistance)
    horitzontalDistance = verticalDistance/3;

  if (horitzontalDistance/3 > verticalDistance)
    verticalDistance = horitzontalDistance/3;

    
  var horitzontalMargin =  horitzontalDistance * unit / 2;
  var verticalMargin = verticalDistance * unit / 2;

  if (verticalMargin > 0.5)
    verticalMargin = 0.5;

  if (horitzontalMargin > 0.5)
    horitzontalMargin = 0.5;
 
  //console.log(horitzontalMargin);

  if (startNode[1] < endNode[1]){
    bounds["west"] = startNode[1]-horitzontalMargin*multiplier;
    bounds["east"] = endNode[1]+horitzontalMargin*multiplier;
  }
  else{
    bounds["east"] = startNode[1]+horitzontalMargin*multiplier;
    bounds["west"] = endNode[1]-horitzontalMargin*multiplier;
  }

  if (startNode[0] < endNode[0]){
    bounds["south"] = startNode[0]-verticalMargin*multiplier;
    bounds["north"] = endNode[0]+verticalMargin*multiplier;
  }
  else{
    bounds["north"] = startNode[0]+verticalMargin*multiplier;
    bounds["south"] = endNode[0]-verticalMargin*multiplier;
  }

  if (travelOptions.process){
    map.addLayer(new L.Polyline([new L.LatLng(bounds.south, bounds.west), new L.LatLng(bounds.south, bounds.east)], {
      color: 'blue',
      weight: 3,
      opacity: 1,
      smoothFactor: 1
    }));
    map.addLayer(new L.Polyline([new L.LatLng(bounds.south, bounds.west), new L.LatLng(bounds.north, bounds.west)], {
      color: 'blue',
      weight: 3,
      opacity: 1,
      smoothFactor: 1
    }));
    map.addLayer(new L.Polyline([new L.LatLng(bounds.north, bounds.west), new L.LatLng(bounds.north, bounds.east)], {
      color: 'blue',
      weight: 3,
      opacity: 1,
      smoothFactor: 1
    }));
    map.addLayer(new L.Polyline([new L.LatLng(bounds.north, bounds.east), new L.LatLng(bounds.south, bounds.east)], {
      color: 'blue',
      weight: 3,
      opacity: 1,
      smoothFactor: 1
    }));
  }

  return bounds;
}