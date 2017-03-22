var BASE_URL = 'http://localhost:8888/';

angular.module('starter', ['ionic', 'LoginModule', 'ngStorage'])

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

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state('app', {
        url: '/app',
        abstract: true,
        //templateUrl: 'js/app/menu/menu.html',
        templateUrl: 'templates/layouts/app.html',
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
