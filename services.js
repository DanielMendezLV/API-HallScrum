var jwt = require('jwt-simple');
var moment=require('moment');
var config=require('./conf');

exports.createToken=function(user){
	var payload={
		sub: user._id,
		iat: moment().unix(),
		exp: moment().add(20,"days").unix(),
	};
	return jwt.encode(payload,config.TOKEN_SECRET);
};

 
