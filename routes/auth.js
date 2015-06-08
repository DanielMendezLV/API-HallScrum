var express = require('express');
var router = express.Router();
var pg = require('pg');
cadenaDeConexion = process.env.DATABASE_URL || 'postgres://postgres:Motherrosario@localhost:5432/dbHallScrum';
var oauth=require('../private/middleware');


router.post('/login', function(req,res,next){
    oauth.ensureAuthenticated(req,res,next);
    var resultado=[];
    var data={nickname:req.body.nickname, contrasena:req.body.contrasena};
    console.log(req.body.nickname);
    console.log(req.body.contrasena);
    pg.connect(cadenaDeConexion, function(err,db,done){
        var query= db.query('select * from Usuario WHERE nickname=$1 AND contrasena=$2', [data.nickname,data.contrasena]);
        query.on('row', function(row){
           resultado.push(row); 
        });
        
        query.on('end', function(){
            db.end();
            return res.json(resultado);
        });
        
        if(err){
			console.log(err);
		}
    });
});



module.exports = router;