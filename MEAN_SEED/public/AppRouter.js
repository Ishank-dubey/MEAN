(function(){
	'use strict'
	
	angular.module('MEAN').config(routeFunction);
	
	routeFunction.$inject = ['$routeProvider'];
	
	function routeFunction($routeProvider){
		$routeProvider.when('/home',{
			template : '<home></home>'
		}).otherwise({
			redirectTo : '/home'
		});
	}
})();