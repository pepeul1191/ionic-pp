angular.module('LoginModule')

.controller('RegistroController', ['$scope', 'AccesosService', 'ionicToast', '$state', '$ionicPopup', '$timeout', function($scope, AccesosService, ionicToast, $state, $ionicPopup, $timeout){
	$scope.usuario = {};

	$scope.$on('$ionicView.loaded', function(){

	});

	$scope.validarForm = function(usuario){
		var validado = false;
		var correo_lleno = false;

		if (typeof $scope.usuario.nombre_completo === 'undefined'){
			$("#txtNombreCompleto").parent().addClass("input-text-error");
			$("#txtNombreCompleto").addClass('input-text-error-placeholder');
			$("#txtNombreCompleto").val("");
           $("#txtNombreCompleto").attr("placeholder", "Ingrese su nombre");
			validado = false;
		}else{
			$("#txtNombreCompleto").parent().removeClass("input-text-error");
			$("#txtNombreCompleto").removeClass('input-text-error-placeholder');
			validado = true;
		}

		if (typeof $scope.usuario.correo === 'undefined'){
			$("#txtCorreo").parent().addClass("input-text-error");
			$("#txtCorreo").addClass('input-text-error-placeholder');
			$("#txtCorreo").val("");
           $("#txtCorreo").attr("placeholder", "Ingrese su correo");
			correo_lleno = false;
			validado = false;
		}else{
			$("#txtCorreo").parent().removeClass("input-text-error");
			$("#txtCorreo").removeClass('input-text-error-placeholder');
			validado = true;
			correo_lleno = true;
		}

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

		if (typeof $scope.usuario.contrasenia_repetida === 'undefined'){
			$("#txtContraseniaRepetida").parent().addClass("input-text-error");
			$("#txtContraseniaRepetida").addClass('input-text-error-placeholder');
			$("#txtContraseniaRepetida").val("");
           $("#txtContraseniaRepetida").attr("placeholder", "Ingrese su contraseña");
			validado = false;
		}else{
			$("#txtContraseniaRepetida").parent().removeClass("input-text-error");
			$("#txtContraseniaRepetida").removeClass('input-text-error-placeholder');
			validado = true;
		}

		if(validado == false){
			ionicToast.show('Ambos campos son obligatorios.', 'top', false, 2500);
		}

		if(validado == true){
			if($("#txtContrasenia").val() != $("#txtContraseniaRepetida").val()){
				ionicToast.show('Ambos las contraseñas no coinciden', 'top', false, 2500);
				$("#txtContrasenia").parent().addClass("input-text-error");
				$("#txtContraseniaRepetida").parent().addClass("input-text-error");
				validado = false;		
			}
		}

		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (correo_lleno){
		    if (re.test($scope.usuario.correo)){
		    	$("#txtCorreo").removeClass("input-text-error");
		       $("#txtCorreo").parent().removeClass("input-text-error");
				$("#txtCorreo").removeClass('input-text-error-placeholder');
				validado = true;
		    }else{
		       $("#txtCorreo").parent().addClass("input-text-error");
				$("#txtCorreo").addClass('input-text-error-placeholder');
				$("#txtCorreo").val("");
		    	$("#txtCorreo").attr("placeholder", "Ingrese un dirección de correo válida");
		       	validado = false;
		    }
		 }

		return validado;
	}

	$scope.validarCorreoRepetido= function(correo){
		AccesosService.validarCorreoRepetido(correo).then(function(rpta){
			if(rpta == 0){
				alert("=)");
			}else{
				$("#txtCorreo").parent().addClass("input-text-error");
				$("#txtCorreo").addClass('input-text-error-placeholder');
				$("#txtCorreo").val("");
		    	$("#txtCorreo").attr("placeholder", "El correo en uso ya está en uso");
				
				ionicToast.show('El correo ingresado ya está en uso', 'top', false, 3000);
			}
		});
	}

	$scope.validarUsuarioRepetido= function(usuario){
		AccesosService.validarUsuarioRepetido(usuario).then(function(rpta){
			if(rpta == 0){
				$("#txtUsuario").removeClass("input-text-error");
		       $("#txtUsuario").parent().removeClass("input-text-error");
				$("#txtUsuario").removeClass('input-text-error-placeholder');
			}else{
				$("#txtUsuario").parent().addClass("input-text-error");
				$("#txtUsuario").addClass('input-text-error-placeholder');
				$("#txtUsuario").val("");
		    	$("#txtUsuario").attr("placeholder", "El nombre de usuario ya está en uso");
				
				ionicToast.show('El nombre de usuario ya está en uso', 'top', false, 3000);
			}
		});
	}

	$scope.validarUsuario = function(usuario){
		AccesosService.validarUsuario(usuario).then(function(rpta){
			if(rpta == 1){
				console.log($state);
				$state.go('app.about');
			}else{
				$("#txtUsuario").parent().addClass("input-text-error");
				$("#txtContrasenia").parent().addClass("input-text-error");
				ionicToast.show('Usuario y/o contraseña no válidos.', 'top', false, 3000);
			}
		});

		return true;
	}

	$scope.showPopup = function() {
		  $scope.data = {};

		  // An elaborate, custom popup
		  var myPopup = $ionicPopup.show({
		    template: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, ',
		    title: 'Enter Wi-Fi Password',
		    subTitle: 'Please use normal things',
		    scope: $scope,
		    buttons: [
		      { text: 'Cancel' },
		      {
		        text: '<b>Save</b>',
		        type: 'button-positive',
		        onTap: function(e) {
		          if (!$scope.data.wifi) {
		            //don't allow the user to close unless he enters wifi password
		            e.preventDefault();
		          } else {
		            return $scope.data.wifi;
		          }
		        }
		      }
		    ]
		  });

		  myPopup.then(function(res) {
		    console.log('Tapped!', res);
		  });

		  $timeout(function() {
		     myPopup.close(); //close the popup after 3 seconds for some reason
		  }, 3000);
	};
}]);