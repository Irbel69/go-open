function createPath(l){
    var nodes = [];
    l.forEach(element => {
        nodes.push(element[0]);
    });

    console.log(nodes);
    var result = [];
    
    Object.keys(mapWays).forEach(way => {
        nodes.forEach(node => {
            if (mapWays[way].nodes.includes(parseInt(node)))
                result.push(mapWays[way].tags);
        });
    });
    return result;
}

function displayPath(l){
    console.log(l);
    console.log(createPath(l))
}

function getStreetTags(node){
    Object.keys(mapWays).forEach(element => {
        if (mapWays[element].nodes.includes(node))
            return mapWays.tags;
    });
}