var mongoose=require('mongoose');
var Schema=mongoose.Schema;
mongoose.Promise = require('bluebird');
var db=mongoose.connection;


var genericfunction=new Schema({
		object_type:String,
		object_parameter:String,
		object_property_vl:String,
		object_locatordescrip:String,
		object_changerind:String,
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//var genericfunctionObj=mongoose.model('Addbatch',genericfunction);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.addgenericfunction=function(screenname,obj_type,obj_parameter,obj_tag,object_locatordescrip,object_fninsertval,callback) {
	var screen_value='';
	console.log("add_generic_function   "+object_fninsertval);
	if(object_fninsertval=='newscreen'){
		screen_value='New Insert';
	}
	if(object_fninsertval=='existingscreen'){
		screen_value='Existing Fresh Insert';
	}
	console.log(screenname);
	mongoose.connect("mongodb://localhost:27017/transaction", function(err) {
		      var genericfunctionObj=mongoose.model(screenname,genericfunction);
					var objfinder={"object_type":obj_type,"object_parameter":obj_parameter, "object_property_vl":obj_tag  }
					genericfunctionObj.find(objfinder).count(function(err,count){
						if(err){
							//console.log('save failure');
							modelslogin="Fail";
							callback(modelslogin);
						}else{
								//console.log(count);
								if(count===1){
									var genericfunctionObj1={"object_type":obj_type,"object_parameter":obj_parameter,"object_property_vl":obj_tag,"object_locatordescrip":object_locatordescrip};
									var updatedregval={"object_type":obj_type,"object_parameter":obj_parameter,"object_property_vl":obj_tag,"object_locatordescrip":object_locatordescrip, "object_changerind":"Avaiable in Obj DB"};
									genericfunctionObj.updateOne(genericfunctionObj1, updatedregval, function(err) {
									doc1='updated successfully';
									models='updated';
									models='Pass';
									mongoose.connection.close();
									callback(models);
								});
								}
								else{
									var creategenericfunctionObjj=new genericfunctionObj({"object_type":obj_type,"object_parameter":obj_parameter,"object_property_vl":obj_tag,"object_locatordescrip":object_locatordescrip, "object_changerind":screen_value});
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
