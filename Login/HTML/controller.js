var app = angular.module('homescreen', ['ngRoute','ngAnimate','ngFileSaver','ui.bootstrap']);

app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
	$routeProvider.when('/',{
		templateUrl: '/form.html'
	});

	$routeProvider.when('/ObjectsDB',{
		templateUrl: '/homepage.html'
	});

	$routeProvider.when('/registration',{
		templateUrl: '/registration.html'
	});

	$routeProvider.when('/Testdata',{
		templateUrl: '/Testdata.html'
	});

	$routeProvider.when('/UserMgt',{
		templateUrl: '/Usermgt.html'
	});

	$routeProvider.when('/Livereporting',{
		templateUrl: '/Livereporting.html'
	});

	$routeProvider.when('/Passwordreset',{
		templateUrl: '/Passwordreset.html'
	});
	$routeProvider.when('/Batchfile',{
		templateUrl: '/batchfile.html'
	});

	$routeProvider.when('/BVf',{
		templateUrl: '/tables.html'
	});

	$routeProvider.when('/Jiraupload',{
		templateUrl: '/Jirauploader.html'
	});

	$routeProvider.when('/Transaction',{
		templateUrl: '/TransactionController.html'
	});

	$routeProvider.when('/Contact',{
        templateUrl: '/Contact.html'
    });
	$routeProvider.when('/Addbatch',{
	        templateUrl: '/Addbatch.html'
	});

	$routeProvider.otherwise({
       redirectTo: '/'
    });
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
}]);


app.controller('mlobjectpage', ['$scope', '$http', function($scope, $http) {
	$scope.choiceSet = {choices: []};
  $scope.choiceSet1 = {choices: []};

	$http.post('/api/searchcollection',[''])
  .then(function successCallback(response)
  {
		console.log(response.data);
  	$scope.choiceSet.choices = response.data;
  }, function errorCallback(response) {

  })


	$scope.viewname=function(z){
		//$scope.choiceSet = {choices: []};
		console.log($scope.choiceSet.choices[z].name);
		$http.post('/api/searchoncollection',[$scope.choiceSet.choices[z].name])
	 .then(function successCallback(response)
	 {
		 //console.log(response.data);
		 //$scope.Messagetable='Searchtable';
		 vm=this;
		 $scope.choiceSet1.choices= response.data;
		 //console.log($scope.choiceSet1);
	 }, function errorCallback(response) {

	 });
 }


}])



