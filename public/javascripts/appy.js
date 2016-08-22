// content controller
var app_con = function($scope) {
    $scope.hw_mod = "Hail Friggin Mary"
}




angular
    .module('appy',[])
    .controller('appy_con', app_con)
    .controller('appy_menu', app_menu)
    .filter('capitalize', caps)
    .directive('menuComp', menu_dir)
    .service('pages_ser' , get_pages);


