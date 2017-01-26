(function(){
	'use strict';
	angular.module('home').component('home',{
		templateUrl: "home.html",
		controller: controllerFunction,
		controllerAs: 'aCtrl'
	});
	controllerFunction.$inject = ['$scope', '$http'];
	function controllerFunction($scope, $http){
		var self =  this;
		
		self.tableDataArray = [{name:'q',username:'w',password:'a'}];
		self.message = 'Message';
		self.tableData = {};
		self.tableFunction = function(){
			self.tableDataArray.push(self.tableData);
			self.tableData = {};
		}
		
		$http.get('/admin/users').then(function(data){
		    	console.log(data);
		});
		
	}
})();