var mongoose=require('mongoose');
var Schema=mongoose.Schema;
mongoose.Promise = require('bluebird');
var db=mongoose.connection;

var Testdata=new Schema({
		url:String,
		username: String,
		password: String,
		customernumber: String,
		product:String,
		pricingoption:String,
		odlimit:String,
		status:String,
		RunIndicator:String,
		scenario:String,
		productid:String,
		manufacturingID:String,
		Excel:String,

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////d///////////////////////////////////////////////////////////////////////////////////////////////////////////////
var TestdataObj=mongoose.model('Testdata',Testdata);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.updatetestdata=function(id,url,username,password,customernumber,product,pricingoption,odlimit,status,runindicator,callback){
	var quryfind={'_id':id};
	mongoose.connect("mongodb://userHKT:lrADL3lNvj2ug0gT@172.31.55.187:27017/transaction", function(err) {
	if(err){
		////console.log('DB error occured');
		doc1='DB Fail';
		db.close();
		mongoose.connection.close();
		//callback(doc1);
	}

	var updatedvalue={'url':url,'username':username,'password':password,'customernumber':customernumber,'product':product,'pricingoption':pricingoption,'odlimit':odlimit,'status':status,'RunIndicator':runindicator}
	TestdataObj.updateOne(quryfind, updatedvalue, function(err) {
		doc1='updated successfully';
		db.close();
		mongoose.connection.close();
	//	callback(doc1);
	});
});
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports.searchtestdata=function(functionality,callback){
	var quryfind={'scenario':functionality};
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.createtestdata=function(url,username,password,customernumber,product,pricingoption,odlimit,status,runindicator,
	functionality,callback) {
	mongoose.connect("mongodb://userHKT:lrADL3lNvj2ug0gT@172.31.55.187:27017/transaction", function(err) {
	if(err){
		////console.log('DB error occured');
		modelslogin="DB Fail";
		callback(modelslogin);
	}
	var Usernamefindnew=new TestdataObj({"url":url,"username":username,"password":password,"customernumber":customernumber,"product":product,"pricingoption":	pricingoption
																			,"odlimit":odlimit,"status":status,"RunIndicator":runindicator,"scenario":functionality});

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
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.createtestdataBS=function(productid,manufacturingid,customernumber,excel,runindicator,functionality,callback) {
	mongoose.connect("mongodb://userHKT:lrADL3lNvj2ug0gT@172.31.55.187:27017/transaction", function(err) {
	if(err){
		////console.log('DB error occured');
		modelslogin="DB Fail";
		callback(modelslogin);
	}
	var Usernamefindnew=new TestdataObj({"productid":productid,"manufacturingID":manufacturingid,"customernumber":customernumber,"Excel":excel,"RunIndicator":runindicator,"scenario":functionality});

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
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.searchmessage=function(RefNumber,Postingdate,callback) {
	////console.log('Super');
	//////console.log(query);
	quryfind='';
	docs='';
	if(RefNumber===null && Postingdate===null){
		var quryfind='{}';
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
		ITTAObj.find(quryfind,function(err,docs){
			////console.log("retrieved records:");
	    	//////console.log(docs);
	    	db.close();
	    	mongoose.connection.close();
 			callback(docs);
		});
		});
	}else if(Postingdate===null && RefNumber!=null){
		////console.log('Both Ref Not Null');
		var quryfind={"Reference":RefNumber};
		////console.log(quryfind);
		mongoose.connect("mongodb://userHKT:lrADL3lNvj2ug0gT@172.31.55.187:27017/transaction", function(err) {
		if(err){
			////console.log('DB error occured');
			models="DB Fail";
			db.close();
	    	mongoose.connection.close();
			callback(models);
		}
		ITTAObj.find(quryfind,function(err,docs){
			////console.log("retrieved records:");
	    	//////console.log(docs);
	    	db.close();
	    	mongoose.connection.close();
 			callback(docs);
		});
		});
	}else if(RefNumber===null && Postingdate!=null){

		////console.log('Both Post Not Null');
		var quryfind={"postingdate":Postingdate};
		////console.log(quryfind);
		mongoose.connect("mongodb://userHKT:lrADL3lNvj2ug0gT@172.31.55.187:27017/transaction", function(err) {
		if(err){
			////console.log('DB error occured');
			models="DB Fail";
			callback(models);
		}
		ITTAObj.find(quryfind,function(err,docs){
			////console.log("retrieved records:");
	    	//////console.log(docs);
	    	db.close();
	    	mongoose.connection.close();
 			callback(docs);
		});
		});
	}else{
		var quryfind={"Reference":RefNumber,"postingdate":Postingdate};
		////console.log(quryfind);
		////console.log('Both Not Null');
		mongoose.connect("mongodb://userHKT:lrADL3lNvj2ug0gT@172.31.55.187:27017/transaction", function(err) {
		if(err){
			////console.log('DB error occured');
			models="DB Fail";
			callback(models);
		}
		ITTAObj.find(quryfind,function(err,docs){
			////console.log("retrieved records:");
	    	//////console.log(docs);
	    	db.close();
	    	mongoose.connection.close();
 			callback(docs);
		});
		});
	}
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
