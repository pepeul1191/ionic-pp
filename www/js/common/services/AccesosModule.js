angular.module('AccesosModule', [])

.constant('urlAccesos', 'http://localhost/servicio_test/')

.factory('AccesosService', function($http, $q, urlAccesos){
	var accesosService = {};
	var rptaService = {};
	
	accesosService.validarUsuario = function(usuario){
		var deferred = $q.defer();
		$http.defaults.headers.post["Content-Type"] = "text/plain";
		$http.post(urlAccesos + 'login/acceder?usuario=' + usuario.usuario + '&contrasenia=' + usuario.contrasenia , {}).then(
			function(response){
				//console.log(response);
				deferred.resolve(response.data);
			}, 
			function(error){
				//console.log(error);
			}
		);

		return deferred.promise;
	};

	return accesosService;
});