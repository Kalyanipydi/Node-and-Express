
var express = require('express');
var app = express();
var moves=require('../Models/MovSchemas');

  app.post('/mov',function(req,res){
    var obj={"Title":"Wanted","Year":"2008","Rated":"R","Released":"27 Jun 2008","Runtime":"110 min","Genre":"Action, Crime, Fantasy","Director":"Timur Bekmambetov","Writer":"Michael Brandt (screenplay), Derek Haas (screenplay), Chris Morgan (screenplay), Michael Brandt (story), Derek Haas (story), Mark Millar (comic book series), J.G. Jones (comic book series)","Actors":"James McAvoy, Morgan Freeman, Angelina Jolie, Terence Stamp","Plot":"A frustrated office worker learns that he is the son of a professional assassin, and that he shares his father's superhuman killing abilities.","Language":"English","Country":"USA, Germany","Awards":"Nominated for 2 Oscars. Another 3 wins & 20 nominations.","Poster":"http://ia.media-imdb.com/images/M/MV5BMTQwNDM2MTMwMl5BMl5BanBnXkFtZTgwMjE4NjQxMTE@._V1_SX300.jpg","Metascore":"64","imdbRating":"6.7","imdbVotes":"297,037","imdbID":"tt0493464","Type":"movie","Response":"True"};
  var movie = new moves(obj);

  movie.save(function(err){
    if(err)
    console.log(err);
    else {
      res.send("successfull");
      console.log(movie.Title+"  data inserted");
    }

  });
});
 app.delete('/delete/?id',function(req,res){
 var id=req.params.id;
 moves.findOneAndRemove({_id:id},function(err){
   if(err)
   console.log(err);
   else {
     res.send("successfull deleted");
     }

 });
   });

  app.get('/find/:id', function(req, res) {

    moves.findById(req.params.id, function(err, movie){
      if(err) res.send(err);
      res.json(movie);
    });
  });

  app.get('/sample',function(req,res){
    res.send("hello");
  })
  // router.post('/', function(req, res, next) {
  //   Todo.create(req.body, function (err, post) {
  //     if (err) return next(err);
  //     res.json(post);
  //   });
  // });

  app.put('/update/:id',function(req,res){
    // moves.findById(req.params.id, function(err, movie){
    //   if(err) res.send(err);
    //   console.log(movie.Title);
    //   res.send(movie);
    //
    // });
    //   moves.update(item,function(err){
    //     if(err) res.send(err);
    //     res.send('1 record updated successfully');
    //   });
    moves.findByIdAndUpdate(req.params.id, {
        //"_id" : ObjectId("57794d62e44becf00836e3ce"),
        "Title" : "The StarWars updated"


}
, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });

  });

module.exports = app;
