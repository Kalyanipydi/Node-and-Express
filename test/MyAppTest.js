var should=require('chai').should(),
supertest=require('supertest'),
app=require('../bin/www');

var url=supertest('http://localhost:8080/montest');

describe("Testing the first route", function(err){
  it("should handle the request", function(done){
    console.log("insid the it");
    url
        .get("/sample")
        .expect(200)
        .end(function(err,res){
          if (err) {
				        throw err;
			    }
          //expect(res.text).to.be.equal("Hello!");
          res.text.should.be.equal("hello");
          // var obj=JSON.parse(res.text);
          // obj.Title.should.be.equal("Malli Malli Idhi Rani Roju");
          //assert(res.text == "Hello!","Test has failed");
          done();
        });
  });
});

describe("Testing the second route",function(err){
  it("should handle the request",function(done){
    url
    .post("/mov")
    .expect(200)
    .end(function(err,res){
      if(err) throw err;
      res.text.should.be.equal('successfull');
      done();
    });

  });
});

describe("Testing the first route", function(err){
  it("should handle the request", function(done){
    console.log("insid the it");
    url
        .get("/find/5779fb2ade2f2616055654d3")
        .expect(200)
        .end(function(err,res){
          if (err) {
				        throw err;
			    }
          //var ob=res.body[0];
          var obj=JSON.parse(res.text);
           obj.Title.should.be.equal("Malli Malli Idhi Rani Roju");
          //assert(res.text == "Hello!","Test has failed");
          done();
        });
  });
});

describe("Testing the first route", function(err){
  it("should handle the request", function(done){

    url
      .put('/update/57794d62e44becf00836e3ce')
        .expect(200)
        .end(function(err,res){
          if (err) {
				        throw err;
			    }

          var obj=JSON.parse(res.text);
           obj.Title.trim().should.be.equal("The StarWars updated");
          //assert(res.text == "Hello!","Test has failed");
          done();
        });
  });
});

describe("Testing the first route", function(err){
  it("should handle the request", function(done){

    url
      .delete('/delete/57794d62e44becf00836e3ce')
        .expect(200)
        .end(function(err,res){
          if (err) {
				        throw err;
			    }


           res.text.should.be.equal("successfull deleted");
          //assert(res.text == "Hello!","Test has failed");
          done();
        });
  });
});
