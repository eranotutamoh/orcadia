angular
    .module('app_orcadia')
    .controller('landing', homeScreenCtrl)
    .controller('appy_home', homeCtrl)
    .controller('appy_login', loginCtrl)
    .controller('appy_video', videoCtrl)
    .directive('orcContent', content_dir)
    .directive('orcVideo', video_dir)

function homeCtrl($rootScope, page_ser, $routeParams) {
    var vm = this;
    var pageID = $routeParams.pageID;
    vm.width = 'W: '+window.screen.width;
    vm.height = 'H: '+window.screen.height;
    $rootScope.message = ''
    page_ser.pageByID(pageID)
        .success(function (data) {
            vm.page = data;
            $rootScope.message = typeof(data) === 'object' ? "" : "No content found";

        })
        .error(function (e) {
            $rootScope.message = "Sorry, something's gone wrong.";
            console.log(e);
        });
};

function videoCtrl($location, authentication) {
    if(!authentication.isLoggedIn()) $location.path('/git');
    var vm = this;
    vm.source = 'HTML5Test';
    vm.changeSource = function(video) {
        vm.source = video;
    }


}

function homeScreenCtrl($location) {
    if (window.screen.width > 800) $location.path('/concepts');
    else $location.path('/orcadia');
}

function loginCtrl($location, authentication) {
    var vm = this;

    vm.credentials = {name: "", password: ""};

    vm.onSubmit = function () {
        vm.formError = "";
        if (!vm.credentials.name || !vm.credentials.password) {
            vm.formError = "All fields required, please try again";
            return false;
        } else {
            vm.doLogin();
        }
    };
    vm.doLogin = function () {
        vm.formError = "";
        authentication
            .login(vm.credentials).error(function (err) {
                vm.formError = err;
            })
            .then(function () {
                $location.path('/console');
            });
    };
}

//video directive
function video_dir() {
    return {
        restrict: 'E',
        templateUrl: 'html/videos.html'
    };
};

//content directive
function content_dir() {
    return {
        restrict: 'E',
        scope: {
            theContent: '='
        },
        templateUrl: 'html/content.html'
    };
};