angular.module('LoginModule')

.controller('LoginController', ['$scope', 'AccesosService', 'ionicToast', function($scope, AccesosService, ionicToast){
	$scope.usuario = {};

	$scope.$on('$ionicView.loaded', function(){

	});

	$scope.validarForm = function(usuario){
		var validado = false;
		ionicToast.show('This is a toast at the top.', 'top', false, 2500);
		if (typeof $scope.usuario.usuario === 'undefined'){
			$("#txtUsuario").parent().addClass("input-text-error");
			$("#txtUsuario").addClass('input-text-error-placeholder');
			$("#txtUsuario").val("");
           $("#txtUsuario").attr("placeholder", "Ingrese su usuario");
			validado = false;
		}else{
			$("#txtUsuario").parent().removeClass("input-text-error");
			$("#txtUsuario").removeClass('input-text-error-placeholder');
			validado = true;
		}

		if (typeof $scope.usuario.contrasenia === 'undefined'){
			$("#txtContrasenia").parent().addClass("input-text-error");
			$("#txtContrasenia").addClass('input-text-error-placeholder');
			$("#txtContrasenia").val("");
           $("#txtContrasenia").attr("placeholder", "Ingrese su contraseña");
			validado = false;
		}else{
			$("#txtContrasenia").parent().removeClass("input-text-error");
			$("#txtContrasenia").removeClass('input-text-error-placeholder');
			validado = true;
		}

		return validado;
	}

	$scope.validarUsuario = function(usuario){
		AccesosService.validarUsuario(usuario).then(function(rpta){
			console.log(rpta);
			ionicToast.show('This is a toast at the top.', 'top', true, 2500);
			//console.log("ENTRO AL PROMISE EN EL CONTROLADOR");
		});

		return true;
	}
}]);