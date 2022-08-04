document.querySelector("#new-route-button").addEventListener("click", function(){
    document.querySelector(".other-buttons-panel").classList.toggle("disabled");
    document.querySelector(".planning-route-panel").classList.toggle("active");
});



document.querySelector("#hide-route-panel").addEventListener("click", function(){
    document.querySelector(".other-buttons-panel").classList.toggle("disabled");
    document.querySelector(".planning-route-panel").classList.toggle("active");
});

document.querySelectorAll(".route-btn").forEach(element => 
    element.addEventListener("click", function(e){
        if (element == document.querySelectorAll(".route-btn")[0])
            return 0;
        document.querySelectorAll(".route-btn").forEach(el => {
            el.classList.remove("route-btn-selected");
        });
        element.classList.add("route-btn-selected");
        //element.style.border = "1px solid #1868df";
    })
);


