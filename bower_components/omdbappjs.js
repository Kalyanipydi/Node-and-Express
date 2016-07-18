var list = [],
dataOne=[],
dbVal='';
var Omdbserverapp=React.createClass({

  getInitialState: function() {

    return {
      data1: [],
      input:'',
      maintState:'Select DataBase'
    };
  },

  handleChange: function(e) {

   this.setState({input: e.target.value});
  },

  handleState:function(e) {
    this.setState({maintState:e.target.text});
        dbVal = e.target.text;

  },
    render: function() {
    return (<div>
      <div id="form1">
      <form   className="form-inline" >

        <div className="dropdown pull-left" id="drop">
            <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" >{this.state.maintState}
              <span className="caret"></span></button>
                <ul className="dropdown-menu">
                    <li><a href="#"  onClick={this.handleState}>OMDB</a></li>
                    <li><a href="#"   onClick={this.handleState}>MONGODB</a></li>

                </ul>
        </div>
        <input id="text" type="text" className="form-control"  placeholder="Enter Movie Name"  required={true} value={this.state.input} onChange={this.handleChange}   />

        <button  id="search" type="button" className="btn btn-success" onClick={this.handleClick}>Search Movies<span className='glyphicon glyphicon-search'></span></button>

      </form>
      </div>
    <MovieList  db={this.state.maintState}/>
      </div>

    );
  },
  handleClick: function() {
    console.log("seach clicked");
    list=[];
    var movie=this.state.input,
    dbstate=this.state.maintState,
     url;
     console.log("dbstate"+dbstate);
    if(dbstate=="OMDB" && movie!=null)
    {
      url="http://www.omdbapi.com/?s="+movie+"&y=&plot=short&r=json";

    }else{
      if(movie!=undefined && movie!='' && dbstate=="MONGODB")
      {
        url="/MongoosAssign/findOne/"+movie;
      }
      else{
         url="/MongoosAssign/findAll";
      }
    }



    console.log("Movie: " + this.state.input);


    //


    $.ajax({
      url:url,
      dataType:'json',
      cache:false,
      success:function(data){

        console.log(dataOne);
        if(dbstate=="OMDB"){
          data.Search.map(function(d){

             list.push(d);
          });
        }else {

        if(data.length==undefined && dbstate=="MONGODB"){
          console.log("Inside mongo db single object");
          dataOne.push(data);
          dataOne.map(function(d){
          list.push(d);
       })
     }else{

      data.map(function(d){

        list.push(d);
     })
}
}
        this.setState({data1:list,input:''});

        //console.log(a.Search);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });

},


});

var MovieList=React.createClass({


  getInitialState: function() {

    return {
      modelData:"",
      msg:"",
      input:''

    };
  },

  handleModel:function(data){
    console.log("inside handleModel"+data);
    var Title=data.Title,
      url="http://www.omdbapi.com/?t="+Title+"&y=&plot=short&r=json";
      $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log(data);
        this.setState({modelData: data});
          console.log(this.state.modelData);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });


  },
  handleAdd:function(datavalues) {
   var  url="/MongoosAssign/mov";
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: datavalues,
      success: function(data) {
        self.setState({msg:"successfully Added"})
        console.log(data);
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });

  },
  handleDelete:function(delData){
    var title=delData._id;
    console.log(title);
    var  url="/MongoosAssign/delete/"+title;
     $.ajax({
       url: url,
       dataType: 'json',
       type: 'DELETE',
       data: delData._id,
       success: function(data) {
         self.setState({msg:"successfully Deleted"});
         console.log(data);
         this.setState({data: data});
       }.bind(this),
       error: function(xhr, status, err) {
         console.error(this.props.url, status, err.toString());
       }.bind(this)
     });
  },
  handleChanges: function(e) {

   this.setState({input: e.target.value});
  console.log("inside input update"+this.state.input);
  },
  handleUpdateModel:function(dataUpdate){
    var value=this.state.input;
    console.log(dataUpdate._id);
    var  url="/MongoosAssign/update/"+dataUpdate._id;
    dataUpdate["imdbRating"]=value;
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'PUT',
      data: dataUpdate,
      success: function(data) {
        this.setState({msg:"successfully Updated"});
        console.log(data);
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });

  },
  myDB:function() {
      var self=this;
      var count=0;
      var dbVal=this.props.db;
      if(dbVal=="MONGODB"){
        return(<div>{
          list.map(function(d){
     console.log(d);
     return(
            <div className="well row" key={count++}>
                        <div className='col-lg-3'>
                                    <img id="imgs" src={d.Poster} />
                        </div>
                        <div className='col-lg-9'>
                                  <h1>Title   :{d.Title}</h1>
                                  <h3>Year    :{d.Year}</h3>
                                  <button className="btn btn-info modelbtn" data-toggle="modal" data-target="#view" onClick={(event)=>{self.handleModel(d)}} >View Details</button>

                                  <button className="btn btn-warning modelbtn"  data-toggle="modal" onClick={(event)=>{self.handleUpdateModel(d)}} data-target="#modify" >Update Details</button>

                                  <button className="btn btn-danger  modelbtn"   data-toggle="modal" data-target="#delete" onClick={(event)=>{self.handleDelete(d)}}>Delete Movie</button>



                                  <div className="modal fade" id="view"   tabIndex="-1" role="dialog">
                                      <div className="modal-dialog">
                                          <div className="modal-content">

                                              <div className="modal-header">
                                                    <button type="button"   className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                                    <h4 className="modal-title">{self.state.modelData.Title}</h4>
                                              </div>



                                          <div className="modal-body">

                                              <div className="well row" >
                                                          <div className='col-lg-3'>
                                                                      <img id="imgs" src={self.state.modelData.Poster} />
                                                          </div>
                                                          <div className='col-lg-9'>
                                                                    <h3>Title   :{self.state.modelData.Year}</h3>
                                                                    <h3>Rated    :{self.state.modelData.Rated}</h3>
                                                                    <h3>Released    :{self.state.modelData.Released}</h3>
                                                                    <h3>Director    :{self.state.modelData.Director}</h3>
                                                                      <h3>Writer    :{self.state.modelData.Writer}</h3>
                                                                        <h3>Actors    :{self.state.modelData.Actors}</h3>
                                                                          <h3>Awards    :{self.state.modelData.Awards}</h3>
                                                                            <h3>imdbRating    :{self.state.modelData.imdbRating}</h3>
                                                                              <h3>Metascore    :{self.state.modelData.Metascore}</h3>
                                                                    <button className="btn btn-success " id="addtodb" onClick={(event)=>{self.handleAdd(self.state.modelData)}}>Add</button>
                                                                    <h3> {self.state.msg} </h3>
                                                              </div>
                                                    </div>

                                          </div>


                                              <div className="modal-footer">
                                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                              </div>

                                          </div>
                                      </div>
                                  </div>

                                  <div className="modal fade" id="modify"   tabIndex="-1" role="dialog">
                                      <div className="modal-dialog">
                                          <div className="modal-content">

                                              <div className="modal-header">
                                                    <button type="button"   className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                                    <h4 className="modal-title">Movie  Title:{self.state.modelData.Title}</h4>
                                              </div>

                                              <div className="modal-body">

                                              <div className="well row" >
                                                          <div className='col-lg-3'>
                                                                      <img id="imgs" src={self.state.modelData.Poster} />
                                                          </div>
                                                          <div className='col-lg-9'>
                                                                    <h3>Year   :{self.state.modelData.Year}</h3>
                                                                    <h3>Rated    :{self.state.modelData.Rated}</h3>
                                                                    <h3>Released    :{self.state.modelData.Released}</h3>
                                                                    <h3>Director    :{self.state.modelData.Director}</h3>
                                                                      <h3>Writer    :{self.state.modelData.Writer}</h3>
                                                                        <h3>Actors    :{self.state.modelData.Actors}</h3>
                                                                          <h3>Awards    :{self.state.modelData.Awards}</h3>
                                                                            <h3>imdbRating    :{self.state.modelData.imdbRating}</h3><input type="text" id="updateInput" placeholder="Enter your rating" value={self.state.input} onChange={self.handleChanges}></input>
                                                                              <h3>Metascore    :{self.state.modelData.Metascore}</h3>
                                                                    <button className="btn btn-success" id="addtodb" onClick={(event)=>{self.handleUpdate(self.state.modelData)}}>Update</button>
                                                                    <h3> {self.state.msg} </h3>
                                                              </div>
                                                    </div>

                                              </div>

                                              <div className="modal-footer">
                                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                              </div>

                                          </div>
                                      </div>
                                  </div>

                                  <div className="modal fade" id="delete"   tabIndex="-1" role="dialog">
                                      <div className="modal-dialog">
                                          <div className="modal-content">

                                              <div className="modal-header">
                                                    <button type="button"   className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                                    <h4 className="modal-title">Movie Delete</h4>
                                              </div>

                                              <div className="modal-body">
                                                <p>One fine body&hellip;</p>
                                              </div>

                                              <div className="modal-footer">
                                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>

                                              </div>

                                          </div>
                                      </div>
                                  </div>



                        </div>
             </div>

           )
   })

        }</div>)
      }else{
            return(<div>{
            list.map(function(d){
              //console.log(d);
              return(
                <div className="well row" key={count++}>
                         <div className='col-lg-3'>
                                 <img id="imgs" src={d.Poster} />
                            </div>
                          <div className='col-lg-9'>
                          <h1>Title   :{d.Title}</h1>
                          <h3>Year    :{d.Year}</h3>
                             <button className="btn btn-info modelbtn" data-toggle="modal" data-target="#add" onClick={(event)=>{self.handleModel(d)}} id="modelbtn">Add Details</button>

                             <div className="modal fade" id="add"   tabIndex="-1" role="dialog">
                                 <div className="modal-dialog">
                                   <div className="modal-content">

                                     <div className="modal-header">
                                       <button type="button"   className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                       <h4 className="modal-title">Movie  Title:{self.state.modelData.Title}</h4>
                                       </div>

                                    <div className="modal-body">

                                    <div className="well row" >
                                                <div className='col-lg-3'>
                                                            <img id="imgs" src={self.state.modelData.Poster} />
                                                </div>
                                                <div className='col-lg-9'>
                                                          <h3>Title   :{self.state.modelData.Year}</h3>
                                                          <h3>Rated    :{self.state.modelData.Rated}</h3>
                                                          <h3>Released    :{self.state.modelData.Released}</h3>
                                                          <h3>Director    :{self.state.modelData.Director}</h3>
                                                            <h3>Writer    :{self.state.modelData.Writer}</h3>
                                                              <h3>Actors    :{self.state.modelData.Actors}</h3>
                                                                <h3>Awards    :{self.state.modelData.Awards}</h3>
                                                                  <h3>imdbRating    :{self.state.modelData.imdbRating}</h3>
                                                                    <h3>Metascore    :{self.state.modelData.Metascore}</h3>
                                                          <button className="btn btn-success " id="addtodb" onClick={(event)=>{self.handleAdd(self.state.modelData)}}>Add</button>
                                                          <h3> {self.state.msg} </h3>
                                                    </div>
                                          </div>

                                       </div>

                                   <div className="modal-footer">
                                         <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>

                                       </div>

                                   </div>
                                   </div>
                             </div>


                         </div>
                 </div>

            )
              })
          }</div>


);
      }
  },
  render :function(){
    console.log("MovieList")
    return this.myDB();

}


});



// url="/api/comments" pollInterval={2000}

ReactDOM.render(
  <Omdbserverapp  />,
  document.getElementById('omdbapp')
);
