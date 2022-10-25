const tilesProviders = {
    osm: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
    googleStreets: ["http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"],
    googleHybrid: ["http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"],
    googleSatelite: ["http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"],
    googleTerrain: ["http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"],
    googleTrafic: ["https://{s}.google.com/vt/lyrs=m@221097413,traffic&x={x}&y={y}&z={z}"],
    terrain: ["http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],
    darkMode: ["https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"]
};

let map = L.map("map").setView([41.61674, 0.62218], 13);


L.tileLayer(tilesProviders.googleStreets[0], {
    maxZoom: 18,
    subdomains:['mt0','mt1','mt2','mt3']
    //detectRetina: true blurry map on mobile devices
}).addTo(map);


document.querySelector("div.leaflet-control-attribution a").innerHTML="<a target='_blank' href='https://github.com/Irbel69/go-open'>Marcel Gruñeiro</a>";


//show in html

