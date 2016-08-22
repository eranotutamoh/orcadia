angular
    .module('app_orcadia')
    .service('page_ser' , get_page);


function get_page($http) {

    var pageByID = function(pageID) {
        return $http.get('api/page/'+pageID);
    }

    return { pageByID : pageByID };
}