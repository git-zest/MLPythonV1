var mongoose=require('mongoose');
var Schema=mongoose.Schema;
mongoose.Promise = require('bluebird');
var db=mongoose.connection;
var bcrypt=require('bcryptjs');

var Transactionfeeder=new Schema({
		transactiondescription:String,
		transactioncode: String,
		accountnumber:String,
		amount:String,
		medium: String,
		sendingapplication: String,
});


var TestdataObj=mongoose.model('Transactionfeeder',Transactionfeeder);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.createtransaction=function(transactiondescription,transactioncode,accountnumber,amount,medium,sendingapplication,callback){
	console.log(transactiondescription);
	mongoose.connect("mongodb://userHKT:lrADL3lNvj2ug0gT@172.31.55.187:27017/transaction", function(err) {
	if(err){
		////console.log('DB error occured');
		modelslogin="DB Fail";
		callback(modelslogin);
	}
	var Usernamefindnew=new TestdataObj({'transactiondescription':transactiondescription,'transactioncode':transactioncode,'accountnumber':accountnumber,'amount':amount,'medium':medium,'sendingapplication':sendingapplication})
	////console.log({"url":url,"username":username,"password":password,"customernumber":customernumber,"product":product,"pricingoption":	pricingoption
	Usernamefindnew.save(function(err){
	if(err){
							////console.log('error');
							models='Fail';
							mongoose.connection.close();
							callback(models);

	}else{
							mongoose.connection.close();
							callback('testdata created');
	}
	});
});
};	//	 // true
/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.deletetestcase=function(id,callback) {
	////console.log("test");
	////console.log(id);
	mongoose.connect("mongodb://userHKT:lrADL3lNvj2ug0gT@172.31.55.187:27017/transaction", function(err) {
	if(err){
		////console.log('DB error occured');
		modelslogin="DB Fail";
		callback(modelslogin);
	}
	////console.log("deleting the message");
	var Usernamefindnew=new TestdataObj({"_id":id});
	Usernamefindnew.remove(function(err){
	if(err){
							////console.log('error');
							models='Fail';
						  mongoose.connection.close();
			    		callback(models);
	}else{
							mongoose.connection.close();
							callback('deleted');
	}
	});
});
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.searchtestdata=function(functionality,callback){
	var quryfind={};
	////console.log('Both NULL');
	////console.log(quryfind);
	mongoose.connect("mongodb://userHKT:lrADL3lNvj2ug0gT@172.31.55.187:27017/transaction", function(err) {
	if(err){
		////console.log('DB error occured');
		models="DB Fail";
		db.close();
		mongoose.connection.close();
		callback(models);
	}
	TestdataObj.find(quryfind,function(err,docs){
		////console.log("retrieved records:");
			////console.log(docs);
			db.close();
			mongoose.connection.close();
			callback(docs);
	});
});
}
