var express = require('express');
var router = express.Router();
var pg = require('pg');
var cadenaDeConexion = process.env.DATABASE_URL || 'postgres://postgres:Motherrosario@localhost:5432/DB_HallScrum';
var oauth=require('../private/middleware');




/* GET home page. */
router.post('/fase', function (req, res,next) {
    //oauth.ensureAuthenticated(req,res,next);
    var data = {idproyecto: req.body.idproyecto};
    var resultado = [];
    // data = {nombre: req.body.nombre};
    //console.log(req.body.idproyecto);
   // console.log(datas.nombre);
    
    pg.connect(cadenaDeConexion, function(err, db,done){
        var query = db.query("select * from fase WHERE idproyecto = $1",[data.idproyecto]);

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



router.post('/fase_insert', function (req, res,next) {
    //oauth.ensureAuthenticated(req,res,next);
    var data = {idproyecto: req.body.idproyecto, nombre:req.body.nombre};
    console.log(data.idproyecto);
    console.log(data.nombre);
    var resultado = [];
  
    pg.connect(cadenaDeConexion, function(err, db,done){
        var query = db.query("INSERT INTO fase(nombre, idproyecto) VALUES($1,$2)",[data.nombre, data.idproyecto]);

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
