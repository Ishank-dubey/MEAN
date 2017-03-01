(function(){
	'use strict';
	angular.module('usersview').component('usersview',{
		templateUrl: "views/usersView.html",
		controller: controllerFunction,
		controllerAs: 'aCtrl'
	});
	controllerFunction.$inject = ['$scope', 'authServiceFactory','$location'];
	function controllerFunction($scope, authServiceFactory, $location){
	alert('fff')	
	}
})(); 