app.controller('formCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.stage = "";
  $scope.formValidation = false;
  $scope.toggleFormErrorsView = false;
	$scope.active1= 'active'
	$scope.active2=''
	$scope.active3=''
	$scope.screenname=''
	$scope.existscreenname=''
	$scope.s_url=''

	$http.post('/api/searchloadingindicator',[''])
  .then(function successCallback(response)
  {
		console.log(response.data);
  	$scope.messageparameter = response.data;
  }, function errorCallback(response) {

  })




  $scope.next = function (stage) {
		console.log(stage);
		if(stage==='stage1'){
			var vm = this;
			var datavalidation=''
			console.log(vm.screenname);
			//console.log($scope.existscreenname);
			if(vm.screenname==='' && vm.existscreenname===''){
				$scope.active1 = 'active'
				$scope.active2=''
				$scope.active3=''
				$scope.message1='Fail'
			}else{
				$scope.screenname=vm.screenname
				$scope.existscreenname=vm.existscreenname
				if(vm.existscreenname!=''){
					$scope.datavalidation='existingscreen'
				}
				if(vm.screenname!=''){
					$scope.datavalidation='newscreen'
				}
				//console.log(datavalidation);
				$scope.active1 = 'active'
				$scope.active2='active'
				$scope.active3=''
				$scope.direction = 1;
				$scope.message2=''
		    $scope.stage = stage;
			}
		}else if (stage==='stage3') {
			var vm = this;
			if(vm.s_url==='' && vm.s_giturl===''){
				$scope.active1 = 'active'
				$scope.active2='active'
				$scope.active3=''
				$scope.message2='Fail'
			}
			else{
				$scope.s_url=vm.s_url
				$scope.active1 = 'active'
				$scope.active2='active'
				$scope.active3='active'
				$scope.direction = 0;
				$scope.message2=''
		    $scope.stage = stage;
			}
		}else if (stage==='') {
			$scope.active1= 'active'
			$scope.active2=''
			$scope.active3=''
		}
      //$scope.formValidation = true;
      //$scope.formValidation = false;
  };

  $scope.back = function (stage) {
		if(stage==='stage1'){
			$scope.active1 = 'active'
			$scope.active2='active'
			$scope.active3=''
			$scope.message1=''
			$scope.message2=''
		}else if (stage==='stage3') {
			$scope.active1 = 'active'
			$scope.active2='active'
			$scope.active3='active'
			$scope.message1=''
			$scope.message2=''
		}else if (stage==='') {
			$scope.active1 = 'active'
			$scope.active2=''
			$scope.active3=''
			$scope.message1=''
			$scope.message2=''
		}
    $scope.direction = 0;
    $scope.stage = stage;
  };

	$scope.executescript = function () {
		var vm = this;
		console.log(vm.mvnpgt);
		console.log(vm.s_giturl);
		if(vm.mvnpgt) {
			$http.post('/api/runmvnscript',[vm.s_giturl])
		 .then(function successCallback(response)
		 {
				$scope.choiceSet.choices = response.data;
		 }, function errorCallback(response) {

		 })
		}
		if(vm.rbtpgt){
			$http.post('/api/runmvnscript',[vm.s_giturl])
		 .then(function successCallback(response)
		 {
				$scope.choiceSet.choices = response.data;
		 }, function errorCallback(response) {

		 })
		}

	}

	$scope.MLsubmit = function () {
		console.log($scope.screenname);
		var screen_name='';
		var vm =this;
		var datavalidation='';
		var scriptrunner='';
		if($scope.screenname!=''){
			screen_name=$scope.screenname
			datavalidation='newscreen'
		}else{
			screen_name=vm.existscreenname
			datavalidation='existingscreen'
		}
		console.log(vm.mlscript);
		if(vm.mlscript){
			scriptrunner='scripts';
		}else{
			scriptrunner='nonscripts'
		}
		//var scriptscenario =

		console.log(datavalidation);

		$http.post('/api/runmlmodel',[screen_name,$scope.s_url,vm.mlinput,datavalidation,scriptrunner])
	 .then(function successCallback(response)
	 {
			$scope.choiceSet.choices = response.data;
	 }, function errorCallback(response) {

	 })
  };

}]);

app.controller('regressiondownload', function($scope,$http,$location,$rootScope){
$scope.choiceSet = {choices: []};
$scope.viewreport = function () {
	$http.post('/downloadregressionreport',[$scope.reportjobname])
 .then(function successCallback(response)
 {
		$scope.choiceSet.choices = response.data;
 }, function errorCallback(response) {

 })
}


$scope.downloadreport = function (z) {
		$scope.fullurlpath="http://localhost:8008/downloadregreport/"+$scope.choiceSet.choices[z].foldername+"/"+$scope.choiceSet.choices[z].folderpath
}
})




