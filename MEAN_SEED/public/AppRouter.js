(function(){
	'use strict'
	
	angular.module('MEAN').config(routeFunction);
	
	routeFunction.$inject = ['$routeProvider','$locationProvider'];
	
	function routeFunction($routeProvider, $locationProvider){
		$routeProvider.when('/home',{
			template : '<home></home>'
		}).when('/sex',{
			template : '<login></login>'
		}).otherwise({
			redirectTo : '/home'
		});
		
		$locationProvider.html5Mode(true);
	}	
})();