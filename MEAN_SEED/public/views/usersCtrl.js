(function(){
	'use strict';
	angular.module('usersview').component('usersview1',{
		templateUrl: "views/usersView.html",
		controller: controllerFunction,
		controllerAs: 'user'
	});
	controllerFunction.$inject = ['$scope', 'authServiceFactory','$location', 'serviceComponent'];
	function controllerFunction($scope, authServiceFactory, $location, serviceComponent){
		var vm = this;
		vm.processing = true;
		
		serviceComponent.getUser("")
		 .then(function(data) {
			 console.log(data);
			 vm.processing = false;
			 vm.users = data.data;
		 },function(reason){
			vm.processing = false;
			vm.error = "Error";
		 }).catch(function(event){
			vm.processing = false;
		 });
		
		vm.deleteUser = function(id) {
			 vm.processing = true;
			
			 serviceComponent.delete(id)
			 .success(function(data) {
			 User.all()
			 .success(function(data) {
			 vm.processing = false;
			 vm.users = data.data;
			 });
			
			 });
			 };
	}
})(); 