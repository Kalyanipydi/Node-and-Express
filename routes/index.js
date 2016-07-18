var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/kalyani',function(req,res){
  var user_id = req.body.id,
   name    = req.body.name,
   password = req.body.pass;
  res.send(user_id+' '+name+' '+password);
});


module.exports = router;
