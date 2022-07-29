async function aStar(startingNode, endingNode, process){

    var nodeTree = {};
    
    nodeTree[startingNode] = {};
    nodeTree[startingNode].realCost = 0;
    nodeTree[startingNode].predecesor = startingNode;
    nodeTree[startingNode].cost = nodeTree[startingNode].realCost  + distance(mapNodes[startingNode].lat, mapNodes[endingNode].lat, mapNodes[startingNode].lon, mapNodes[endingNode].lon);
    nodeTree[startingNode].visited = true;
    
    var actualNode = startingNode;


    while (actualNode != endingNode){

        var nextNodeSelector = [];

        mapNodes[actualNode].colidantNodes.forEach(element => {
            if (!(Object.keys(nodeTree).includes(String(element)))){

                nodeTree[element] = {};
                nodeTree[element].realCost = nodeTree[actualNode].realCost + distance(mapNodes[actualNode].lat, mapNodes[element].lat, mapNodes[actualNode].lon, mapNodes[element].lon);
                nodeTree[element].predecesor = actualNode;
                nodeTree[element].cost = nodeTree[element].realCost + distance(mapNodes[element].lat, mapNodes[endingNode].lat, mapNodes[element].lon, mapNodes[endingNode].lon);
                nodeTree[element].visited = false;

                nextNodeSelector.push([element, nodeTree[element].cost]);
            }
        });
        
        Object.keys(nodeTree).forEach(element => {
            //console.log(Object.keys(nodeTree));
            //console.log(element);
            if (!nodeTree[element].visited)
                nextNodeSelector.push([element, nodeTree[element].cost]);
        });
        //console.log("nextNodeSelector", nextNodeSelector);

        nodeTree[actualNode].visited = true;
        //console.log("AA", actualNode, mapNodes[actualNode]);
        L.circle([mapNodes[actualNode].lat, mapNodes[actualNode].lon], 20).addTo(map);

        if (nextNodeSelector.length == 0){
            //console.log(mapNodes[actualNode]);
            //console.log("Node now", actualNode);
            actualNode = nodeTree[actualNode].predecesor;
            //console.log("Predecesor", nodeTree[actualNode].predecesor);
            //console.log(Object.keys(nodeTree));
            //console.log(nodeTree);
            break;
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
        nodeTree[actualNode].visited = true;
        await sleep(10);
    }
    L.circle([mapNodes[endingNode].lat, mapNodes[endingNode].lon], 20).addTo(map);

    alert("Final!");
}