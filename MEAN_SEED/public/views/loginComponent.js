(function(){
	'use strict';
	angular.module('login').component('login',{
		templateUrl: "views/loginView.html",
		controller: controllerFunction,
		controllerAs: 'aCtrl'
	});
	controllerFunction.$inject = ['$scope'];
	function controllerFunction($scope){
		this.test = 'Test';
		alert("loogon");
		/*$http.get('/admin/users').then(function(data){
		    	console.log(data);
		});*/
		
	}
})();