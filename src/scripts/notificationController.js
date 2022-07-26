function showNotification(text){
    document.getElementById("notification-text").innerHTML = text;
    document.getElementById("notification").style.display = "flex";
}

function hideNotification(text){
    document.getElementById("notification").style.display = "none";
}

document.querySelector("#notification i").addEventListener("click", hideNotification);