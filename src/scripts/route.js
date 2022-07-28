async function buildRoute(){

    while (fetching1 || fetching2){
        console.log("Waiting...");
        await sleep(100);
    }

    showNotification("Fetching map data...");
    const req = buildOverpassApiUrl(travelOptions.vehicle);
    console.log(req);
    var obj;

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
        aStar(obj, travelOptions.startNode, travelOptions.endNode, travelOptions.process);
    ;

    document.querySelector("#new-route-button").style.display = "block";

}
