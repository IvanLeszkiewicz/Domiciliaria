'use strict';
 
const ADODB = require('node-adodb');
const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=datos.mdb;');
const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.post('/insertar', (req, resp) => {

    let inst = `INSERT INTO Equipos(nombre, liga, pais) VALUES ("${req.body.nomb}", "${req.body.liga}", "${req.body.pais}")`;
    connection
    .execute(inst)
    .then(data => {
        console.log(JSON.stringify(data, null, 2));
    })
    .catch(error => {
        console.error(error);
    });
    
    
    resp.redirect('/');
});

app.delete('/eliminar', (req, resp) => {
    connection
    .execute("DELETE * FROM Equipos")
    .then(data => {
        resp.end();
    })
    .catch(error => {
        console.error(error);
    });
})

app.get('/datos', (req, resp) => {
    
    connection
    .query('SELECT * FROM Equipos')
    .then(data => {
        resp.json({data: data});
    })
    .catch(error => {
        console.error(error);
    });
});




app.post('/actualizar', (req, resp) => {
    const data = req.body.data;
    const inst = `UPDATE Equipos
    SET nombre = "${data.nomb}", liga = "${data.liga}", pais = "${data.pais}" WHERE Id = ${data.id};`;
      connection
      .execute(inst)
      .then(data => {
        console.log("DONE!");
      })
      .catch(error => {
        console.error(error);
      });

      resp.end();
});


app.post('/nombre', (req, resp) => {
    const buscar = 'SELECT * FROM Equipos WHERE nombre = "'+ req.body.busc+'"';
    connection
        .query(buscar)
        .then(data => {
            resp.json({data: data});
        })
        .catch(error => {
            console.error(error);
        });
});

app.post('/liga', (req, resp) => {
    const buscar = 'SELECT * FROM Equipos WHERE liga = "'+ req.body.busc+'"';
    connection
        .query(buscar)
        .then(data => {
            resp.json({data: data});
        })
        .catch(error => {
            console.error(error);
        });
});

app.post('/pais', (req, resp) => {
    const buscar = 'SELECT * FROM Equipos WHERE pais = "'+ req.body.busc+'"';
    connection
        .query(buscar)
        .then(data => {
            resp.json({data: data});
        })
        .catch(error => {
            console.error(error);
        });
});



app.use(express.static('public'));

app.listen(3000, () => {
 console.log("Server running on port 3000");
});