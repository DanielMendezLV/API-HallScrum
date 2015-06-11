var express = require('express');
var router = express.Router();
var pg = require('pg');
cadenaDeConexion = process.env.DATABASE_URL || 'postgres://postgres:Motherrosario@localhost:5432/dbHallScrum';
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


module.exports = router;
