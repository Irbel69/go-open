async function aStar(startingNode, endingNode, process){

    console.log(mapNodes[startingNode].colidantNodes);

    var nodeTree = {};
    
    nodeTree[startingNode] = {};
    nodeTree[startingNode].realCost = 0;
    nodeTree[startingNode].predecesor = startingNode;
    nodeTree[startingNode].cost = nodeTree[startingNode].realCost  + distance(mapNodes[startingNode].lat, mapNodes[endingNode].lat, mapNodes[startingNode].lon, mapNodes[endingNode].lon);
    nodeTree[startingNode].visited = true;
    
    var actualNode = startingNode;
    L.circle([mapNodes[actualNode].lat, mapNodes[actualNode].lon], 20, {color: "blue", opacity:.5}).addTo(map);



    while (actualNode != endingNode){

        var nextNodeSelector = [];

        mapNodes[actualNode].colidantNodes.forEach(element => {
            if (  !(Object.keys(nodeTree).includes(String(element))) || (nodeTree[element].visited == false && nodeTree[element].realCost < nodeTree[actualNode].realCost + distance(mapNodes[actualNode].lat, mapNodes[element].lat, mapNodes[actualNode].lon, mapNodes[element].lon))){

                nodeTree[element] = {};
                nodeTree[element].realCost = nodeTree[actualNode].realCost + distance(mapNodes[actualNode].lat, mapNodes[element].lat, mapNodes[actualNode].lon, mapNodes[element].lon);
                nodeTree[element].predecesor = actualNode;
                nodeTree[element].cost = nodeTree[element].realCost + distance(mapNodes[element].lat, mapNodes[endingNode].lat, mapNodes[element].lon, mapNodes[endingNode].lon)*1.5;
                nodeTree[element].visited = false;

                nextNodeSelector.push([String(element), nodeTree[element].cost]);
            }
        });
        
        Object.keys(nodeTree).forEach(element => {
            if (!nodeTree[element].visited)
                nextNodeSelector.push([element, nodeTree[element].cost]);
        });


        nodeTree[actualNode].visited = true;
        if (process)
            map.addLayer(new L.Polyline([new L.LatLng(mapNodes[actualNode].lat, mapNodes[actualNode].lon), new L.LatLng(mapNodes[nodeTree[actualNode].predecesor].lat, mapNodes[nodeTree[actualNode].predecesor].lon)], {
                color: 'red',
                weight: 3,
                opacity: 1,
                smoothFactor: 1
            }));

        if (nextNodeSelector.length == 0){
            actualNode = nodeTree[actualNode].predecesor;
        }
        else{
            var nextNodeCost = nextNodeSelector[0][1];
            actualNode = nextNodeSelector[0][0];


            nextNodeSelector.forEach(element => {
                if ((element[1] < nextNodeCost)){
                    nextNodeCost = element[1];
                    actualNode = element[0];
                }
            });
        }
        if (process) await sleep(100);
    }

    while (actualNode != startingNode){
        map.addLayer(new L.Polyline([new L.LatLng(mapNodes[actualNode].lat, mapNodes[actualNode].lon), new L.LatLng(mapNodes[nodeTree[actualNode].predecesor].lat, mapNodes[nodeTree[actualNode].predecesor].lon)], {
            color: 'blue',
            weight: 6,
            opacity: 1,
            smoothFactor: 1
        }));
        actualNode = nodeTree[actualNode].predecesor;
    }

    alert("Final!");
}