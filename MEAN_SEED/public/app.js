(function(){
	'use strict'
	var app = angular.module('MEAN',['ngRoute', 'home', 'login','authServiceModule','serviceModule']);
	
	app.controller('mainCtrl',mainFunction);
	mainFunction.$inject = ['$rootScope','authServiceFactory','serviceComponent'];
	function mainFunction($rootScope, authServiceFactory, serviceComponent){
		var vm =  this;
		vm.loggedIn = authServiceFactory.isLoggedIn();
		
		
		
		
		// check to see if a user is logged in on every request
		 $rootScope.$on('$routeChangeStart', function() {
		 vm.loggedIn = authServiceFactory.isLoggedIn();
		
		 // get user information on route change
		authServiceFactory.getUser().then(function(data) {
		 vm.user = data;
		 								},function(reason){
		 console.log(reason);
		 });
		 });
		
		 // function to handle login form
		 vm.doLogin = function() {
		
		 // call the Auth.login() function
			 authServiceFactory.login(vm.loginData.username, vm.loginData.password)
		 .success(function(data) {
		
		 // if a user successfully logs in, redirect to users page
		 $location.path('/users');
		 });
		 };
		
		 // function to handle logging out
		 vm.doLogout = function() {
			 authServiceFactory.logout();
		 // reset all user info
		 vm.user = {};
		 $location.path('/login');
		 };
		
		
		
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
	}; 
})();