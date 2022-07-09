const tilesProvider = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

let map = L.map("map").setView([41.61674, 0.62218], 13);

L.tileLayer(tilesProvider, {
    maxZoom: 18,
}).addTo(map);

