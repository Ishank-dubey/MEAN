(function(){
	'use strict';
	angular.module('home').component('home',{
		templateUrl: "home.html",
		controller: controllerFunction,
		controllerAs: 'aCtrl'
	});
	controllerFunction.$inject = ['$scope', '$http', 'serviceComponent'];
	function controllerFunction($scope, $http, serviceComponent){
		var self =  this;
		
		self.tableDataArray = [{name:'q',username:'w',password:'a'}];
		self.message = 'Message';
		self.tableData = {};
		self.tableFunction = function(){
			self.tableDataArray.push(self.tableData);
			self.tableData = {};
		}
		
		serviceComponent.all().then(function(data){
			console.log(data);
		});
		
		/*$http.get('/admin/users').then(function(data){
		    	console.log(data);
		});*/
		
	}
})();