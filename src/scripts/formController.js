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
    cleanError();
    var valid = true;
    var errorMessage = "";

    travelOptions.algorithm = document.getElementById("select-1658324317245").value;
    travelOptions.process = document.getElementById("show-process-checkbox").checked;    

    try {
        travelOptions.vehicle = document.querySelector(".route-btn-selected").id;
    } catch (error) {
        vehiclePanelError();
        errorMessage += "❌ Please, select the vehicle.";
        console.log(error);
        valid = false;
    }   
    
    try {
        if (travelOptions.start.length == 0){
            const n = 1;
            n.replace(2,""); //You can't replace a int (force to catch)
        }
    } catch (error) {
        startPositionError();
        errorMessage += "<br>❌ Please, select your initial position from the map.";
        console.log(error);
        valid = false;
    }

    try {
        if (travelOptions.end.length == 0){
            const n = 1;
            n.replace(2,""); //You can't replace a int (force to catch)
        }
    } catch (error) {
        destinationPositionError();
        errorMessage += "<br>❌ Please, select your destination point from the map.";
        console.log(error);
        valid = false;
    }


    if (valid){
        await sleep(200);
        document.querySelector(".planning-route-panel").classList.toggle("active");
        document.querySelector(".other-buttons-panel").classList.toggle("disabled");
        buildRoute();
    }
});


function formError(errorMessage){
    document.getElementById("form-error-message").innerHTML = errorMessage;
    document.getElementById("form-error-message").style.visibility = "inherit";
}

function cleanError(){
    document.getElementById("form-error-message").style.visibility = "hidden";
}

async function locationInputComplete(s, travelOptions, lat, lon, booleanMarker, overrideName){
    
    if (travelOptions[s][2] != undefined)
        map.removeLayer(travelOptions[s][2]);

    const marker = booleanMarker? L.marker([lat,lon]).addTo(map) : undefined;

    travelOptions[s] = [lat, lon, marker];
    console.log(overrideName);
    if (overrideName != undefined)
        document.querySelector(`#${s}-location p`).innerHTML = overrideName
    else
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


async function vehiclePanelError(){
    document.querySelector(".route-buttons").style.backgroundColor = "#ff8c8c69";
    document.querySelector(".route-buttons").style.color = "red";
    await sleep(1000);
    document.querySelector(".route-buttons").style.backgroundColor = "white";
    document.querySelector(".route-buttons").style.color = "#707070";
}

async function startPositionError(){
    document.querySelector("#start-location").style.backgroundColor = "#ff8c8c69";
    document.querySelector(".location-input").style.color = "red";
    await sleep(1000);
    document.querySelector("#start-location").style.backgroundColor = "white";
    document.querySelector(".location-input").style.color = "#707070";
}

async function destinationPositionError(){
    document.querySelector("#end-location").style.backgroundColor = "#ff8c8c69";
    document.querySelectorAll(".location-input")[1].style.color = "red";
    await sleep(1000);
    document.querySelector("#end-location").style.backgroundColor = "white";
    document.querySelectorAll(".location-input")[1].style.color = "#707070";
}