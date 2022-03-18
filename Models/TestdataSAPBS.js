var mongoose=require('mongoose');
var Schema=mongoose.Schema;
mongoose.Promise = require('bluebird');
var db=mongoose.connection;

var TestdataBS=new Schema({
		ProductID:String,
		manufacturingID: String,
		customernumber: String,
		Excel:String,
		RunIndicator:String,
		scenario:String,
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////d///////////////////////////////////////////////////////////////////////////////////////////////////////////////
var TestdataObj=mongoose.model('TestdataBS',TestdataBS);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.updatetestdata=function(productid,manufacturingID,customernumber,excel,runindicator,scenario,callback){
	var quryfind={'_id':id};
	mongoose.connect("mongodb://userHKT:lrADL3lNvj2ug0gT@172.31.55.187:27017/transaction", function(err) {
	if(err){
		////console.log('DB error occured');
		doc1='DB Fail';
		db.close();
		mongoose.connection.close();
		//callback(doc1);
	}
	var updatedvalue=new TestdataObj{'ProductID':productid,'ManufacturingID':manufacturingID,'customernumber':customernumber,'Excel':excel,'RunIndicator':runindicator})
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
module.exports.createtestdata=function(productid,manufacturingID,customernumber,excel,runindicator,scenario,callback) {
	mongoose.connect("mongodb://userHKT:lrADL3lNvj2ug0gT@172.31.55.187:27017/transaction", function(err) {
	if(err){
		////console.log('DB error occured');
		modelslogin="DB Fail";
		callback(modelslogin);
	}
	var Usernamefindnew=new TestdataObj{'ProductID':productid,'ManufacturingID':manufacturingID,'customernumber':customernumber,'Excel':excel,'RunIndicator':runindicator})
	}=
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
