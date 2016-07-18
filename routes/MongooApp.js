var mongoose=require('mongoose');
var express = require('express');
mongoose.connect('mongodb://localhost/test');
var app = express();
  var kittySchema = mongoose.Schema({

      "name": String,
      "emp":String

  });
  var Kitten = mongoose.model('kitten', kittySchema);
  app.post('/kal',function(req,res){
  var silence = new Kitten(req.body);
  //console.log(silence.name);
  silence.save(function(err){
    if(err)
    console.log(err);
    else {
      //anres.send("successfull");
      console.log(silence.name+"  data inserted");
    }
  });
});

module.exports = app;
