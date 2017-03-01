angular.module('AccesosModule', [])

.constant('urlAccesos', 'http://127.0.0.1:5001/')

.factory('AccesosService', function($http, $q, urlAccesos){
	var accesosService = {};
	var rptaService = {};
	
	accesosService.validarUsuario = function(usuario){
		var deferred = $q.defer();
		
		$http.get(urlAccesos + 'item/listar_todos', {}).then(
			function(response){
				console.log(response);
				deferred.resolve(response.data);
			}, 
			function(error){
				console.log(error);
			}
		);

		return deferred.promise;
	};

	return accesosService;
});