app.controller('regressiontask1', function($scope,$http,$location,$rootScope){
	$scope.choiceSet = {choices: []};
	$rootScope.choiceSet={choices: []};

 $http.post('/viewbvfjob',[''])
 .then(function successCallback(response)
 {

 	$scope.choiceSet.choices = response.data;
 }, function errorCallback(response) {

 })





	$scope.reportdownload=function(z){
		//status
		//choiceSet.choices[z].executionstatus='loading'
		$rootScope.reportjobname=$scope.choiceSet.choices[z].jenkinsjobname;
	}


	$scope.jenkinsrun=function(z){
		//status
		//choiceSet.choices[z].executionstatus='loading'
		$http.post('/runjenkinsregression',[$scope.choiceSet.choices[z].jenkinsurl,$scope.choiceSet.choices[z].jenkinsjobname,$scope.choiceSet.choices[z].jenkinsjobparam])
	 .then(function successCallback(response)
		 {
			 //	choiceSet.choices[z].executionstatus='completed'
		 }, function errorCallback(response) {

		 })
	}



	$scope.deletebuild=function(z){
		//status
		//choiceSet.choices[z].executionstatus='loading'
		$http.post('/deletebvf',[$scope.choiceSet.choices[z]._id])
	 .then(function successCallback(response)
		 {
			if(response.data==='deleted'){
				$scope.ErrorMessage='deleted';
				$scope.successvalue='regression job deleted successfully';

 			}else{
 					$scope.ErrorMessage='Error Occurred';
 					$scope.Errorvalue='Error occurred while adding regression job';
 			}
			 //	choiceSet.choices[z].executionstatus='completed'
		 }, function errorCallback(response) {
		 })
	}
	$rootScope.updatescenarioname='';
	$rootScope.idnumber='';
	$rootScope.updatepassword='';
	$rootScope.updateusername='';
	$rootScope.updatebpaccnumber='';
	$scope.myFunctionUsername=function(z){
			var uname=$rootScope.updateusername;
			$http.post('/decryptvalue',[uname])
		 .then(function successCallback(response)
			 {
				 	$rootScope.updateusername=response.data;
			 },
			 function errorCallback(response) {
			})
	}

	$scope.myFunctionPassword=function(z){
			var passd=$rootScope.updatepassword;
			$http.post('/decryptvalue',[passd])
		 .then(function successCallback(response)
			 {
				 	$rootScope.updatepassword=response.data;
			 },
			 function errorCallback(response) {
			})
	}

	$scope.myFunctionBpno=function(z){
			var bpno=$rootScope.updatebpaccnumber;
			$http.post('/decryptvalue',[bpno])
		 .then(function successCallback(response)
			 {
				 	$rootScope.updatebpaccnumber=response.data;
			 },
			 function errorCallback(response) {
			})
	}



	$scope.updatejob=function(z){
		console.log($scope.choiceSet.choices[z].scenario);
		$rootScope.updatescenarioname=$scope.choiceSet.choices[z].scenario;
		$rootScope.idnumber=$scope.choiceSet.choices[z]._id;
		$rootScope.updatepassword=$scope.choiceSet.choices[z].password;
		$rootScope.updateusername=$scope.choiceSet.choices[z].username;
		$rootScope.updatebpaccnumber=$scope.choiceSet.choices[z].bpaccnumber;
	}



	$scope.updatebuild=function(){

		console.log($rootScope.idnumber);
		console.log($scope.updatescenarioname);
		$http.post('/updatebvfjob',[$rootScope.idnumber,$scope.updatescenarioname,$scope.updateusername,$scope.updatepassword,$scope.updatebpaccnumber])
	 .then(function successCallback(response)
		 {
			if(response.data==='updated'){
				$scope.scenario=''
			 $scope.username=''
			 $scope.password=''
			 $scope.bpaccnumber=''
			 $scope.Messagevalue='Task updated successfully';
			 }else{
					 $scope.ErrorMessage='Error Occurred';
					 $scope.Errorvalue='Error occurred while updating the task';
			 }
		 },
		 function errorCallback(response) {
		})
	}

	$scope.logout=function(){
 	 $http.post('/logout',['']).then(function successCallback(response)
 	{
 		$location.path("/");
 	}, function errorCallback(response) {

 	});
	}

})


app.controller('regressiontask', function($scope,$http,$location){
	$scope.Message=''
	$scope.scenario=''
	$scope.username=''
	$scope.password=''
	$scope.bpaccnumber=''
	$scope.Messagevalue=''


	$scope.addbuild = function () {
		//console.log($scope.scenarioname);
		$http.post('/addbvfjob',[$scope.scenario,$scope.username,$scope.password,$scope.bpaccnumber])
	 .then(function successCallback(response)
	 {
		 if(response.data==='created'){
			$scope.scenario=''
		 	$scope.username=''
		 	$scope.password=''
		 	$scope.bpaccnumber=''
			 $scope.Message='created';
			 $scope.Messagevalue='Task added successfully';

		 }else{
				 $scope.ErrorMessage='Error Occurred';
				 $scope.Errorvalue='Error occurred while adding test data';
		 }
	 }, function errorCallback(response) {

	 })

	}
})


