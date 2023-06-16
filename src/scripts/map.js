const tilesProviders = {
    osm: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png", "Open Street Map"],
    googleStreets: ["http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", "Google Streets"],
    googleHybrid: ["http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}", "Google Hybrid"],
    googleSatelite: ["http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", "Google Satelite"],
    googleTerrain: ["http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}", "Google Terrain"],
    googleTrafic: ["https://{s}.google.com/vt/lyrs=m@221097413,traffic&x={x}&y={y}&z={z}", "Google Trafic"],
    terrain: ["http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", "Terrain"],
    darkMode: ["https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png", "Dark Mode"]
};

let map = L.map("map").setView([51.507351, -0.127758], 15);


var tile = L.tileLayer(tilesProviders.osm[0], {
    maxZoom: 18,
    subdomains:['mt0','mt1','mt2','mt3']
    //detectRetina: true blurry map on mobile devices
}).addTo(map);


document.querySelector("div.leaflet-control-attribution a").innerHTML="<a target='_blank' href='https://github.com/Irbel69/go-open'>Marcel Gruñeiro</a>";


//show in html  
/*
Object.values(tilesProviders).forEach(element => {
    document.querySelector(".map-selection-container").innerHTML += `
    <div class='map-container'>
        <div map>
    <div>
    `;
});*/
function setHTMLmaps(){                     
    let i =0;
    for (const [key, value] of Object.entries(tilesProviders)) {
        document.querySelector(".map-selection-container").innerHTML += `
        <div class='map-own-container' id='map-own-container-${i}'>
            <div id='map-${i}' class='selection-map'>
                <img src='img/${key}.png'>
                <p>${value[1]}</p>
            </div>
        </div>
        `;
        console.log("got", document.getElementById(`map-own-container-${i}`));
        i++;
    }                                       
}

setHTMLmaps();

function setHTMLmapsTiles(){
    for (let i2=0; i2<Object.values(tilesProviders).length; i2++){
        console.log("Value", Object.values(tilesProviders)[i2][0]);
        document.getElementById(`map-own-container-${i2}`).addEventListener('click', function(){
            map.removeLayer(tile);
            console.log("Value", Object.values(tilesProviders)[i2][0]);
            tile = L.tileLayer(Object.values(tilesProviders)[i2][0], {
                maxZoom: 18,
                subdomains: ['mt0','mt1','mt2','mt3']
                //detectRetina: true blurry map on mobile devices
                }).addTo(map);
        });
    }   
}


setHTMLmapsTiles();