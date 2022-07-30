var travelOptions = {
    vehicle: "",
    start: [],
    end: [],
    algorithm: "",
    process: false
};



document.querySelectorAll(".select-location-button").forEach(element => {  
    element.addEventListener("click", function(e){
        document.querySelector(".planning-route-panel").style.display = "none"; //slide
        map.on('click', async function(ev){

            document.querySelector(".planning-route-panel").style.display = "block"; //slide
            map.off('click');


            const latlng = map.mouseEventToLatLng(ev.originalEvent);
            const lat = latlng.lat;
            const lon = latlng.lng 

            const marker = L.marker([lat,lon]).addTo(map); 

            
            if (e.path[0].id == "start-location"){
                if (travelOptions.start.length > 0)
                    map.removeLayer(travelOptions.start[2]);
                travelOptions.start = [lat, lon, marker];
            }
            else {//end-location = id
                if (travelOptions.end.length > 0)
                    map.removeLayer(travelOptions.end[2]);
                travelOptions.end = [lat, lon, marker];
            }
   
        });
    });
});


document.getElementById("calculate-route-button").addEventListener("click", function(){
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
        document.querySelector(".planning-route-panel").style.display = "none";
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