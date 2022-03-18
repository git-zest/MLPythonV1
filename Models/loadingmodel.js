var mongoose=require('mongoose');
var Schema=mongoose.Schema;
mongoose.Promise = require('bluebird');
var db=mongoose.connection;
const Cryptr = require('cryptr');
const cryptr = new Cryptr('mykey');

var Bvf=new Schema({
		scenario:String,
		username:String,
		password:String,
		bpaccnumber:String,
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var BVFobj=mongoose.model('Bvf',Bvf);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.addbvf=function(scenario,username,password,bpaccnumber,callback) {
    mongoose.connect("mongodb://mongo:mongo@172.31.46.248:27017/transaction", function(err) {
	    //mongoose.connect("mongodb://localhost:27017/transaction", function(err) {
					var BVFcreateobj=new BVFobj({"scenario":scenario,"username":cryptr.encrypt(username),"password":cryptr.encrypt(password),"bpaccnumber":cryptr.encrypt(bpaccnumber)});
				  BVFcreateobj.save(function(err){
							if(err){
									console.log(err);
									models='Fail';
									mongoose.connection.close();
							    callback(models);
								}else{
									console.log('Created');
									models='created';
									mongoose.connection.close();
									callback(models);
								}
							});
});
}


module.exports.searchbvf=function(regressionname,callback) {
	//mongoose.connect("mongodb://localhost:27017/transaction", function(err) {
		mongoose.connect("mongodb://mongo:mongo@172.31.46.248:27017/transaction", function(err) {
					//var Regressioncreateobj=new Regressionobj({"buildtool":buildtool,"regressionname":regressionname,"jenkinsurl":jenkinsurl,"jenkinsjobname":jenkinsjobname,"jenkinsjobparam":jenkinsjobparam,"status":status});
				  var batchdatefilter={};
					BVFobj.find(batchdatefilter,function(err,docs){
				    	db.close();
				    	mongoose.connection.close();
			 				callback(docs);
					});
});
}


module.exports.searchbvfscript=function(scenario,callback) {
	//mongoose.connect("mongodb://localhost:27017/transaction", function(err) {
		mongoose.connect("mongodb://mongo:mongo@172.31.46.248:27017/transaction", function(err) {
					//var Regressioncreateobj=new Regressionobj({"buildtool":buildtool,"regressionname":regressionname,"jenkinsurl":jenkinsurl,"jenkinsjobname":jenkinsjobname,"jenkinsjobparam":jenkinsjobparam,"status":status});

				  var batchdatefilter={"scenario":scenario};
					BVFobj.find(batchdatefilter,function(err,docs){
				    	db.close();
				    	mongoose.connection.close();
			 				callback(docs);
					});
});
}



module.exports.deletebvf=function(regressionid,callback) {

	//mongoose.connect("mongodb://localhost:27017/transaction", function(err) {
		mongoose.connect("mongodb://mongo:mongo@172.31.46.248:27017/transaction", function(err) {
					var deleteregressionid ={"_id":regressionid};
					BVFobj.find(deleteregressionid,function(err,regdelete){
					if(err){
						console.log(err);
						models='Fail';
						db.close();
						mongoose.connection.close();
						callback(models);
					}else{
						BVFobj.deleteOne(deleteregressionid,function(err){

				    	db.close();
						mongoose.connection.close();
						models="deleted";
						 callback(models);

						});
					}
					});
});
}




module.exports.updatebvf=function(regressionid,scenario,username,password,bpaccnumber,callback) {

	var Regressionupdateobj={"_id":regressionid};
	//mongoose.connect("mongodb://localhost:27017/transaction", function(err) {
	mongoose.connect("mongodb://mongo:mongo@172.31.46.248:27017/transaction", function(err) {
	    BVFobj.find(Regressionupdateobj,function(err,regupdate){

			if(err){
					console.log(err);
					models='Fail';
					db.close();
					mongoose.connection.close();
				callback(models);
				}else{

				var updatedregval={"scenario":scenario,"username":cryptr.encrypt(username),"password":cryptr.encrypt(password),"bpaccnumber":cryptr.encrypt(bpaccnumber)};
				BVFobj.updateOne(Regressionupdateobj, updatedregval, function(err) {
				doc1='updated successfully';
				models='updated';
				db.close();
				mongoose.connection.close();
				callback(models);
				});
			}

});
	});
}




const execFile = require('child_process').execFile;
module.exports.batchfinder=function(datefld,callback) {

	mongoose.connect("mongodb://mongodb:mongodb@172.31.46.248:27017/transaction", function(err) {
					var batchdatefilter={"batchdate":datefld};
					AddbatchObj.find(epicname).count(function(err,count){
						if(count>=1){
							mongoose.connection.close();
							var collection = db.collection('transaction');
							collection.find(batchdatefilter).toArray(function(err, docs){
								docs.forEach(function(vl){

									const child = execFile('node', ['--version'], (error, stdout, stderr) => {
									    if (error) {

									        throw error;
									    }

									});
							});
							});
							db.close();
							mongoose.connection.close();
						  }
							});
						});
					mongoose.connection.close();
}


module.exports.searchbatchname=function(batchName,callback) {
	mongoose.connect("mongodb://mongodb:mongodb@172.31.46.248:27017/transaction", function(err) {
		if(err){
			models='Fail';
			mongoose.connection.close();
			callback(models);
		}else{
			var epicname={"batchname":batchName};
			AddbatchObj.find(epicname).count(function(err,count){
				if(count>=1){
					models='Already exist';
					mongoose.connection.close();
					callback(models);
				}
				else{
					models='Pass';
					mongoose.connection.close();
					callback(models);
				}
			});
		}
	});
}
