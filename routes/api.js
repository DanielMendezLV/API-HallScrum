var express = require('express');
var router = express.Router();
var pg = require('pg');
var cadenaDeConexion = process.env.DATABASE_URL || 'postgres://postgres:Motherrosario@localhost:5432/DB_HallScrum';
var oauth=require('../private/middleware');


//pone genymotion

/* GET home page. */
router.get('/usuario', function (req, res,next) {
    //oauth.ensureAuthenticated(req,res,next);
    var resultado = [];

    pg.connect(cadenaDeConexion, function(err, db,done){
        var query = db.query("select * from usuario");

        query.on('row', function (row) {
            resultado.push(row);
        });

        query.on('end', function () {
            db.end();
            return res.json(resultado);
        });

        if (err) {
            console.log(err);
        }
    });
});



router.post('/usuario', function(req, res,next) {
    //oauth.ensureAuthenticated(req,res,next);
    var resultado = [];
    var userInserted;
    
    
    // Grab data from http request
    var data = {nombre: req.body.nombre, nickname: req.body.nickname, contrasena:req.body.contrasena, apellido:req.body.apellido,                                  idrol: req.body.idrol};

    // Get a Postgres db from the connection pool
    pg.connect(cadenaDeConexion, function(err, db, done) {
        // SQL Query > Insert Data
        
        db.query("INSERT INTO Usuario(nombre,apellido,nickname,contrasena,idrol) values ($1,$2,$3,$4,$5); ", [data.nombre,data.nickname,data.contrasena,data.apellido, data.idrol]);
        
		var query = db.query("select * from usuario");

        query.on('row', function (row) {
            resultado.push(row);
        });

        query.on('end', function () {
            db.end();
            return res.json(resultado);
        });

        if (err) {
            console.log(err);
        }

  });
    
}); 


router.post('/registrar', function(req, res,next) {
    //oauth.ensureAuthenticated(req,res,next);
    var resultado = [];
    var userInserted;
    
    
    // Grab data from http request
    var data = {nombre: req.body.nombre, nickname: req.body.nickname, contrasena:req.body.contrasena, apellido:req.body.apellido};

    // Get a Postgres db from the connection pool
    pg.connect(cadenaDeConexion, function(err, db, done) {
        // SQL Query > Insert Data
        
        db.query("INSERT INTO Usuario(nombre,apellido,nickname,contrasena,idrol) values ($1,$2,$3,$4,$5); ", 
								[data.nombre,data.apellido,data.nickname,data.contrasena, 2]);
        
		var query = db.query("select * from usuario");

        query.on('row', function (row) {
            resultado.push(row);
        });

        query.on('end', function () {
            db.end();
            return res.json(resultado);
        });

        if (err) {
            console.log(err);
        }

  });
    
}); 










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


