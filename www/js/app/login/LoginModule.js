angular.module('LoginModule', ['AccesosModule', 'ionic-toast'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('login', {
        url: '/login',
        abstract: true,
        templateUrl: 'templates/layouts/login.html',
    })

    .state('login.ingresar', {
        url: '/ingresar',
        views: {
            'content': {
                templateUrl: 'templates/login/ingreso.html',
                controller: 'LoginController'
            }
        },
    })

     .state('login.registro', {
        url: '/registro',
        //abstract: false,
        //templateUrl: 'js/app/registro/registro.html',
        views: {
            'content': {
                templateUrl: 'templates/login/registro.html',
                //controller: 'LoginController'
            }
        },
    })

      .state('login.contrasenia', {
        url: '/contrasenia',
        //abstract: false,
        //templateUrl: 'js/app/contrasenia/contrasenia.html',
        views: {
            'content': {
                templateUrl: 'templates/login/contrasenia.html',
                //controller: 'LoginController'
            }
        },
    })

});
