var mapNodes = {};
var mapWays = {}; //declared here to be have a global access

async function buildRoute(){

    showNotification("Fetching node positions...");
    while (fetching1 || fetching2){
        console.log("Waiting...");
        await sleep(100);
    }

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
                    if (element.nodes[i-1] != undefined && element.tags.oneway != "yes")
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


    showNotification("Applying algorithm...");
    await sleep(10);
    if (travelOptions.algorithm == "dijkstra")
    console.log("dijkstra")
    ;
    else if (travelOptions.algorithm == "a-star")
        aStar(travelOptions.startNode, travelOptions.endNode, travelOptions.process);
    ;

    document.querySelector("#new-route-button").style.display = "block";

}
