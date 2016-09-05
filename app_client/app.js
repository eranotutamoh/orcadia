angular.module('app_orcadia', ['ngRoute', 'ngSanitize']);

function config ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/landing'
        })
        .when('/landing', {
            template: '',
            controller: 'landing'
        })
        .when('/orcadia', {
            templateUrl: 'home/homescreen.view.html',
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

        .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}

/// menu controller
var app_menu = function($rootScope, $scope, pages_ser, authentication, $location) {
    $rootScope.message = '';

    $scope.success   = false;
    $scope.error       = false;

    var askForPromise = pages_ser.pages();

    askForPromise.then(
        // OnSuccess function
        function(answer) {
            $scope.pages = answer.data;
            $rootScope.message = answer.data.length > 0 ? "" : "No content found";
            $scope.success = true;
        },
        // OnFailure function
        function(reason) {
            $scope.somethingWrong = reason;
            $rootScope.message = "Sorry, something's gone wrong.";
            $scope.error = true;
        }
    )
    
    
    
    
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
