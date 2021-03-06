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
        map.on('click', function(ev){
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


            document.querySelector(".planning-route-panel").style.display = "block"; //slide
            map.off('click');
        });
    });
});
