var mongoose=require('mongoose');
var Schema=mongoose.Schema;
mongoose.Promise = require('bluebird');
var db=mongoose.connection;


var genericfunction=new Schema({
		driversessionid:String,
		driversessionurl:String,
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//var genericfunctionObj=mongoose.model('Addbatch',genericfunction);
var genericfunctionObj=mongoose.model('drivercap',genericfunction);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.addgenericfunction=function(driversessionidvl, driversessionrurlvl,callback) {
	 mongoose.connect("mongodb://localhost:27017/transaction",  function(err) {
					var objfinder={}
					console.log(objfinder);
					genericfunctionObj.find(objfinder).count(function(err,count){
						if(err){
							//console.log('save failure');
							modelslogin="Fail";
							callback(modelslogin);
						}else{
								//console.log(count);
								if(count===1){
									var objfinder={}
									db.collection("drivercaps").deleteMany(objfinder, function(err, obj) {
								    if (err) throw err;
								    console.log(obj.result.n + " document(s) deleted");
								    //db.close();
								  });
									var creategenericfunctionObjj=new genericfunctionObj({"driversessionid":driversessionidvl,"driversessionurl":driversessionrurlvl});
								  creategenericfunctionObjj.save(function(err){
											if(err){
												console.log(err);
													models='Fail';
													mongoose.connection.close();
											    callback(models);
												}else{
													models='Pass';
													mongoose.connection.close();
													callback(models);
												}
											});
								}
								else{
									var creategenericfunctionObjj=new genericfunctionObj({"driversessionid":driversessionidvl,"driversessionurl":driversessionrurlvl});
								  creategenericfunctionObjj.save(function(err){
											if(err){
												console.log(err);
													models='Fail';
													mongoose.connection.close();
											    callback(models);
												}else{
													models='Pass';
													mongoose.connection.close();
													callback(models);
												}
											});
											}
										}
									});
	//mongoose.connection.close();
});
}



module.exports.searchdrivercap= function(driverfinder, callback) {
	mongoose.connect("mongodb://localhost:27017/transaction", function(err) {
					var objfinder={}
					console.log(objfinder);
					genericfunctionObj.find(objfinder, function(err,docs){
						db.close();
						mongoose.connection.close();
						callback(docs);
					})
				})
	}




module.exports.searchgenericfunction=function(screenname,callback) {
	var genericfunctionObj=mongoose.model(screenname,genericfunction);
	mongoose.connect("mongodb://localhost:27017/transaction", function(err) {
				//var Regressioncreateobj=new Regressionobj({"buildtool":buildtool,"regressionname":regressionname,"jenkinsurl":jenkinsurl,"jenkinsjobname":jenkinsjobname,"jenkinsjobparam":jenkinsjobparam,"status":status});
				var batchdatefilter={};
				genericfunctionObj.find(batchdatefilter,function(err,docs){
						db.close();
						mongoose.connection.close();
						callback(docs);
				});
})
}



module.exports.deletegenericfunction=function(screenname,regressionid,callback) {
	var genericfunctionObj=mongoose.model(screenname,genericfunction);
	//mongoose.connect("mongodb://localhost:27017/transaction", function(err) {
		mongoose.connect("mongodb://localhost:27017/transaction", function(err) {
					var deleteregressionid ={"_id":regressionid};
					genericfunctionObj.find(deleteregressionid,function(err,regdelete){
					if(err){
						console.log(err);
						models='Fail';
						db.close();
						mongoose.connection.close();
						callback(models);
					}else{
						genericfunctionObj.deleteOne(deleteregressionid,function(err){

				    	db.close();
						mongoose.connection.close();
						models="deleted";
						 callback(models);

						});
					}
					});
});
}
