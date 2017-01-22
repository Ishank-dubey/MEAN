(function(){
	'use strict';
	angular.module('home').component('home',{
		templateUrl: "home.html",
		controller: controllerFunction,
		controllerAs: 'aCtrl'
	});
	controllerFunction.$inject = ['$scope'];
	function controllerFunction($scope){
		var self =  this;
		self.prop = 'hi';
		self.tableDataArray = [{name:'q',username:'w',password:'a'}];
		self.message = 'Message';
		self.tableData = {};
		self.tableFunction = function(){
			self.tableDataArray.push(self.tableData);
			self.tableData = {};
		}
		
	}
})();