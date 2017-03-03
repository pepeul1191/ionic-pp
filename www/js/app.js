angular.module('starter', ['ionic', 'LoginModule'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        //templateUrl: 'js/app/menu/menu.html',
        templateUrl: 'templates/layouts/app.html',
    })

    .state('registro', {
        url: '/registro',
        abstract: false,
        templateUrl: 'js/app/registro/registro.html',
    })

      .state('contrasenia', {
        url: '/contrasenia',
        abstract: false,
        templateUrl: 'js/app/contrasenia/contrasenia.html',
    })

    .state('app.about', {
        url: '/about',
        views: {
            'content': {
                templateUrl: 'js/app/main/about.html'
            }
        }
    })

  $urlRouterProvider.otherwise('/login/ingresar');
});
