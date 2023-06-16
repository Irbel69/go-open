var userCords = {
    lat: undefined,
    lon: undefined,
    marker: undefined
}

var positioned = false; //variable that controls if the user has been set to the correct initial position on load the app.

if (navigator.geolocation) {
      navigator.geolocation.watchPosition(showPosition, positionError);
} /*else {
    alert("Geolocation is not supported by this browser.");
}*/

function showPosition(position) {
    userCords.lat = position.coords.latitude;
    userCords.lon = position.coords.longitude;
    if (!positioned){
        positioned = true;
        map.setView([userCords.lat, userCords.lon], 13); //at this point the map script will have already been loaded
    }

    if (userCords.marker != undefined)
        map.removeLayer(userCords.marker);
    userCords.marker = L.marker([userCords.lat, userCords.lon], {icon: userPositionIcon}).addTo(map);
    setUserGeolocationToStart(userCords.lat, userCords.lon);
}

async function positionError(err){
    console.log(err);
    if (userCords.marker != undefined)
        map.removeLayer(userCords.marker);
    userCords.lat = undefined;
    userCords.lon = undefined;
    await sleep(5000);
    navigator.geolocation.watchPosition(showPosition, positionError);
}

document.getElementById("user-location-button").addEventListener("click", function() {
    if (navigator.geolocation)
        map.flyTo([userCords.lat, userCords.lon], 18);
    else
     alert("Geolocation is not supported by this browser.");
});


// display circle in the map

var userPositionIcon = L.icon({
    iconUrl: 'img/current-location2.png',
    iconSize:     [50, 50], // size of the icon
    iconAnchor:   [25, 25], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


function setUserGeolocationToStart(lat, lon){
    if (travelOptions.start.length == 0 || document.querySelector("#start-location p").innerHTML == "📍 Your location")
        locationInputComplete("start", travelOptions, lat, lon, false, "📍 Your location");   
}