var express = require('express');
var router = express.Router();
var pg = require('pg');
cadenaDeConexion = process.env.DATABASE_URL || 'postgres://postgres:Motherrosario@localhost:5432/dbHallScrum';
var oauth=require('../private/middleware');




/* GET home page. */
router.get('/usuario', function (req, res,next) {
    oauth.ensureAuthenticated(req,res,next);
    var resultado = [];

    pg.connect(cadenaDeConexion, function(err, db,done){
        var query = db.query("select * from usuario")

        query.on('row', function (row) {
            resultado.push(row)
        });

        query.on('end', function () {
            db.end();
            return res.json(resultado);
        });

        if (err) {
            console.log(err)
        }
    });
});



router.post('/usuario', function(req, res,next) {
    oauth.ensureAuthenticated(req,res,next);
    var resultado = [];
    var resultadoUsuario = [];
    var userInserted;
    
    // Grab data from http request
    var data = {nombre: req.body.nombre, nickname: req.body.nickname, contrasena:req.body.contrasena, apellido:req.body.apellido};
    // Get a Postgres db from the connection pool
    pg.connect(cadenaDeConexion, function(err, db, done) {
        // SQL Query > Insert Data
        
        var idUser = db.query("INSERT INTO Usuario(nombre,apellido, nickname, contrasena) VALUES($1, $2, $3,$4) RETURNING idusuario", [data.nombre, data.apellido,data.nickname, data.contrasena]);
        // SQL Query > Select Data
        idUser.on('row', function(row) {
            resultado.push(row);
        });
        
        var user;
        idUser.on('end', function() {
            var toJSONId =JSON.stringify(resultado);
            var toNativeObjectId = JSON.parse(toJSONId);
            for(var i = 0; i < toNativeObjectId.length; i++) {
                userInserted = toNativeObjectId[i].idusuario;   
            }
            console.log(".. primero?");
            user = JSON.stringify(getUsuario(1));
            console.log(".. segundo?");
            
            //segundo llega aca...
            // return res.json(getUsuario(userInserted));
        });
        
        
        idUser.on('end', function() {
            console.log("llego aca?");
            console.log(user);
              
        });
        
    
        // Handle Errors
        if(err) {
          console.log(err);
        }

    });
});


function getUsuario(id){
    //console.log("Llego segundo aca"+id);
    var resultado = [];
    pg.connect(cadenaDeConexion, function(err, db, done) {
        var selectUsuario = db.query("SELECT * FROM usuario WHERE usuario.idusuario="+id);
        
        
        
        selectUsuario.on('row', function(row) {
            resultado.push(row);
           // console.log("llego segundo 1");
        });
       

        selectUsuario.on('end', function() {
            db.end();
            console.log(JSON.stringify(resultado));
            return JSON.stringify(resultado);
        });
                                
        // Handle Errors
        if(err) {
          console.log(err);
        }
    });
}
    

router.delete('/usuario', function(req, res,next){
    oauth.ensureAuthenticated(req,res,next);
    var resultado=[];
    var data={idUsuario: req.body.idUsuario};
    pg.connect(cadenaDeConexion, function(err, db, done) {
        // body...
        db.query("DELETE FROM Usuario WHERE usuario.idUsuario=$1", [data.idUsuario]);
        var query= db.query("select * from usuario");

          // Stream results back one row at a time
        query.on('row', function(row) {
            resultado.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            db.end();
            return res.json(resultado);
        });

        // Handle Errors
        if(err) {
          console.log(err);
        }

    });

});


router.put('/usuario', function(req, res,next){
    oauth.ensureAuthenticated(req,res,next);
    var resultado=[];
     var data = {idUsuario: req.body.idUsuario, nombre: req.body.nombre,apellido:req.body.apellido, nickname: req.body.nickname, contrasena:req.body.contrasena};


    //var data={idUsuario: req.body.idUsuario};
    pg.connect(cadenaDeConexion, function(err, db, done) {
        // body...
       // db.query("DELETE FROM Usuario WHERE usuario.idUsuario=$1", [data.idUsuario]);
        db.query("UPDATE Usuario SET nombre=$1,apellido=$2,nickname=$3, contrasena=$4 WHERE Usuario.idUsuario=$5 " , [data.nombre,data.apellido, data.nickname, data.contrasena, data.idUsuario]);
        var query= db.query("select * from usuario");

          // Stream results back one row at a time
        query.on('row', function(row) {
            resultado.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            db.end();
            return res.json(resultado);
        });

        // Handle Errors
        if(err) {
          console.log(err);
        }

    });

});

module.exports = router;


