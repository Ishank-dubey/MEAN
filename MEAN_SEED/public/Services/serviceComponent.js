(function(){
	'use strict'
	angular.module('serviceModule').factory("serviceComponent",serviceFunction);
	serviceFunction.$inject = ['$http'];
	function serviceFunction($http){
	    var serviceFac = {};
	    
	    serviceFac.getUser = function(id){
	    	return $http.get('/api/users');
	    };
	    
	    serviceFac.createUser = function(userData){
	    	return $http.post('/api/users', userData);
	    };
	    
	    serviceFac.updateUser = function(id, userData){
	    	return $http.put('/api/users/'+id, userData);
	    };
	    
	    serviceFac.deleteUser = function(id){
	    	return $http.delete('/api/users/'+id);
	    };
	    
	    serviceFac.all = function(){
		return $http.get('/admin/users');
		};
		
	    return serviceFac;
	}
})();