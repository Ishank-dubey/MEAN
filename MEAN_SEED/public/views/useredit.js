(function(){
	'use strict';
	angular.module('usersview').component('useredit',{
		templateUrl: "views/usersCreateView.html",
		controller: controllerFunction,
		controllerAs: 'user'
	});
	controllerFunction.$inject = ['$routeParams', 'serviceComponent'];
	function controllerFunction($routeParams, serviceComponent){
		 var vm = this;
		
		 vm.type = 'edit';
		
		 serviceComponent.get($routeParams.person_id)
		  .then(function(data) {
				 vm.processing = false;
				console.log(data);	
				 // clear the form
				 vm.userData = {};
				 vm.userData.username = data.data[0].username;
				 vm.userData.name = data.data[0].name;
			});
		 
		  // function to save the user
		  vm.saveUser = function() {
		  vm.processing = true;
		  vm.message = '';
		 
		  // call the userService function to update
		  serviceComponent.updateUser($routeParams.person_id, vm.userData)
		  .then(function(data) {
		  vm.processing = false;
		 
		  // clear the form
		  vm.userData = {};
		 
		  // bind the message from our API to vm.message
		  vm.message = data.data.message;
		  });
		  };
	}	
	})(); 