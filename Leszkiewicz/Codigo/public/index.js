function mostrar(div){
    document.getElementById('in').style.display = "none";
    document.getElementById('del').style.display = "none";
    document.getElementById('act').style.display = "none";
    document.getElementById('ser').style.display = "none";

    document.getElementById(div).style.display = "block";
}


function eliminar(){
    
    fetch("/eliminar", {
        method: 'DELETE', 
        body: JSON.stringify({id:true}), 
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => location.href ="/")
    .catch(error => console.error('Error:', error));
}

async function datos(){
    const options = { 
        method: 'GET',
        headers:{
             'Content-Type': 'application/json'
        }
    };
    
    const response = await fetch('/datos', options).catch(error => console.error(error));
    const json = await response.json();

    
    let p = document.getElementById("act-datos");
    p.innerHTML="";
    for(let i = 0; i < json.data.length; i++){
        p.innerHTML += `Nombre: <input type=text id="nomb${json.data[i].Id}" value=${json.data[i].nombre}>
        Liga: <input type=text id="liga${json.data[i].Id}" value=${json.data[i].liga}>
        Pais: <input type=text id="pais${json.data[i].Id}" value=${json.data[i].pais}>
        <button onclick="actualizar(${json.data[i].Id})">ACTUALIZAR</button></br>
        `;
    }
}

function actualizar(id){
    console.log(id);
    const data = {
        id: id,
        nomb: document.getElementById("nomb"+id).value,
        liga: document.getElementById("liga"+id).value,
        pais: document.getElementById("pais"+id).value
    };
    fetch("/actualizar", {
        method: 'POST', 
        body: JSON.stringify({data:data}), 
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => location.href ="/")
    .catch(error => console.error('Error:', error));

}

async function buscar_nombre(){
    const buscar = document.getElementById("buscar1").value;

    const options = { 
        method: 'POST',
        body: JSON.stringify({busc:buscar}),
        headers:{
            'Content-Type': 'application/json'
        }
    };
    
    const response = await fetch('/nombre', options).catch(error => console.error(error));
    const json = await response.json();

    let p = document.getElementById("res");
    p.innerHTML="";
    for(let i = 0; i < json.data.length; i++){
        p.innerHTML += "<p>Nombre: "+ json.data[i].nombre + " Liga: " +json.data[i].liga+ " Pais: " +json.data[i].pais+ "</p>";
    }
}

async function buscar_liga(){
    const buscar = document.getElementById("buscar2").value;

    const options = { 
        method: 'POST',
        body: JSON.stringify({busc:buscar}),
        headers:{
            'Content-Type': 'application/json'
        }
    };
    
    const response = await fetch('/liga', options).catch(error => console.error(error));
    const json = await response.json();

    let p = document.getElementById("res");
    p.innerHTML="";
    for(let i = 0; i < json.data.length; i++){
        p.innerHTML += "<p>Nombre: "+ json.data[i].nombre + " Liga: " +json.data[i].liga+ " Pais: " +json.data[i].pais+ "</p>";
    }
}

async function buscar_pais(){
    const buscar = document.getElementById("buscar3").value;

    const options = { 
        method: 'POST',
        body: JSON.stringify({busc:buscar}),
        headers:{
            'Content-Type': 'application/json'
        }
    };
    
    const response = await fetch('/pais', options).catch(error => console.error(error));
    const json = await response.json();

    let p = document.getElementById("res");
    p.innerHTML="";
    for(let i = 0; i < json.data.length; i++){
        p.innerHTML += "<p>Nombre: "+ json.data[i].nombre + " Liga: " +json.data[i].liga+ " Pais: " +json.data[i].pais+ "</p>";
    }
}