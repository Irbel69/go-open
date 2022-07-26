function buildRoute(travelOptions){
    const req = buildOverpassApiUrl(travelOptions.vehicle);
    showNotification("Fetching data...");
    fetch(req)
    .then(response => response.json())
    .then(data => {

        console.log(data);
        showNotification("Applying algorithm...");

    })
    .catch(error => console.log(error));
}
