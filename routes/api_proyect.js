var express = require('express');
var router = express.Router();
var pg = require('pg');
cadenaDeConexion = process.env.DATABASE_URL || 'postgres://postgres:Motherrosario@localhost:5432/DB_HallScrum';
var oauth=require('../private/middleware');




/* GET home page. */
router.get('/proyect', function (req, res,next) {
    //oauth.ensureAuthenticated(req,res,next);
    var resultado = [];

    pg.connect(cadenaDeConexion, function(err, db,done){
        var query = db.query("select * from proyecto")

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



/* GET home page. */
router.post('/proyect', function (req, res,next) {
    //oauth.ensureAuthenticated(req,res,next);
    var resultado = [];
    var data = {nombre: req.body.nombre, nickname: req.body.nickname, contrasena:req.body.contrasena, apellido:req.body.apellido};


    pg.connect(cadenaDeConexion, function(err, db,done){
        var query = db.query("select * from proyecto")

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



router.post('/proyect', function(req,res,next){
    
     //oauth.ensureAuthenticated(req,res,next);
    var resultado = [];
   
    // Grab data from http request
    var data = {nombre: req.body.nombre, nickname: req.body.nickname, contrasena:req.body.contrasena, apellido:req.body.apellido};

    // Get a Postgres db from the connection pool
    pg.connect(cadenaDeConexion, function(err, db, done) {
        // SQL Query > Insert Data
        
        var idUser = db.query("INSERT INTO Usuario(nombre,apellido, nickname, contrasena) VALUES($1, $2, $3,$4,2) RETURNING idusuario", [data.nombre, data.apellido,data.nickname, data.contrasena]);
        // SQL Query > Select Data
        idUser.on('row', function(row) {
            resultado.push(row);
        });
        
        idUser.on('end', function() {
            var user;
            var toJSONId =JSON.stringify(resultado);
            var toNativeObjectId = JSON.parse(toJSONId);
            for(var i = 0; i < toNativeObjectId.length; i++) {
                userInserted = toNativeObjectId[i].idusuario; 
            }

            var selectUsuario = db.query("SELECT * FROM usuario WHERE usuario.idusuario="+userInserted);

            selectUsuario.on('row', function(row) {
                resultado.push(row);
            });

            selectUsuario.on('end', function() {
                user = resultado;
                res.json(resultado["1"]);
            });

            db.end();
        });
    
        if(err) {
          console.log(err);
      }

  });
});



module.exports = router;
