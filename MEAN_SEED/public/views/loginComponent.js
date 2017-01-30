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
		vm.doLogin = function() {
			
				 authServiceFactory.login(vm.loginData.username, vm.loginData.password)
			 .then(function(data) {
			 console.log(data);
			 $location.path('/users');
			 },function(reason){
				 console.log(reason);
			 }).catch(function(event){
				 console.log(event);
			 });
			 };
			
			 vm.doLogout = function() {
				 authServiceFactory.logout();
			 vm.user = {};
			 $location.path('/login');
			 };
	}
})(); 