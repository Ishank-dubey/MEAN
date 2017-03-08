(function(){
	'use strict';
	angular.module('usersview').component('userscreate',{
		templateUrl: "views/usersCreateView.html",
		controller: controllerFunction,
		controllerAs: 'user'
	});
	controllerFunction.$inject = ['$scope', 'authServiceFactory','$location', 'serviceComponent'];
	function controllerFunction($scope, authServiceFactory, $location, serviceComponent){
		 var vm = this;
		
		vm.type = 'create';
		
		 vm.saveUser = function() {
		 vm.processing = true;
		
		 vm.message = '';
		
		 serviceComponent.createUser(vm.userData)
		 .then(function(data) {
		 vm.processing = false;
		
		 // clear the form
		 vm.userData = {};
		 vm.message = data.data.message;
		 });
		
		 };
	}	
	})(); 