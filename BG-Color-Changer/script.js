function f(color){
    document.body.style.backgroundColor = color;
}

function addColor(){
    const color = document.getElementById("color_custom").value;
    const button = document.createElement("button");
    button.style.backgroundColor = color;
    button.style.color = "white";
    button.style.padding = "15px";
    button.style.cursor = "pointer";
    button.style.borderRadius = "15px";
    button.textContent = color;
    button.onclick = function(){f(color)};
    document.getElementById("buttons").appendChild(button);
}