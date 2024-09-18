// const axios = require('axios');

async function start(){
    const n = document.getElementById("num").value;
    console.log(n);
    document.querySelector('#root').innerHTML = '';
    for(let i = 0; i<n; i++){
        const data = await mainGET();
        console.log(data);
        const newDIV = createDIV(data.name, data.height, data.mass, data.birth_year, data.gender);
        document.querySelector('#root').appendChild(newDIV);
    }
}

function getRandomInt(n){
    return Math.floor(Math.random()*n);
}

async function mainGET() {
    try{
        let idx = getRandomInt(83)+1
        const response = await axios.get(`https://swapi.dev/api/people/${idx}`);
        console.log(response.data);
        return response.data;
    }
    catch(error){
        console.error('Error Fetching data: ', error);
    }
}

function createDIV(name, height, mass, birth_year, gender){
    const div = document.createElement("div")
    const h2 = document.createElement("h2");
    const infodiv = document.createElement("div");
    const infograph = document.createElement("p");
    infograph.style.whiteSpace = "pre-line";

    div.style.border = "1px solid yellow";
    div.style.margin = "10px";
    div.style.padding = "5px";
    h2.style.color = "yellow";
    h2.innerHTML = name;
    div.appendChild(h2);
    infograph.textContent = `Height: ${height}\nMass: ${mass}\nBirth Year: ${birth_year}\nGender: ${gender}`;
    infograph.style.color = "white";
    infodiv.appendChild(infograph);
    div.appendChild(infodiv);
    return div;
}


// mainGET()