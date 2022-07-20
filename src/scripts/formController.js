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
        waitingForClick = true;
        map.on('click', function(ev){
            console.log("cLICKed");
            const latlng = map.mouseEventToLatLng(ev.originalEvent);
            const lat = latlng.lat;
            const lon = latlng.lng 

            if (e.path[0].id == "start-location")
                travelOptions.start = [lat, lon];
            else //end-location = id
                travelOptions.end = [lat, lon];

            L.marker([lat, lon]).addTo(map);
            document.querySelector(".planning-route-panel").style.display = "block"; //slide
            map.off('click');
            console.log(travelOptions);
        });
    });
});
