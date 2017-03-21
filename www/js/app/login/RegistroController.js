angular.module('LoginModule')

.controller('RegistroController', ['$scope', 'AccesosService', 'ionicToast', '$state', '$ionicPopup', '$timeout', function($scope, AccesosService, ionicToast, $state, $ionicPopup, $timeout){
	$scope.usuario = {};

	$scope.$on('$ionicView.loaded', function(){

	});

	$scope.validarForm = function(usuario){
		var validado = false;
		//var correo_lleno = false;

		var nombre_completo_valido = new Validacion($scope.usuario.nombre_completo, $("#txtRegistroNombreCompleto"), "Ingrese su nombre"); nombre_completo_valido.ValidarTextLleno();

		var correo_valido = new Validacion($scope.usuario.correo, $("#txtRegistroCorreo"), "Ingrese su correo"); correo_valido.ValidarTextLleno();
		
		if(correo_valido.rpta == true){
			var correo_formato_valido = new Validacion($scope.usuario.correo, $("#txtRegistroCorreo"), "Ingrese un dirección de correo válida"); correo_formato_valido.ValidarCorreo();
			if(correo_formato_valido.rpta == false){
				correo_valido.rpta = false
			}	
		}

		var usuario_valido = new Validacion($scope.usuario.usuario, $("#txtRegistroUsuario"), "Ingrese su usuario"); usuario_valido.ValidarTextLleno();

		var contrasenia_valido = new Validacion($scope.usuario.contrasenia, $("#txtRegistroContrasenia"), "Ingrese su contraseña"); contrasenia_valido.ValidarTextLleno();

		var contrasenia_repetida_valido = new Validacion($scope.usuario.contrasenia_repetida, $("#txtRegistroContraseniaRepetida"), "Ingrese su contraseña"); contrasenia_repetida_valido.ValidarTextLleno();


		var validaciones = [nombre_completo_valido.rpta, correo_valido.rpta, usuario_valido.rpta, contrasenia_valido.rpta, contrasenia_repetida_valido.rpta];
		//console.log(validaciones);
		if(_.contains(validaciones, false)){
        	ionicToast.show('Llene los campos obligatorios', 'top', false, 2500);
        	validado = false;
       }

		if(contrasenia_valido.rpta && contrasenia_repetida_valido.rpta){
			if($("#txtRegistroContrasenia").val() != $("#txtRegistroContraseniaRepetida").val()){
				ionicToast.show('Las contraseñas no coinciden', 'top', false, 2500);
				$("#txtRegistroContrasenia").parent().addClass("input-text-error");
				$("#txtRegistroContraseniaRepetida").parent().addClass("input-text-error");
				validado = false;		
			}
		}

		//alert(validado);
		return validado;
	}

	$scope.validarCorreoRepetido= function(correo){
		AccesosService.validarCorreoRepetido(correo).then(function(rpta){
			if(rpta == 0){
				//alert("=)");
			}else{
				$("#txtRegistroCorreo").parent().addClass("input-text-error");
				$("#txtRegistroCorreo").addClass('input-text-error-placeholder');
				$("#txtRegistroCorreo").val("");
		    	$("#txtRegistroCorreo").attr("placeholder", "El correo en uso ya está en uso");
				
				ionicToast.show('El correo ingresado ya está en uso', 'top', false, 3000);
			}
		});
	}

	$scope.validarUsuarioRepetido= function(usuario){
		AccesosService.validarUsuarioRepetido(usuario).then(function(rpta){
			//alert(rpta);
			if(rpta == 0){
				$("#txtRegistroUsuario").removeClass("input-text-error");
		       $("#txtRegistroUsuario").parent().removeClass("input-text-error");
				$("#txtRegistroUsuario").removeClass('input-text-error-placeholder');
			}else{
				$("#txtRegistroUsuario").parent().addClass("input-text-error");
				$("#txtRegistroUsuario").addClass('input-text-error-placeholder');
				$("#txtRegistroUsuario").val("");
		    	$("#txtRegistroUsuario").attr("placeholder", "El nombre de usuario ya está en uso");
				
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
				$("#txtRegistroUsuario").parent().addClass("input-text-error");
				$("#txtRegistroContrasenia").parent().addClass("input-text-error");
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