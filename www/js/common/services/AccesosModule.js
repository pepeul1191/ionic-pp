angular.module('AccesosModule', [])

//.constant('urlAccesos', 'http://localhost:8888/')

.factory('AccesosService', function($http, $q){ //, urlAccesos){
	var accesosService = {};
	var rptaService = {};
	
	accesosService.validarUsuario = function(usuario){
		var deferred = $q.defer();
		$http.defaults.headers.post["Content-Type"] = "text/plain";
		$http.post(BASE_URL + 'login?usuario=' + usuario.usuario + '&contrasenia=' + usuario.contrasenia , {}).then(
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

	accesosService.validarCorreoRepetido = function(correo){
		var deferred = $q.defer();
		$http.defaults.headers.post["Content-Type"] = "text/plain";
		$http.post(BASE_URL + 'usuario/validar_correo_repetido?correo=' + correo , {}).then(
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

	accesosService.validarUsuarioRepetido = function(usuario){
		var deferred = $q.defer();
		$http.defaults.headers.post["Content-Type"] = "text/plain";
		$http.post(BASE_URL + 'usuario/validar_usuario_repetido?usuario=' + usuario , {}).then(
			function(response){
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