async function buildRoute(){

    showNotification("Fetching data...");

    startNode = await getClosestNode(travelOptions.start[0], travelOptions.start[1]);
    console.log(startNode);
    endNode = await getClosestNode(travelOptions.end[0], travelOptions.end[1]);
    console.log(endNode);


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
        aStar(obj, startNode, endNode, travelOptions.process);
    ;

    document.querySelector("#new-route-button").style.display = "block";

}
