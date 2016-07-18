var express = require('express');
var app = express();
var moves=require('../Models/MovSchemas');

  app.post('/mov',function(req,res){
  var movie = new moves(req.body);

  movie.save(function(err){
    if(err)
    console.log(err);
    else {
      res.send("successfull");
      console.log(movie.Title+"  data inserted");
    }

  });
});
app.get('/findAll',function(req,res){
    moves.find().exec(function(err,data){
      if(err) throw err;

      else if(data!==null)
      {
        console.log(data);
        res.json(data);
      }

    });



});

app.get('/findOne/:title',function(req,res){

    moves.findOne({
      Title:req.params.title
    }).exec(function(err,data){
        if(err) throw err;

      else if(data!==null)
      {
        console.log(data);

        res.json(data);
      }
      else{
        res.send("No such movie found..!!")
      }


    });



});


 app.delete('/delete/:id',function(req,res){
 var id=req.params.id;
 moves.findOneAndRemove({_id:id},function(err){
   if(err)
   console.log(err);
   else {
     console.log(id+"deleted successfull");
     res.send("successfull deleted");
     }

 });
   });

  app.get('/find/:id', function (req, res) {
    moves.findById(req.params.id, function(err, movie){
      if(err) res.send(err);
      res.json(movie);
    });
  });



  app.put('/update/:id',function(req,res){
    moves.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
    if (err) throw err;
    res.json(data);
  });

  });





module.exports = app;