app.controller('UserManagement', function($scope,$http,$location){

	$scope.Env='Environment';
	$scope.Chan='Channels';
	$scope.functionality='Functionality';

	//////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////


	//////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////






	$scope.choiceSet = {choices: []};

	$scope.searchchoice = function () {
		if($scope.environment==='Environment'){
			$scope.ErrorMessage = 'Error Occurred';
			$scope.Errorvalue='Kindly choice the valid value';
		}
		else{
			$scope.ErrorMessage = '';
		$http.post('/usermgtsearch',[$scope.environment]).then(function successCallback(response)
		{
				$scope.choiceSet.choices = response.data;
				$scope.Messagetable='Searchtable';

		}, function errorCallback(response) {

		});
	}
	}





	 $scope.quest = {};
	 $scope.ErrorMessage='';
	 $scope.successvalue='';
	 $scope.Errorvalue='';
	 $scope.choiceSet.choices = [];
	 $scope.addNewChoice = function () {
	 $scope.Messagetable='Searchtable';
			 $scope.choiceSet.choices.push('');

	 };


	 $scope.addChoice=function(z){

		 $http.post('/usermgtcreate',[$scope.choiceSet.choices[z].username,$scope.choiceSet.choices[z].password,$scope.choiceSet.choices[z].channel,$scope.choiceSet.choices[z].environment,$scope.choiceSet.choices[z].indicator,$scope.choiceSet.choices[z].portfolio,$scope.choiceSet.choices[z].comments])
		.then(function successCallback(response)
		{
			if(response.data==='testdata created'){
				$scope.ErrorMessage='created';
				$scope.successvalue='Test data added successfully';

			}else{
					$scope.ErrorMessage='Error Occurred';
					$scope.Errorvalue='Error occurred while adding test data';
			}
		}, function errorCallback(response) {

		});
	}

		$scope.deleteChoice=function(z){
 		 $http.post('/usermgtdelete',[$scope.choiceSet.choices[z]._id])
 		.then(function successCallback(response)
 		{
			if(response.data==='deleted'){
				$scope.ErrorMessage='created';
				$scope.successvalue='Test data deleted successfully';

 			}else{
 					$scope.ErrorMessage='Error Occurred';
 					$scope.Errorvalue='Error occurred while adding test data';
 			}
 		}, function errorCallback(response) {

 		});

	 }

	 $scope.updateChoice=function(z){
		 $http.post('/testdataupdate',[$scope.choiceSet.choices[z]._id,$scope.choiceSet.choices[z].url,$scope.choiceSet.choices[z].username,$scope.choiceSet.choices[z].password,$scope.choiceSet.choices[z].customernumber,$scope.choiceSet.choices[z].product,$scope.choiceSet.choices[z].pricingoption,
		 $scope.choiceSet.choices[z].odlimit,$scope.choiceSet.choices[z].status,$scope.choiceSet.choices[z].RunIndicator,$scope.functionality,$scope.choiceSet.choices[z].productid,$scope.choiceSet.choices[z].manufacturingID,$scope.choiceSet.choices[z].Excel])
		 .then(function successCallback(response)
		{


		 }, function errorCallback(response) {

		});
	 }



	 $scope.removeChoice = function (z) {
			 //var lastItem = $scope.choiceSet.choices.length - 1;
			 $scope.choiceSet.choices.splice(z,1);
	 };




})






app.controller('batmsgcontroller', function($scope,$http,$location){
	$scope.batchfile='TransactionType';
	$scope.Messagetable='Searchtablenew';
	$scope.choiceSet = {choices: []};
	$scope.ErrorMessage='No Error Occurred';
		 $scope.choiceSet.choices = [];
		 $scope.addNewChoice = function () {
			 	 $scope.Messagetable='Searchtable';
				 $scope.choiceSet.choices.push('');
		 };
		 $scope.deleteChoice=function(z){
			 $scope.Messagetable='Searchtable';
  		 $scope.choiceSet.choices.splice(z,1);
		}


		$scope.clearChoice=function(){
			$scope.Messagetable='Searchtablenew';
			$scope.choiceSet = {choices: []};
			$scope.Messageoutput='no';
			$scope.Datefld='';
			$scope.batchfile='TransactionType';
		}


		$scope.Generatefile=function(){
			postdate=$scope.Datefld;
			var date = new Date();
			var formattedyear=date.getFullYear().toString();
			var formattedMonth = ('0' + (date.getMonth() + 1)).slice(-2);
			var formattedDate = ('0' + (date.getDate() - 1)).slice(-2);
			var fullformateddate=formattedyear+''+formattedMonth+''+formattedDate;

			if($scope.batchfile==='TransactionType'){
					$scope.ErrorMessage='Error Occurred';
					$scope.Errorvalue='Check the Batch file type';
			}
			else if(isNaN($scope.Datefld) || postdate.length<8){
				$scope.ErrorMessage='Error Occurred';
				$scope.Errorvalue='Please check the Posting date field';

			}

			else if(parseInt(fullformateddate) > parseInt(postdate) ){
				$scope.ErrorMessage='Error Occurred';
				$scope.Errorvalue='Posting date should be greater than or equal to current date';

			}
			else{
					 $http.post('/batchfilecreator',[$scope.batchfile,$scope.choiceSet.choices,$scope.Datefld])
				 	.then(function successCallback(response)
				 	{
						$scope.Messagevaluefn=response.data;
						$scope.Messageoutput='Messageoutput';
					}, function errorCallback(response) {

					});
			}

			}
});

