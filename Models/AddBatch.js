var mongoose=require('mongoose');
var Schema=mongoose.Schema;
mongoose.Promise = require('bluebird');
var db=mongoose.connection;


var Addbatch=new Schema({
		batchname:String,
		batchdate:Date,
		completeindicator:String,
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var AddbatchObj=mongoose.model('Addbatch',Addbatch);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.addbatchvl=function(batchName,datefield,completionindctor,callback) {

	mongoose.connect("mongodb://userHKT:lrADL3lNvj2ug0gT@172.31.55.187:27017/transaction", function(err) {
					var createAddbatchObj=new AddbatchObj({"batchname":batchName,"batchdate":datefield,"completeindicator":completionindctor});
				  createAddbatchObj.save(function(err){
							if(err){

									models='Fail';
									mongoose.connection.close();
							    callback(models);
								}else{
									models='Pass';
									mongoose.connection.close();
									callback(models);
								}
							});
	mongoose.connection.close();
});
}
const execFile = require('child_process').execFile;
module.exports.batchfinder=function(datefld,callback) {

	mongoose.connect("mongodb://userHKT:lrADL3lNvj2ug0gT@172.31.55.187:27017/transaction", function(err) {
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
	mongoose.connect("mongodb://userHKT:lrADL3lNvj2ug0gT@172.31.55.187:27017/transaction", function(err) {
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
