angular
    .module('app_orcadia')
    .service('pages_ser' , get_pages);


function get_pages($http) {
    return $http.get('api/pages');
}