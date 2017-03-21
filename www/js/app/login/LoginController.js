angular.module('LoginModule')

.controller('LoginController', ['$scope', 'AccesosService', 'ionicToast', '$state', function($scope, AccesosService, ionicToast, $state){
	$scope.usuario = {};

	$scope.$on('$ionicView.loaded', function(){

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

	$scope.validarUsuario = function(usuario){
		AccesosService.validarUsuario(usuario).then(function(rpta){
			if(rpta == 1){
				//console.log($state);
				$state.go('app.about');
			}else{
				$("#txtUsuario").parent().addClass("input-text-error");
				$("#txtContrasenia").parent().addClass("input-text-error");
				ionicToast.show('Usuario y/o contraseña no válidos.', 'top', false, 3000);
			}
		});

		return true;
	}
}]);