/**
 * http://usejsdoc.org/
 */
(function(){
function authServiceFactory($http, $q, $window, $location){

		var authService = {};
		
		
		authService.getToken = function(){
			
			$window.localStorage.getItem('token');
		};

		authService.setToken = function(aToken){
			if(aToken){
				$window.localStorage.setItem('token',aToken);
			}else{
				$window.localStorage.removeItem('token');
			}
		};

		authService.login = function(aUsername, aPassword){
			return $http.post('/api/authenticate',{
				username: aUsername,
				password:aPassword
			}).success(function(data){
				authService.setToken(data.token);
				return data;
			});
		};	

	authService.logout = function(){
		authService.setToken();
	};

	authService.isLoggedIn = function(){
		if(authService.getToken())
			return true;
		else 
			return false;
	};

	authService.getUser = function(){
		if(authService.isLoggedIn()){
			return $http.get('/api/me');
		}else{
			return $q.reject({message: 'User has no token'});
		}
	}


	authService.request = function(config){
		if(authService.isLoggedIn()){
			config.headers['x-access-token'] = authService.getToken();
		}
		return config;
	}
	authService.responseError = function(response){
		if(response.status==403){
			$location.path('/login');
		}
		return $q.reject(response);
	};

	return authService; 

	};
angular.module('authServiceModule').factory('authServiceFactory', authServiceFactory);
authServiceFactory.$inject = ['$http','$q','$window','$location'];

})();