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
    var data = {nombre: req.body.nombre, idequipo:req.body.idequipo};


    pg.connect(cadenaDeConexion, function(err, db,done){
        var query = db.query("INSERT INTO proyecto(nombre,idequipo) VALUES($1,$2) returning idproyecto", [data.nombre, data.idequipo]);

        query.on('row', function (row) {
            resultado.push(row)
        });

        query.on('end', function () {
            db.end();
            return res.json([{"transaccion": "OK"}]);
        });

        if (err) {
            console.log(err)
        }
    });
});



module.exports = router;
