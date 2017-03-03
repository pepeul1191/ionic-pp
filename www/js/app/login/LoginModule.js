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

});