app.controller('ModalContentCtrl', function($scope,$http,$location,$uibModalInstance){
	$scope.Messagetable='';
	$scope.ErrorMessage='test';
  $scope.ok = function(){
    $uibModalInstance.close("Ok");
  }
  $scope.cancel = function(){
    $uibModalInstance.dismiss();
  }




 $scope.addChoices=function(z){
	 $scope.Messagetable='Searchtable';
 $http.post('/transactionfeeder',[$scope.choiceSet.choices[z].transactiondescription,$scope.choiceSet.choices[z].transactioncode,$scope.choiceSet.choices[z].accountnumber,$scope.choiceSet.choices[z].amount,$scope.choiceSet.choices[z].medium,$scope.choiceSet.choices[z].sendingapplication])
 .then(function successCallback(response)
 {
	if(response.data==='testdata created'){
		$scope.ErrorMessage='created';
		$scope.successvalue='Transaction added successfully';

	}else{
			$scope.ErrorMessage='Error Occurred';
			$scope.Errorvalue='Error occurred while adding test transaction';
	}
 }, function errorCallback(response) {

 });
}



		$scope.choiceSet = {choices: []};
		$scope.ErrorMessage='No Error Occurred';
		 $scope.choiceSet.choices = [];
		 $scope.addNewChoice = function () {
				 $scope.Messagetable='Searchtable';
				 $scope.ErrorMessage='';
				 $scope.choiceSet.choices.push('');
		 };

		 $scope.search=function(){
			 $scope.Messagetable='Searchtable';
			 $scope.ErrorMessage='';
			 $http.post('/searchtransactiondata',[""]).then(function successCallback(response)
	 	 	{
	 				$scope.choiceSet.choices = response.data;
	 				$scope.Messagetable='Searchtable';

	 		}, function errorCallback(response) {

	 		});
		 }


		 $scope.deleteChoice=function(z){
			 $scope.Messagetable='Searchtable';
			 $http.post('/deltransactiondata',[$scope.choiceSet.choices[z]._id])
		 	.then(function successCallback(response)
		 	{
				if(response.data==='deleted'){
					$scope.ErrorMessage='created';
					$scope.successvalue='Test data deleted successfully';
				}else{
					$scope.ErrorMessage='Error Occurred';
					$scope.Errorvalue='Error occurred while deleting test data';
				}
			}, function errorCallback(response) {

			});
  		 $scope.choiceSet.choices.splice(z,1);

		}


});

app.controller('testdatacontroller', function($scope,$http,$location,$uibModal){
		$scope.open = function() {
	    var modalInstance =  $uibModal.open({
	      templateUrl: "modalContent.html",
	      controller: "ModalContentCtrl",
	      size: '100',
	    });
	  };








	$scope.Env='Environment';
	$scope.Chan='Channels';
	$scope.functionality='Functionality';

	//////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////






	$scope.choiceSet = {choices: []};

	$scope.searchchoice = function () {
		if($scope.functionality==='Functionality'){
			$scope.ErrorMessage = 'Error Occurred';
			$scope.Errorvalue='Kindly choice the valid value';
		}
		else{
			$scope.ErrorMessage = '';
		$http.post('/testdatasearch',[$scope.functionality]).then(function successCallback(response)
	 	{
				$scope.choiceSet.choices = response.data;
				$scope.Messagetable='Searchtable';

		}, function errorCallback(response) {

		});
	}
	}





	 $scope.quest = {};
	 $scope.ErrorMessage='';
	 $scope.successvalue='';
	 $scope.Errorvalue='';
	 $scope.choiceSet.choices = [];
	 $scope.addNewChoice = function () {
   $scope.Messagetable='Searchtable';
			 $scope.choiceSet.choices.push('');

	 };


	 $scope.addChoice=function(z){

		 $http.post('/testdatafeeder',[$scope.choiceSet.choices[z].url,$scope.choiceSet.choices[z].username,$scope.choiceSet.choices[z].password,$scope.choiceSet.choices[z].customernumber,$scope.choiceSet.choices[z].product,$scope.choiceSet.choices[z].pricingoption,
		 $scope.choiceSet.choices[z].odlimit,$scope.choiceSet.choices[z].status,$scope.choiceSet.choices[z].RunIndicator,$scope.functionality,$scope.choiceSet.choices[z].productid,$scope.choiceSet.choices[z].manufacturingID,$scope.choiceSet.choices[z].Excel])
	 	.then(function successCallback(response)
	 	{
			if(response.data==='testdata created'){
				$scope.ErrorMessage='created';
				$scope.successvalue='Test data added successfully';

			}else{
					$scope.ErrorMessage='Error Occurred';
					$scope.Errorvalue='Error occurred while adding test data';
			}
		}, function errorCallback(response) {

		});

	 }

	 $scope.updateChoice=function(z){
		 $http.post('/testdataupdate',[$scope.choiceSet.choices[z]._id,$scope.choiceSet.choices[z].url,$scope.choiceSet.choices[z].username,$scope.choiceSet.choices[z].password,$scope.choiceSet.choices[z].customernumber,$scope.choiceSet.choices[z].product,$scope.choiceSet.choices[z].pricingoption,
		 $scope.choiceSet.choices[z].odlimit,$scope.choiceSet.choices[z].status,$scope.choiceSet.choices[z].RunIndicator,$scope.functionality,$scope.choiceSet.choices[z].productid,$scope.choiceSet.choices[z].manufacturingID,$scope.choiceSet.choices[z].Excel])
		 .then(function successCallback(response)
 	 	{


		 }, function errorCallback(response) {

 		});
	 }

	 $scope.deleteChoice=function(z){
		 $http.post('/deltestdata',[$scope.choiceSet.choices[z]._id])
	 	.then(function successCallback(response)
	 	{
			if(response.data==='deleted'){
				$scope.ErrorMessage='created';
				$scope.successvalue='Test data deleted successfully';
			}else{
				$scope.ErrorMessage='Error Occurred';
				$scope.Errorvalue='Error occurred while deleting test data';
			}
		}, function errorCallback(response) {

		});
		$scope.choiceSet.choices.splice(z,1);
	 }

	 $scope.removeChoice = function (z) {
			 //var lastItem = $scope.choiceSet.choices.length - 1;
			 $scope.choiceSet.choices.splice(z,1);
	 };
	});

