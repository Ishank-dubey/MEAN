(function(){
	'use strict'
	var app = angular.module('MEAN',['ngRoute', 'home', 'login','authServiceModule','serviceModule']);
	
	
	app.controller('mainCtrl',mainFunction);
	mainFunction.$inject = ['$rootScope','authServiceFactory','serviceComponent','$http', '$location'];
	function mainFunction($rootScope, authServiceFactory, serviceComponent, $http, $location){
		var vm =  this;
		vm.loggedIn = authServiceFactory.isLoggedIn();		
		
		
		 $rootScope.$on('$routeChangeStart', function() {
		 vm.loggedIn = authServiceFactory.isLoggedIn();
		
		 
		 if(vm.loggedIn){
			 $http.defaults.headers.common['x-access-token'] 
			 = authServiceFactory.getToken();
		 }
		 
		 authServiceFactory.getUser().then(function(data) {
		 vm.username = data.data.username;
		 
		 								},function(reason){
		 
		 });
		 });
		
		 
		 vm.doLogin = function() {
		
		 
			 authServiceFactory.login(vm.loginData.username, vm.loginData.password)
		 .success(function(data) {
		
		 
		 $location.path('/users');
		 });
		 };
		
		 
		 vm.doLogout = function() {
			 authServiceFactory.logout();
		 
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