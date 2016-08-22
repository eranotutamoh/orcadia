angular.module('app_orcadia', ['ngRoute', 'ngSanitize']);

function config ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/orcadia'
        })
        .when('/orcadia', {
            templateUrl: 'home/homescreen.view.html'
        })
        .when('/login', {
            templateUrl: 'home/login.view.html',
            controller: 'appy_login',
            controllerAs: 'vm'
        })
        .when('/video', {
            templateUrl: 'home/videos.view.html',
            controller: 'appy_video',
            controllerAs: 'vm'
        })
        .when('/:pageID', {
            templateUrl: 'home/home.view.html',
            controller: 'appy_home',
            controllerAs: 'vm'
        })

        .otherwise({redirectTo: '/home'});

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}

/// menu controller
var app_menu = function($rootScope, $scope, pages_ser, authentication) {
    $rootScope.message = 'Looking up content.'
    pages_ser
        .success(function(data) {
            $scope.pages =  data  ;
            $rootScope.message = data.length > 0 ? "" : "No content found";
        })
        .error(function (e) {
            $rootScope.message = "Sorry, something's gone wrong.";
            console.log(e);
        });

    $scope.secure =  authentication.isLoggedIn();
};

//menu directive
var menu_dir = function () {
    return {
        restrict: 'E',
        scope: {
            thePages: '=',
            showSecure: '='
        },
        templateUrl: 'html/menu.html'
    };
};


angular
    .module('app_orcadia')
    .config(['$routeProvider','$locationProvider', config])
    .controller('appy_menu', app_menu)
    .directive('orcMenu', menu_dir)
