var mongoose=require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var Schema=mongoose.Schema;
mongoose.Promise = require('bluebird');
var db=mongoose.connection;
var fs=require('fs');

var Fileupload=new Schema({
		Filename:String,
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var fileUploadObj=mongoose.model('fileupload',Fileupload);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.fileupload=function(fileName,callback) {

}



module.exports.deletefile=function(fileName,callback) {
	MongoClient.connect("mongodb://userHKT:lrADL3lNvj2ug0gT@172.31.55.187:27017/transaction", function(err, db) {
	  if (err) throw err;
	  var myquery = {};
	  db.collection("fileuploads").remove(myquery, function(err, obj) {
	    if (err) throw err;
	    console.log(obj.result.n + " document(s) deleted");
	    db.close();
	  });
	});
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


module.exports.filesinserver=function(fileName,callback){
	MongoClient.connect("mongodb://userHKT:lrADL3lNvj2ug0gT@172.31.55.187:27017/transaction", function(err, db) {
	  if (err) throw err;
	  var myquery = {};
	  db.collection("fileuploads").remove(myquery, function(err, obj) {
	    if (err) throw err;
	    //console.log(obj.result.n + " document(s) deleted");
	    db.close();
	  });
	});
	var testFolder = 'C:\\AmmuMsg\\datatable\\TestScenario';
	var b=0;
	fs.readdirSync(testFolder).forEach(file => {
  console.log(file);
	MongoClient.connect("mongodb://userHKT:lrADL3lNvj2ug0gT@172.31.55.187:27017/transaction", function(err, db) {
	  if (err) throw err;
	  var myquery = {Filename:file};
	  db.collection("fileuploads").save(myquery, function(err, obj) {
	    if (err) throw err;
	    //console.log(obj.result.n + "");
	    db.close();
	  });
	});
})
MongoClient.connect("mongodb://userHKT:lrADL3lNvj2ug0gT@172.31.55.187:27017/transaction", function(err, db) {
	if (err) throw err;
	var myquery = {};
	db.collection("fileuploads").find({}).toArray(function(err, result) {
    if (err) throw err;
    //console.log(result);
    db.close();
		callback(result);
  });
});



}
