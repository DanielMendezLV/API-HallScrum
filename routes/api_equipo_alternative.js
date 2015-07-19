var express = require('express');
var router = express.Router();
var pg = require('pg');
var cadenaDeConexion = process.env.DATABASE_URL || 'postgres://postgres:Motherrosario@localhost:5432/DB_HallScrum';
var oauth=require('../private/middleware');


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

            
module.exports = router;