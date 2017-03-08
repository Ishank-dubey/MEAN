(function(){
	'use strict'
	
	angular.module('MEAN').config(routeFunction);
	
	routeFunction.$inject = ['$routeProvider','$locationProvider'];
	
	function routeFunction($routeProvider, $locationProvider){
		$routeProvider.when('/home',{
			template : '<home></home>'
		}).when('/login',{
			template : '<login></login>'
		}).when('/usersview',{
			template : '<usersview1></usersview1>'
		}).when('/usersview/create',{
			template : '<userscreate></userscreate>'
		}).otherwise({
			redirectTo : '/home'
		});
		
		$locationProvider.html5Mode(true);
	}	
})();