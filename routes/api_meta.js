var express = require('express');
var router = express.Router();
var pg = require('pg');
cadenaDeConexion = process.env.DATABASE_URL || 'postgres://postgres:Motherrosario@localhost:5432/DB_HallScrum';
var oauth=require('../private/middleware');




/* GET home page. */
router.post('/meta', function (req, res,next) {
    //oauth.ensureAuthenticated(req,res,next);
    var resultado = [];
    var data = {idfase: req.body.idfase};

    pg.connect(cadenaDeConexion, function(err, db,done){
        var query = db.query("select * from Meta WHERE idfase=$1",[data.idfase]);

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



router.post('/meta_insert', function (req, res,next) {
    //oauth.ensureAuthenticated(req,res,next);
    var resultado = [];
    var data = {idfase: req.body.idfase, descripcion:req.body.nombre};

    pg.connect(cadenaDeConexion, function(err, db,done){
        var query = db.query("insert into meta(descripcion, estado, idfase) VALUES($1,$2,$3)" ,[data.descripcion, false, data.idfase]);

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
