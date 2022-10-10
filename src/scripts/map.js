const tilesProvider = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

let map = L.map("map").setView([41.61674, 0.62218], 13);


L.tileLayer(tilesProvider, {
    maxZoom: 18,
    //detectRetina: true blurry map on mobile devices
}).addTo(map);


document.querySelector("div.leaflet-control-attribution a").innerHTML="<a target='_blank' href='https://github.com/Irbel69/go-open'>Marcel Gruñeiro</a>";
