(function(){
	'use strict';
	angular.module('home').component('home',{
		templateUrl: "home.html",
		controller: controllerFunction,
		controllerAs: 'aCtrl'
	});
	controllerFunction.$inject = ['$scope', '$http', 'serviceComponent', 'authServiceFactory'];
	function controllerFunction($scope, $http, serviceComponent, authServiceFactory){
		this.message = 'Welcome to User CRM!';
		
		/*$http.get('/admin/users').then(function(data){
		    	console.log(data);
		});*/
		
	}
})();