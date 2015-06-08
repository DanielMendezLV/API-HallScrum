var jwt = require('jwt-simple');
var moment=require('moment');
var config=require('../conf');

exports.ensureAuthenticated=function(req,res, next){
	if(!req.headers.authorization){
		return res
			.status(403)
			.send({message: "Tu peticion no puede ser atendida, no tiene cabecera de autorizacion"});
	}
	
	var token=req.headers.authorization.split(" ")[0];
	var payload= jwt.decode(token, config.TOKEN_SECRET);
	
	if(payload.exp<=moment().unix()){
		return res
			.status(401)
			.send({message:"El token ha expirado"});
	}
	
	req.user=payload.sub;
	
	//res.send({message: req.user});
	//console.log("Si llego y el estatus es true");
	//Aca correcto funcionamiento.
	
	return {message:"Acceso al sistema",status:true};
};