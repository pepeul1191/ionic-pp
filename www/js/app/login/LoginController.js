angular.module('LoginModule')

.controller('LoginController', ['$scope', 'AccesosService', 'ionicToast', '$state', '$localStorage',function($scope, AccesosService, ionicToast, $state, localStorage){
	$scope.usuario = {};

	$scope.$on('$ionicView.loaded', function(){
		//AccesosService.obtenerSessionLogeado().then(function(rpta){
			//console.log(rpta);
		//})
	});

	$scope.validarForm = function(usuario){
		var validado = true;
		var usuario_valido = new Validacion($scope.usuario.usuario, $("#txtUsuario"), "Ingrese su usuario"); usuario_valido.ValidarTextLleno();
		var contrasenia_valido = new Validacion($scope.usuario.contrasenia, $("#txtContrasenia"), "Ingrese su contraseña"); contrasenia_valido.ValidarTextLleno();

		var validaciones = [usuario_valido.rpta, contrasenia_valido.rpta];
		//console.log(validaciones);
		if(_.contains(validaciones, false)){
        	ionicToast.show('Ambos campos son obligatorios.', 'top', false, 2500);
        	validado = false;
       }
      	
      	return validado;

	}

	$scope.validarUsuario = function(usuario, $localStorage){
		AccesosService.validarUsuario(usuario).then(function(rpta){
			//console.log(rpta)
			if(rpta['existe'] == 1){
				localStorage.usuario = usuario['usuario'];
				localStorage.token = rpta['token'];
				$state.go('app.about');
				//console.log($localStorage);
			}else{
				$("#txtUsuario").parent().addClass("input-text-error");
				$("#txtContrasenia").parent().addClass("input-text-error");
				ionicToast.show('Usuario y/o contraseña no válidos.', 'top', false, 3000);
			}
		});

		return true;
	}
}]);