app.controller('swifttranscontroller', function($scope,$http,$location){
	$scope.searchfunction=function(){

	$http.post('/ITTASearch',[$scope.RefNum,$scope.PostingDate])
	.then(function successCallback(response)
	{
	if(response.data.length===0){
		$scope.MessageMongodb='Mongodb value';
		$scope.Mongodbvalue='Data not displayed';
		$scope.Messagetable='';
		//$scope.Referencenumber=response.data;
	}else{
		$scope.MessageMongodb='';
		$scope.Mongodbvalue='';
		$scope.Messagetable='Searchtable';
		$scope.Referencenumber=response.data;
	}
	}, function errorCallback(response) {
		$scope.MessageMongodb='Mongodb value';
		$scope.Mongodbvalue='Data not displayed';
		$scope.Messagetable='';
	});
}

$scope.clicked=function(){

	if( $scope.Password===null){
	}else{
		$scope.loading=true;
		try {
			$http.post('/login',[$scope.Password]).then(function successCallback(response) {
			    $scope.message=response.data;
			    if(response.data==='Pass'){
			    	$location.path( "/BVf" );
			    }
				$scope.loading=false;
			}, function errorCallback(response) {
	 		});

			}
		catch(err){
			$scope.loading=false;

		}
	 }
	}
$scope.Regclicked=function(){

	if($scope.UsernameReg===null && $scope.PasswordReg===null){

	}else{
		try {
			$http.post('/registration',[$scope.UsernameReg,$scope.PasswordReg])

			.then(function successCallback(response) {

			    $scope.message=response.data;
			    $scope.one = true;
			}, function errorCallback(response) {
	 		});
			}
		catch(err){

		}
	 }
	}
$scope.Resetclicked=function(){

	if($scope.UsernameReset===null && $scope.PasswordReset===null){

	}else{
		try {
			$http.post('/Passwordreset',[$scope.UsernameReset,$scope.PasswordReset])

			.then(function successCallback(response) {

			    $scope.message=response.data;
			    $scope.one = true;
			}, function errorCallback(response) {
	 		});
			}
		catch(err){

		}
	 }
	}


$scope.Cleardata=function(){
	//console.log($scope.Mesagevalue);

	$scope.RefNum=null;
	$scope.PostingDate=null;
	$scope.Messagetable='No Searchtable';
	$scope.MessageMongodb='No Mongodb value';
	$scope.Mongodbvalue='No Data not displayed';
}

});


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

