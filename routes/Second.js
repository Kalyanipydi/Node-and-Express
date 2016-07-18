var express=require('express');
var router =express.Router();
var dodyparser=require('body-parser');

router.get('/errorcount',function(req,res){

  res.send({errorcount:0});
});
router.get('/respo',function(req,res){

  console.log(req.query);
});
router.get('/',function(req,res){
  res.render('index',{
  title:'kalyani app!!'
});
});
router.get('/users/:id',function(req,res){
  res.send(req.params.id,200);
  console.log(req.params.id);
});
router.post('/kalyani',function(req,res){
  var user_id = req.body.id,
   name    = req.body.name,
   password = req.body.pass;
  res.send(user_id+' '+name+' '+password);
});


  module.exports=router;








  // var mongoose=require('mongoose');
  // mongoose.connect('mongodb://localhost/test');
  //   var kittySchema = mongoose.Schema({
  //
  //       name: String,
  //       emp:String
  //
  //   });
  //   var Kitten = mongoose.model('kitten', kittySchema);
  //   //app.post('/kal',function(req,res){
  //   var silence = new Kitten({ name: 'kalyani',emp:'py336529' });
  //   //console.log(silence.name);
  //   silence.save(function(err){
  //     if(err)
  //     console.log(err);
  //     else {
  //       console.log(silence.name+"  data inserted");
  //     }
  //   });
