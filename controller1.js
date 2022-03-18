var app = angular.module('homescreen', ['ngRoute','ngAnimate']);

app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
	$routeProvider.when('/',{
		templateUrl: '/login.html'
	});
	$routeProvider.when('/registration',{
		templateUrl: '/registration.html'
	});
	$routeProvider.when('/Passwordreset',{
		templateUrl: '/Passwordreset.html'
	});
	$routeProvider.when('/Homepage',{
		templateUrl: '/Homepage.html'
	});
	$routeProvider.otherwise({
       redirectTo: '/'
    });
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});

}]);



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.controller('logincontroll',	function($scope,$http,$location){
		
	console.log("Hello world from controller")
	console.log("Hello world from controller")
	$scope.clicked=function(){

	if($scope.Username===null && $scope.Password===null){
			
	}else{	
		$scope.loading=true;	
		try {		
			$http.post('/login',[$scope.Username,$scope.Password]).then(function successCallback(response) {
			    	
			    console.log(response);	
			    $scope.message=response.data;
			    if(response.data==='Pass'){
			    	$location.path( "/Homepage" );	
			    }    
				$scope.loading=false;
			}, function errorCallback(response) {
	 		});
	 		
			}
		catch(err){
			$scope.loading=false;	
			console.log('Failed to connect DB');
		}
	 }	
	}	
	});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.controller('logincontrol1',	function($scope,$http,$location){
		
	console.log("Hello world from controller")
	console.log("Hello world from controller")
	$scope.Regclicked=function(){
		console.log($scope.UsernameReg);
		console.log($scope.PasswordReg);
	if($scope.UsernameReg===null && $scope.PasswordReg===null){

	}else{	
		try {		
			$http.post('/registration',[$scope.UsernameReg,$scope.PasswordReg])

			.then(function successCallback(response) {
			    console.log(response);	
			    $scope.message=response.data;
			    $scope.one = true; 
			}, function errorCallback(response) {
	 		});
			}
		catch(err){
			console.log('Failed to connect DB');
		}
	 }	
	}	
	});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
app.controller('Homepagecontroller', function($scope,$http,$location){
	console.log("Hello world from controller")
	console.log("Hello world from controller")
	console.log("Hello world from controller")
	$scope.Search=function(){
		console.log($scope.brival)
		if(($scope.Environment==='Environment')||($scope.ProductArea==='DEV1')||($scope.ProductCat==='DEV1') ||($scope.SearchCri==='DEV1')){
			$scope.Message='Please Recheck and Submit once again';
		}else{
			if($scope.SearchCri==='BRI'){
					try {
						$http.post('/BRI',[$scope.Environment,$scope.brival,$scope.ProductCat,$scope.ProductArea])

						.then(function successCallback(response) {
						    console.log(response.data.length);
						    if(response.data.length===0){
								$scope.Message='No Result Found';
						    }else{
						    	$scope.BriItem=response.data;
						    	$scope.Message='BRITable';

						    }
						    $scope.message=response.data;
						    $scope.one = true; 
						}, function errorCallback(response) {
								$scope.Message='No Result Found';
				 		});
				 }
				 	catch(err){
						console.log('Failed to connect DB');
				}
				}			
		 if($scope.SearchCri==='Accounts in Arears')	{
			 	try {
					$http.post('/AccountArrear',[$scope.Environment])
					.then(function successCallback(response) {
					    console.log(response.data.length);
					    if(response.data.length===0){
							$scope.Message='No Result Found';
					    }else{
					    	$scope.AccountArrearTable=response.data;
					    	$scope.Message='AccountArrearTable';

					    }
					    $scope.AcctArrear=response.data;
					    $scope.one = true; 
					}, function errorCallback(response) {
							$scope.Message='No Result Found';
			 		});
			 }
			 	catch(err){
					console.log('Failed to connect DB');
			}
			}	
}
			console.log($scope.brival)
}
		
		
	
	$scope.$watch('selectedRow', function() {
	});

	$scope.setClickedRow = function(index,BriItem){
		$scope.selectedRow = index;
		console.log(index);
		console.log(BriItem[index]);
		try {

		$http.post('/BRItable',[BriItem[index]])
			.then(function successCallback(response) {
				if(response.data=="Account is Locked and Please try the other account"){
					$scope.Message=response.data;	
				}else{
						try {
							console.log($scope.Environment);
								$http.post('/BRI',[$scope.Environment,$scope.brival,$scope.ProductCat,$scope.ProductArea])
								.then(function successCallback(response) {
								    console.log(response.data.length);
								    if(response.data.length===0){
										$scope.Message='No Result Found';
								    }else{
								    	$scope.BriItem=response.data;
								    	$scope.Message='BRITable';

								    }
								    $scope.message=response.data;
								    $scope.one = true; 
								}, function errorCallback(response) {
										$scope.Message='No Result Found';
						 		});

							}catch(err){
						console.log('Failed to connect DB');
						}
						}
					
					
					}, function errorCallback(response) {
				 	});
			}
		catch(err){

		}	
	}

	app.directive('arrowSelector',['$document',function($document){
		return{
			restrict:'A',
			link:function(scope,elem,attrs,ctrl){
				var elemFocus = false;             
				elem.on('mouseenter',function(){
					elemFocus = true;
				});
				elem.on('mouseleave',function(){
					elemFocus = false;
				});
				$document.bind('keydown',function(e){
					if(elemFocus){
						if(e.keyCode == 38){
							
							if(scope.selectedRow == 0){
								return;
							}
							scope.$apply(function(){
								scope.selectedRow--;
							});
							e.preventDefault();
						}
						if(e.keyCode == 40){
							if(scope.selectedRow == scope.foodItems.length - 1){
								return;
							}
							scope.selectedRow++;
							scope.$apply();
							e.preventDefault();
						}
					}
				});
			}
		};
	}]);

	
});



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.controller('logincontrol2',	function($scope,$http,$location){
	console.log("Hello world from controller")
	console.log("Hello world from controller")
	$scope.Resetclicked=function(){
		console.log($scope.UsernameReset);
		console.log($scope.PasswordReset);
	if($scope.UsernameReset===null && $scope.PasswordReset===null){

	}else{	
		try {		
			$http.post('/Passwordreset',[$scope.UsernameReset,$scope.PasswordReset])

			.then(function successCallback(response) {
			    console.log(response);	
			    $scope.message=response.data;
			    $scope.one = true; 
			}, function errorCallback(response) {
	 		});
			}
		catch(err){
			console.log('Failed to connect DB');
		}
	 }	
	}	
	});

app.controller('logincontrol2',	function($scope,$http,$location){
		
	console.log("Hello world from controller")
	console.log("Hello world from controller")


});








app.controller('logincontrol',	function($scope,$http){

		console.log("Hello world from controller")
		console.log("Hello world from controller")
		$http({
		  method: 'GET',
		  url: '/customersearch'

		}).then(function successCallback(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    console.log(response);	
		    $scope.datalist=response.data;
		}, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
 		});
	});





