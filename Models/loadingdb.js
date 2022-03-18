var mongoose=require('mongoose');
var Schema=mongoose.Schema;
mongoose.Promise = require('bluebird');
var db=mongoose.connection;
const Cryptr = require('cryptr');
const cryptr = new Cryptr('mykey');

var loadingschema=new Schema({
		loading:String,
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var loadingschemaobj=mongoose.model('loadingschema',loadingschema);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

mongoose.connect("mongodb://localhost:27017/loadingdb", function(err) {
	    //mongoose.connect("mongodb://localhost:27017/transaction", function(err) {
					var loadingschemaobjcreateobj=new loadingschemaobj({"loading":"false"});
					var batchdatefilter={"loading":"false"};
					loadingschemaobj.find(batchdatefilter).count(function(err,count){
						if(err){
							//console.log('save failure');
							modelslogin="Fail";
							callback(modelslogin);
						}else{
								//console.log(count);
								if(count===1){
									console.log('Used existing DB');
									models='created';
									mongoose.connection.close();
								}else{
												loadingschemaobjcreateobj.save(function(err){
														if(err){
																console.log(err);
																models='Fail';
																mongoose.connection.close();
														    //callback(models);
															}else{
																console.log('Created');
																models='created';
																mongoose.connection.close();
																//callback(models);
															}
														});
								}
}
});
});



module.exports.searchloadingfunction=function(regressionname,callback) {
	//mongoose.connect("mongodb://localhost:27017/transaction", function(err) {
		mongoose.connect("mongodb://localhost:27017/loadingdb", function(err) {
					//var Regressioncreateobj=new Regressionobj({"buildtool":buildtool,"regressionname":regressionname,"jenkinsurl":jenkinsurl,"jenkinsjobname":jenkinsjobname,"jenkinsjobparam":jenkinsjobparam,"status":status});
				  var batchdatefilter={"loading":"true"};
					loadingschemaobj.find(batchdatefilter).count(function(err,count){
						if(err){
							//console.log('save failure');
							modelslogin="Fail";
							callback(modelslogin);
						}else{
								//console.log(count);
								if(count===1){
				    			db.close();
				    			mongoose.connection.close();
									modelslogin="Pass";
			 						callback(modelslogin);
								}else{
									db.close();
				    			mongoose.connection.close();
									modelslogin="Fail";
			 						callback(modelslogin);
								}
					}
});
})
}


module.exports.updateloadingfunction=function(execution_vl,callback) {
	var Regressionupdateobj={};
	//mongoose.connect("mongodb://localhost:27017/transaction", function(err) {
	mongoose.connect("mongodb://localhost:27017/transaction", function(err) {
				var updatedregval={"loading":execution_vl};
				BVFobj.updateOne(Regressionupdateobj, updatedregval, function(err) {
				doc1='updated successfully';
				models='updated';
				db.close();
				mongoose.connection.close();
				callback(models);
				})
});
};





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
