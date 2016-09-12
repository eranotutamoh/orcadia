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
        .when('/examples', {
            templateUrl: 'home/examples.view.html'
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
var app_menu = function(pages_ser, authentication) {

    var menu_scope = this;
    menu_scope.error = false;
    var askForPromise = pages_ser.pages();

    askForPromise.then(
        // OnSuccess function
        function(answer) {
            menu_scope.pages = (typeof(answer.data) === 'object') ? answer.data : [];
            if(!menu_scope.pages.length > 0 ) {
                menu_scope.msg = 'No data returned.';
                menu_scope.error = true;
            }
        },
        // OnFailure function
        function(reason) {
            console.error(reason)
            menu_scope.error = true;
            menu_scope.msg = "Sorry, something's gone wrong.";
        }
    )

    menu_scope.secure =  authentication.isLoggedIn();
};

//menu directive
var menu_dir = function () {
    return {
        restrict: 'E',
        templateUrl: 'html/menu.html'
    };
};


angular
    .module('app_orcadia')
    .config(['$routeProvider','$locationProvider', config])
    .controller('appy_menu', app_menu)
    .directive('orcMenu', menu_dir)
