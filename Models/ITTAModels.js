var mongoose=require('mongoose');
var Schema=mongoose.Schema;
mongoose.Promise = require('bluebird');
var db=mongoose.connection;


var ITTA=new Schema({
		Username:String,
		Reference: String,
		Message: String,
		Responsefeild: String,
		postingdate:String,
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var ITTAObj=mongoose.model('ITTA',ITTA);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.setmessage=function(username,reference,Mresponse,Mresponsevalue,postingdate,callback) {

	mongoose.connect("mongodb://userHKT:lrADL3lNvj2ug0gT@172.31.55.187:27017/transaction", function(err) {
	if(err){

		modelslogin="DB Fail";
		callback(modelslogin);
	}
	var Usernamefindnew=new ITTAObj({"Username":username,"Reference":reference,"Message":Mresponse,"Responsefeild":Mresponsevalue,"postingdate":postingdate});
	Usernamefindnew.save(function(err){
	if(err){

							models='Fail';
						    mongoose.connection.close();
			    			callback(models);

	}else{

							models='Pass';
							mongoose.connection.close();
							var sync = require('child_process').spawnSync;

							var ls = sync('java', ['-jar', 'MQ.jar',Message]);
							//console.log('end ls');
							//console.log('start grep');
							var grep = sync('grep', ['local'], {
							    input: ls.stdout
							})
							//console.log('end grep');
							process.on('exit', function() {
							    //console.log(grep.stdout.toString());
							});
							//console.log(ls.stdout.toString());

							if(ls.stdout.toString().indexOf('Pass')> -1){
								callback('Pass');
							}else{
								callback('Fail');
							}
	}
	});
});
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.searchmessage=function(RefNumber,Postingdate,callback) {
	//console.log('Super');
	////console.log(query);
	quryfind='';
	docs='';
	if(RefNumber===null && Postingdate===null){
		var quryfind='{}';
		//console.log('Both NULL');
		//console.log(quryfind);
		mongoose.connect("mongodb://userHKT:lrADL3lNvj2ug0gT@172.31.55.187:27017/transaction", function(err) {
		if(err){
			//console.log('DB error occured');
			models="DB Fail";
			db.close();
	    	mongoose.connection.close();
			callback(models);
		}
		ITTAObj.find(quryfind,function(err,docs){
			//console.log("retrieved records:");
	    	////console.log(docs);
	    	db.close();
	    	mongoose.connection.close();
 			callback(docs);
		});
		});
	}else if(Postingdate===null && RefNumber!=null){
		//console.log('Both Ref Not Null');
		var quryfind={"Reference":RefNumber};
		//console.log(quryfind);
		mongoose.connect("mongodb://userHKT:lrADL3lNvj2ug0gT@172.31.55.187:27017/transaction", function(err) {
		if(err){
			//console.log('DB error occured');
			models="DB Fail";
			db.close();
	    	mongoose.connection.close();
			callback(models);
		}
		ITTAObj.find(quryfind,function(err,docs){
			//console.log("retrieved records:");
	    	////console.log(docs);
	    	db.close();
	    	mongoose.connection.close();
 			callback(docs);
		});
		});
	}else if(RefNumber===null && Postingdate!=null){

		//console.log('Both Post Not Null');
		var quryfind={"postingdate":Postingdate};
		//console.log(quryfind);
		mongoose.connect("mongodb://userHKT:lrADL3lNvj2ug0gT@172.31.55.187:27017/transaction", function(err) {
		if(err){
			//console.log('DB error occured');
			models="DB Fail";
			callback(models);
		}
		ITTAObj.find(quryfind,function(err,docs){
			//console.log("retrieved records:");
	    	////console.log(docs);
	    	db.close();
	    	mongoose.connection.close();
 			callback(docs);
		});
		});
	}else{
		var quryfind={"Reference":RefNumber,"postingdate":Postingdate};
		//console.log(quryfind);
		//console.log('Both Not Null');
		mongoose.connect("mongodb://userHKT:lrADL3lNvj2ug0gT@172.31.55.187:27017/transaction", function(err) {
		if(err){
			//console.log('DB error occured');
			models="DB Fail";
			callback(models);
		}
		ITTAObj.find(quryfind,function(err,docs){
			//console.log("retrieved records:");
	    	////console.log(docs);
	    	db.close();
	    	mongoose.connection.close();
 			callback(docs);
		});
		});
	}
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
