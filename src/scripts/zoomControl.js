
function addControlPlaceholders(map) {
    var corners = map._controlCorners,
        l = 'leaflet-',
        container = map._controlContainer;

    function createCorner(vSide, hSide) {
        var className = l + vSide + ' ' + l + hSide;

        corners[vSide + hSide] = L.DomUtil.create('div', className, container);
    }

    createCorner('verticalcenter', 'bottom');
    createCorner('verticalcenter', 'left');
}

if (L.Browser.mobile){
    map.removeControl(map.zoomControl);
}
else{
    addControlPlaceholders(map);
    // Change the position of the Zoom Control to a newly created placeholder.
    map.zoomControl.setPosition('verticalcenterbottom');

    // You can also put other controls in the same placeholder.
    L.control.scale({position: 'verticalcenterbottom'}).addTo(map);
}

    