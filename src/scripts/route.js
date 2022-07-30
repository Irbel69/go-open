var mapNodes = {};
var mapWays = {}; //declared here to be have a global access

async function buildRoute(){

showNotification("Fetching map data...");


    const req = buildOverpassApiUrl(travelOptions.vehicle);
    console.log(req);
    obj = {};

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



    //Data "parsing" in order to have a quicker access
    showNotification("Parsing data...");
    
    obj.elements.forEach(element => {
        if (element.type == "node")
            mapNodes[element.id] = {
                "lat": element.lat, 
                "lon": element.lon,
                "colidantNodes": []
            };
    });
    obj.elements.forEach(element => {
        if (element.type == "way"){
            mapWays[element.id] = {
                "nodes": element.nodes,
                "tags": element.tags
            };
            for(let i=0; i<element.nodes.length; i++){
                try{
                    if (element.nodes[i-1] != undefined && ((element.tags.oneway != "yes") || travelOptions.vehicle != "car"))
                        mapNodes[element.nodes[i]].colidantNodes.push(element.nodes[i-1]);
                } finally {}
                try{
                    if (element.nodes[i+1] != undefined)
                        mapNodes[element.nodes[i]].colidantNodes.push(element.nodes[i+1]);
                } finally {}
            }
        }
    });
    delete obj; 

    //getting closest nodes

    var startClosestDistance = distance(travelOptions.start[0], mapNodes[Object.keys(mapNodes)[0]].lat, travelOptions.start[1], mapNodes[Object.keys(mapNodes)[0]].lon);
    var startNode = Object.keys(mapNodes)[0];
    Object.keys(mapNodes).forEach(element => {
        var elementDist = distance(travelOptions.start[0], mapNodes[element].lat, travelOptions.start[1], mapNodes[element].lon);
        if (elementDist < startClosestDistance){
            startClosestDistance = elementDist;
            startNode = element;
        }
    });

    var endClosestDistance = distance(travelOptions.end[0], mapNodes[Object.keys(mapNodes)[0]].lat, travelOptions.end[1], mapNodes[Object.keys(mapNodes)[0]].lon);
    var endNode = Object.keys(mapNodes)[0];
    Object.keys(mapNodes).forEach(element => {
        var elementDist = distance(travelOptions.end[0], mapNodes[element].lat, travelOptions.end[1], mapNodes[element].lon);
        if (elementDist < endClosestDistance){
            endClosestDistance = elementDist;
            endNode = element;
        }
    });



    showNotification("Applying algorithm...");
    await sleep(10);
    if (travelOptions.algorithm == "dijkstra")
    console.log("dijkstra")
    ;
    else if (travelOptions.algorithm == "a-star")
        aStar(startNode, endNode, travelOptions.process);
    ;

    document.querySelector("#new-route-button").style.display = "block";

}
