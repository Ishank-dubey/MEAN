(function(){
	'use strict';
	angular.module('login').component('login',{
		templateUrl: "views/loginView.html",
		controller: controllerFunction,
		controllerAs: 'aCtrl'
	});
	controllerFunction.$inject = ['$scope', 'authServiceFactory','$location'];
	function controllerFunction($scope, authServiceFactory, $location){
		var vm = this;
		vm.processing = false;
		vm.error = ''; 
		vm.doLogin = function() {
			vm.error = ''; 
			vm.processing = true;	
				 authServiceFactory.login(vm.loginData.username, vm.loginData.password)
			 .then(function(data) {
				 authServiceFactory.setToken(data.data.token);
				 vm.processing = false;
			 $location.path('/usersview');
			 },function(reason){
				vm.processing = false;
				vm.error = "Error";
			 }).catch(function(event){
				vm.processing = false;
			 });
			 };
			
			 vm.doLogout = function() {
				 authServiceFactory.logout();
			 vm.user = {};
			 $location.path('/login');
			 };
	}
})(); 