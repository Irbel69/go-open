async function buildRoute(){

    const req = buildOverpassApiUrl(travelOptions.vehicle);
    console.log(req);
    showNotification("Fetching data...");
    var obj;

    while (fetching){
        console.log("Waiting");
        await sleep(100);
    }

    console.log(travelOptions.startingNode, "start");
    console.log(travelOptions.endingNode, "end");


    await fetch(req)
    .then(response => response.json())
    .then(data => {
        obj=data;
    })
    .catch(error => {
        console.log(error);
        hideNotification();
    });
    
    console.log(obj);
    showNotification("Applying algorithm...");

    if (travelOptions.algorithm == "dijkstra")
    console.log("dijkstra")
    ;
    else if (travelOptions.algorithm == "a-star")
        aStar(obj, travelOptions.startingNode, travelOptions.endingNode, travelOptions.process);
    ;

    document.querySelector("#new-route-button").style.display = "block";

}