app.controller('swiftmsgcontroller', function($scope,$http,$location){
	$scope.msgtype='Transaction Type';
	$scope.subdropdown='Sub Transaction Type';
	$scope.tdposition='undisplayed';
	$scope.message='undisplay';
	$scope.MesageErrortype='';
 $scope.logout=function(){
	 $http.post('/logout',['']).then(function successCallback(response)
	{
		$location.path("/");
	}, function errorCallback(response) {

	});
	mongoose.connection.close();


}


	$scope.epicnamechnge=function(){
		//$scope.msgtype='Transaction Type';
		//$scope.subdropdown='Sub Transaction Type';
		$scope.tdposition='undisplayed';
		$scope.message='undisplay';
		$http.post('/uniqueepicname',[$scope.batchname]).then(function successCallback(response)
		{
			if(response.data=='Already exist'){
					$scope.MesageErrortype='Error value';
			}
		}, function errorCallback(response) {

		});
	}



$scope.upoadfiles=function(){
		$http.post('/Addbatchvalue',[$scope.batchname,$scope.batchdate]).then(function successCallback(response)
		{
			if(response.data==='Pass'){
			$scope.MessageMongodb="Data instert";
			$scope.Mongodbvalue="Value inserted successfully into DB"
		}else{
			$scope.MessageMongodb="Error value";
			$scope.Mongodbvalue="Value insert failed"
		}
		}, function errorCallback(response) {

		});
	}




	$scope.clearfiles=function(){
		$http.get('/clearfiles').then(function successCallback(response)
		{
			var filevalue=response.data;
			var splitfilename=filevalue.split('_');

			$scope.valuedeleted=splitfilename[0];
			$scope.valueundeleted=splitfilename[1];

			$scope.tdposition='displayed';
			$scope.message='undisplay';
			$scope.MessageMongodb="undisplay";
			//$scope.Mongodbvalue="Value insert failed"
		}, function errorCallback(response) {

		});
	}

		$scope.setClickedRow = function(index,filesvl){

			var fileame=filesvl[index].Filename

			$http.get('/downloadfile/'+filesvl[index].Filename).then(function successCallback(response)
			{

			}, function errorCallback(response) {

			});
		}


	$scope.displayfile=function(){
		var diplay='dis';


		$http.post('/displayfiles',["test"]).then(function successCallback(response)
		{
			$scope.filesvl=response.data;
			$scope.message='display';
		}, function errorCallback(response) {

		});
	}

	$scope.textChanged=function(){
		$scope.MessageError='Error not value';
		$scope.Message='Resulted not displayed';
		$scope.Mesagevalue='';
		$scope.MessageMongodb='';
		$scope.Mongodbvalue='';

		$http.post('/uniquerefnumber',[$scope.RefNum]).then(function successCallback(response) {
			if(response.data.length===0){
				$scope.MessageError='';
			}else{
				$scope.MessageError='Error value';
				$scope.MesageErrortype='The Reference number is not a unique value Please change it';
			}
		}, function errorCallback(response) {
		});
	}

	$scope.upper = function(Currencycode){
	$scope.Currencycode = Currencycode.toUpperCase();
	}

	$scope.Generate=function(){
	$scope.MessageError='Error not value';
	$scope.Message='Resulted not displayed';
	$scope.Mesagevalue='';
	$scope.MessageMongodb='';
	$scope.Mongodbvalue='';



	var postdate=$scope.PostingDate;
	var date = new Date();
	var formattedyear=date.getFullYear().toString().substr(2,2);
	var formattedMonth = ('0' + (date.getMonth() + 1)).slice(-2);
	var formattedDate = ('0' + date.getDate()).slice(-2);
	var fullformateddate=formattedyear+''+formattedMonth+''+formattedDate;

	var currencyfld=$scope.Currencycode;
	var amt=$scope.Amount;
	if($scope.msgtype=='Transaction Type' || $scope.msgtype==null)
	{
		$scope.MessageError='Error value';
		$scope.MesageErrortype='Please check the values filled';
	}

    else if($scope.subdropdown=='Sub Transaction Type' || $scope.subdropdown==null)
	{
		$scope.MessageError='Error value';
		$scope.MesageErrortype='Please select the Sub Transaction Type';
	}

    else if($scope.RefNum==null){
		$scope.MessageError='Error value';
		$scope.MesageErrortype='Reference number field should not be empty';
		mongoose.connection.close();
	}

	else if(isNaN($scope.PostingDate) || postdate.length<6){
		$scope.MessageError='Error value';
		$scope.MesageErrortype='Please check the Posting date field';
		mongoose.connection.close();
	}
	else if(parseInt(fullformateddate)>parseInt(postdate)){
		$scope.MessageError='Error value';
		$scope.MesageErrortype='Posting date should be greater than or equal to current date';
		mongoose.connection.close();
	}
	else if(isNaN($scope.Accountnum)){
		$scope.MessageError='Error value';
		$scope.MesageErrortype='Please check the Account Number field';
		mongoose.connection.close();
	}

	else if(($scope.Currencycode==null)||(isNaN($scope.Currencycode)===false)|| currencyfld.length<3){
		$scope.MessageError='Error value';
		$scope.MesageErrortype='Please check the currency field';
		mongoose.connection.close();
	}
	else if((amt==null)||(amt.includes(',')===false)){
		$scope.MessageError='Error value';
		$scope.MesageErrortype='Please check the Amount field';
		mongoose.connection.close();
	}
	else if(($scope.FeeAmount==null)||($scope.FeeAmount.includes(',')===false )){
		$scope.MessageError='Error value';
		$scope.MesageErrortype='Please check the Fee Amount field';
		mongoose.connection.close();
	}
	else if($scope.subdropdown==null){
		$scope.MessageError='Error value';
		$scope.MesageErrortype='Please check the Sub dropdown field';
		mongoose.connection.close();
	}


	else{
	$http.post('/swiftmsg',[$scope.msgtype,$scope.RefNum,$scope.PostingDate,$scope.Accountnum,$scope.Currencycode,$scope.Amount,$scope.FeeAmount,$scope.subdropdown,$scope.ToAccountnum]).then(function successCallback(response)
	{

		var str=response.data;
		//str = str.replace('\n', '');
		var submsgtype=$scope.subdropdown
		var PostingdateCurrencyAmount=$scope.PostingDate+$scope.Currencycode+$scope.Amount;
		var CurrencyAmount=$scope.Currencycode+$scope.Amount;
		var CurrencyFeeAmt=$scope.Currencycode+$scope.FeeAmount;
		//
		str = str.replace('/n','');
		str = str.replace('ToAccountNumber', $scope.ToAccountnum);
		str = str.replace('Referencenumber', $scope.RefNum);
		str = str.replace('PostingdateCurrencyAmountval', PostingdateCurrencyAmount);
		str = str.replace('CurrencyAmountvalue', CurrencyAmount);
		str = str.replace('CurrencyFeeAmount', CurrencyFeeAmt);
		str = str.replace('AccountNumber', $scope.Accountnum);
		str = str.replace('Postingdate',$scope.PostingDate);
		str = str.replace('Postingdate',$scope.PostingDate);
		str = str.replace('Postingdate',$scope.PostingDate);

		$scope.Message='Resulted value';
		$scope.Mesagevalue=str;
	}, function errorCallback(response) {

	});
	}
	}

	$scope.Postmsg=function(){

	$scope.MessageError='Error not value';
	$scope.MessageMongodb='';
	$scope.Mongodbvalue='';

	$http.post('/Transactionalmessage',['Testuser',$scope.RefNum,$scope.Mesagevalue,$scope.PostingDate,'Success']).then(function successCallback(response) {
		if(response.data==='Pass'){
			$scope.MessageMongodb='Mongodb value';
			$scope.Mongodbvalue='Data Successfully inserted in Mongodb and MQ. Please Navigate to transaction tab to verify';
		}else if(response.data==='DB Fail'){
			$scope.MessageMongodb='DB Error Occurred Please contact system Admin';
			$scope.Mongodbvalue='DB Error Occurred Please contact system Admin';
		}else{
			$scope.MessageMongodb='Data insterting Failed Please contact system Admin';
			$scope.Mongodbvalue='Data insterting Failed Please contact system Admin';
		}
	}, function errorCallback(response) {

	});
	}


$scope.Clearall=function(){
	//console.log($scope.Mesagevalue);
	$scope.MessageError='Error not value';
	$scope.Mesagevalue='';
	$scope.MessageMongodb='';
	$scope.Mongodbvalue='';
	$scope.msgtype='Transaction Type';
	$scope.subdropdown='Sub Transaction Type';
	$scope.RefNum=null;
	$scope.Currencycode=null;
	$scope.Accountnum=null;
	$scope.Amount=null;
	$scope.PostingDate=null;
	$scope.Currencycode=null;
	$scope.FeeAmount=null;
	$scope.Message='No Resulted value';
}
});
