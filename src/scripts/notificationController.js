function showNotification(text){
    document.getElementById("notification-text").innerHTML = text;
    document.getElementById("notification").classList.add("active");
}

function hideNotification(){
    document.getElementById("notification").classList.remove("active");
}

document.querySelector("#notification i").addEventListener("click", hideNotification);