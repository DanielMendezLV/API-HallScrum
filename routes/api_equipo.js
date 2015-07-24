var express = require('express');
var router = express.Router();
var pg = require('pg');
var cadenaDeConexion = process.env.DATABASE_URL || 'postgres://postgres:Motherrosario@localhost:5432/DB_HallScrum';
var oauth=require('../private/middleware');




/* GET home page. */
router.get('/equipo', function (req, res,next) {
    //oauth.ensureAuthenticated(req,res,next);
    var resultado = [];
    //var data = {idusuario: req.body.idusuario};

    pg.connect(cadenaDeConexion, function(err, db,done){
        var query = db.query("select * from equipo");
        //var query = db.query("select * from equipo WHERE idequipo=$1", [data.idusuario] );

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



router.post('/equipo_alternative', function (req, res,next) {
    //oauth.ensureAuthenticated(req,res,next);
    var resultado = [];
    
    pg.connect(cadenaDeConexion, function(err, db,done){
        var query = db.query("select * from equipo");
        //var query = db.query("select * from equipo WHERE idequipo=$1", [data.idusuario] );

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


router.post('/equipo_del', function (req, res,next) {
    //oauth.ensureAuthenticated(req,res,next);
    var resultado = [];
    var data={idequipo: req.body.idequipo};
    console.log(data.idequipo);
    pg.connect(cadenaDeConexion, function(err, db,done){
        
        var query = db.query("DELETE FROM equipo WHERE idequipo=$1", [data.idequipo]);
    
          // Stream results back one row at a time
        query.on('row', function(row) {
            resultado.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            db.end();
            return res.json([{"transaccion": "OK"}]);
        });
        

        if (err) {
            console.log(err)
        }
    });
});


router.post('/equipo', function(req, res,next) {
    //oauth.ensureAuthenticated(req,res,next);
   
     var resultado = [];    
    // Grab data from http request
    var data = {nombre: req.body.nombre, id: req.body.id};

    // Get a Postgres db from the connection pool
    pg.connect(cadenaDeConexion, function(err, db, done) {
        // SQL Query > Insert Data
        var idEquipo = db.query("INSERT INTO equipo(nombre) values ($1) RETURNING idequipo;", [data.nombre]);
                                
        // SQL Query > Select Data
        idEquipo.on('row', function(row) {
            resultado.push(row);
        });
        
       
        idEquipo.on('end', function() {
            var toJSONId =JSON.stringify(resultado);
            var toNativeObjectId = JSON.parse(toJSONId);
            for(var i = 0; i < toNativeObjectId.length; i++) {
                equipoInserted = toNativeObjectId[i].idequipo; 
            }
            //console.log(data.id);
            //console.log(equipoInserted);
            //Ambos datos si llegan 
            var ans = db.query("INSERT INTO usuario_equipo(idusuario, idequipo, idrol, status) values ($1, $2, $3, $4)", [data.id, equipoInserted, 2, true]);
            
            ans.on('row', function(row) {
                
            });

            ans.on('end', function() {
                db.end();
                return res.json([{"transaccion": "OK"}]);
            });

            
        });
    
        if(err) {
          console.log(err);
        }
     });
});
            
module.exports = router;