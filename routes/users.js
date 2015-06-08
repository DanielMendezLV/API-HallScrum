var express = require('express');
var router = express.Router();
var services= require('../services');


/* GET users listing. */
router.get('/index', function(req, res, next) {
    res.send('Token generado: '+services.createToken({_id:"android"})); 
});
module.exports = router;


