var travelOptions = {
    vehicle: "",
    start: [],
    end: [],
    algorithm: "",
    process: false
};



document.querySelectorAll(".select-location-button").forEach(element => {  
    element.addEventListener("click", function(e){
        document.querySelector(".planning-route-panel").classList.toggle("active"); //slide
        map.on('click', async function(ev){

            document.querySelector(".planning-route-panel").classList.toggle("active"); //slide
            map.off('click');


            const latlng = map.mouseEventToLatLng(ev.originalEvent);
            const lat = latlng.lat;
            const lon = latlng.lng 

        
            if (e.target.id == "start-location"){
                locationInputComplete("start", travelOptions, lat, lon, true);
            }
            else {//end-location = id
                locationInputComplete("end", travelOptions, lat, lon, true);
            }
   
        });
    });
});


document.getElementById("calculate-route-button").addEventListener("click", async function(){
    try {
        travelOptions.vehicle = document.querySelector(".route-btn-selected").id;
        travelOptions.algorithm = document.getElementById("select-1658324317245").value;
        travelOptions.process = document.getElementById("show-process-checkbox").checked;    
        if (travelOptions.start.length == 0 || travelOptions.end.length == 0){
            const n = 1;
            n.replace(2,""); //You can't replace a int (force to catch)
        }
        if (distance(travelOptions.start[0], travelOptions.end[0], travelOptions.start[1], travelOptions.end[1]) < 0.1){
            alert("No point calculating this...");
            const n = 1;
            n.replace(2,""); //You can't replace a int (force to catch)    
        }
        cleanError();
        await sleep(200);
        document.querySelector(".planning-route-panel").classList.toggle("active");
        document.querySelector(".other-buttons-panel").classList.toggle("disabled");
        buildRoute();
    } catch (error) {
        formError();
        console.log(error);
    }
});


function formError(){
    document.getElementById("form-error-message").style.visibility = "inherit";
}
function cleanError(){
    document.getElementById("form-error-message").style.visibility = "hidden";
}

async function locationInputComplete(s, travelOptions, lat, lon, booleanMarker){
    
    if (travelOptions[s][2] != undefined)
        map.removeLayer(travelOptions[s][2]);

    const marker = booleanMarker? L.marker([lat,lon]).addTo(map) : undefined;

    travelOptions[s] = [lat, lon, marker];

    document.querySelector(`#${s}-location p`).innerHTML = "✅​ ​" + await getLatLonName(lat, lon);
    if (document.querySelector(`#${s}-location p`).innerHTML.length > 30)
        document.querySelector(`#${s}-location p`).classList.add("scroll");
}


async function getLatLonName(lat, lon){
    const req=`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
    console.log(req);
    let result;
    await fetch(req)
    .then(response => response.json())
    .then(data => {
        result=data;
    })
    .catch(error => {
        console.log(error);
    });
    return `${result.address.road}, ${result.address.house_number}`.replace(", undefined", "").replace("undefined", result.address.county).replace("undefined", result.address.state);
}