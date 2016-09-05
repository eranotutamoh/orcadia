angular
    .module('app_orcadia')
    .service('page_ser' , get_page);


function get_page($http, $q) {

        myMethods = {
            pageByID: function(pageID) {

                var promise =  $http.get('api/page/'+pageID);
                var iou  =  $q.defer();
                promise.then(
                    // OnSuccess function
                    function(answer){
                        // This code will only run if we have a successful promise.
                        iou.resolve(answer);
                    },
                    // OnFailure function
                    function(reason){
                        // This code will only run if we have a failed promise.
                        iou.reject(reason);
                    }
                );

                return iou.promise;
            }
        }

    return myMethods;
}