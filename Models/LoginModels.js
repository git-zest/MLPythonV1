var mongoose=require('mongoose');
var Schema=mongoose.Schema;
mongoose.Promise = require('bluebird');
var db=mongoose.connection;
var bcrypt=require('bcryptjs');

var Login=new Schema({
		Username:String,
		Password: String,
		Counter: Number,
		Logindate: Date,
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.generateharsh=function(Password1,callback){
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(Password1, salt);
	//console.log(hash);
	callback(hash);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.validpassword=function(usernamefind,Password1,callback){
	//console.log('valid password');
	//console.log(usernamefind);
	//console.log(Password1);
	var collection = db.collection('logins');
 	collection.find(usernamefind).toArray(function(err, docs){
	    //console.log("retrieved records:");
	   // console.log(docs);
		//console.log(docs[0].Password);
	    db.close();
	    var validpasswordout=bcrypt.compareSync(Password1, docs[0].Password);
	    callback(validpasswordout);

});	//	 // true
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var LoginObj=mongoose.model('login',Login);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.getLogin=function(Username,Password,callback) {
	//console.log('Super');
	//console.log(Username);
	//console.log(Password);
	mongoose.connect("mongodb://mongodb:mongodb@172.31.46.248:27017/transaction", function(err) {
	if(err){
		//console.log('DB error occured');
		console.log('DB error occured'+err);
		modelslogin="DB Fail";
		callback(modelslogin);
	}
	var usernamefind={"Username":Username}

	LoginObj.find(usernamefind).count(function(err,count){
		if(err){
			//console.log('save failure');
			modelslogin="Fail";
			callback(modelslogin);
		}else{
				//console.log(count);
				if(count===1){

					LoginModels.validpassword(usernamefind,Password,function(validpasswordout){
						//console.log(validpasswordout);
						if(validpasswordout===false){
							mongoose.connection.close();
							modelslogin='Fail';
							callback(modelslogin);

						}else{
							mongoose.connection.close();
							modelslogin='Pass';
							callback(modelslogin);
						}
					});


				}else{
					mongoose.connection.close();
					modelslogin='Fail';
					callback(modelslogin);
				}
		}
		});
   });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports.setLogin=function(Username1,Password1,callback) {
	//console.log('Super');
	//console.log(Username1);
	//console.log(Password1);
	mongoose.connect("mongodb://userHKT:lrADL3lNvj2ug0gT@172.31.55.187:27017/transaction", function(err) {
	if(err){
		//console.log('DB error occured');
		console.log('DB error occured'+err);
		models="DB Fail";
		callback(models);
	}

	var usernamefind={"Username":Username1}
	//console.log(usernamefind);
	LoginObj.find(usernamefind).count(function(err,count){
		if(err){
			//console.log('save failure');
			models="DB Failed";
			callback(models);
		}else{
			if(count===1){
				models='Fail';
			    callback(models);
				mongoose.connection.close();
			}else{
				//console.log(count);
				LoginModels.generateharsh(Password1,function(hash){
					//console.log(hash);
					var Usernamefindnew=new LoginObj({"Username":Username1,"Password":hash,"Counter":1,"Logindate":new Date()});
					Usernamefindnew.save(function(err){
						if(err){
							//console.log('error');
							models='Fail';
						    mongoose.connection.close();
			    			callback(models);

						}else{
							//console.log('success');
							models='Pass';
							mongoose.connection.close();
			    			callback(models);
						}
					})
				});
			}
			}
			});
});
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


module.exports.updateLogin=function(Username1,Password1,callback) {
	//console.log('Super');
	//console.log(Username1);
	//console.log(Password1);
	mongoose.connect("mongodb://userHKT:lrADL3lNvj2ug0gT@172.31.55.187:27017/transaction", function(err) {
	if(err){
		console.log('DB error occured'+err);
		models="DB Fail";
		callback(models);
	}

	var usernamefind={"Username":Username1}
	//console.log(usernamefind);
	LoginObj.find(usernamefind).count(function(err,count){
		if(err){
			//console.log('save failure');
			models="DB Failed";
			callback(models);
		}else{
			if(count===0){
				models='Fail';
			    callback(models);
				mongoose.connection.close();
			}else{
				//console.log(count);
				LoginModels.generateharsh(Password1,function(hash){
					//console.log(hash);
					var usernamefind={"Username":Username1}
					LoginObj.findOne(usernamefind,function(err,Login){

								Login.Password=hash;
								Login.save(function(err){
									if(err){
										models='Fail';
			    						callback(models);
			    						mongoose.connection.close();
									}else{
										models='Pass';
			    						callback(models);
			    						mongoose.connection.close();
									}

								});
							});
				});
			}
			}
			});
});
}
