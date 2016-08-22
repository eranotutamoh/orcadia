(function () {
    angular
        .module('app_orcadia')
        .service('authentication', authentication);

    function authentication($window, $http) {

        var saveToken = function (token) {
            $window.localStorage['my-token'] = token;
        };
        var getToken = function () {
            return $window.localStorage['my-token'];
        };
        var login = function(user) {
            return $http.post('/api/login', user).success(function(data) {
                saveToken(data.token);
            });
        };
        var isLoggedIn = function() {
            var token = getToken();
            if(token){
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        return {
            saveToken: saveToken,
            getToken: getToken,
            login: login,
            isLoggedIn: isLoggedIn
        };
    }



})();