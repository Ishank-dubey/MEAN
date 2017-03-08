(function(){
	'use strict'
	var app = angular.module('MEAN',['ngRoute', 'home', 'login','usersview', 'authServiceModule','serviceModule']);
	
	
	app.controller('mainCtrl',mainFunction);
	mainFunction.$inject = ['$rootScope','authServiceFactory','serviceComponent','$http', '$location'];
	function mainFunction($rootScope, authServiceFactory, serviceComponent, $http, $location){
		var vm =  this;
		vm.loggedIn = authServiceFactory.isLoggedIn();		
		
		
		 $rootScope.$on('$routeChangeStart', function() {
		 vm.loggedIn = authServiceFactory.isLoggedIn();
		
		 
		 if(vm.loggedIn){
			 $http.defaults.headers.common['x-access-token'] 
			 = authServiceFactory.getToken();
			 
			 vm.username = authServiceFactory.username;
				 
			 
		 }else{
			 $location.path('/login');
		 }
		 
		 
		 });
		
		 
		 
		 
		 vm.doLogout = function() {
		 authServiceFactory.logout();
		 vm.user = {};
		 $location.path('/login');
		 };
		
		
	}; 
})();