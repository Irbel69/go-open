[document.getElementById("open-config-panel-button"), document.getElementById("hide-options-panel")].forEach(element => {
    element.addEventListener("click", function(){
        document.querySelector(".config-panel").classList.toggle("active");
        document.querySelector(".other-buttons-panel").classList.toggle("disabled");
    });
})
