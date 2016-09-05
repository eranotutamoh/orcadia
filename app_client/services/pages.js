angular
    .module('app_orcadia')
    .service('pages_ser' , ['$http', '$q', get_pages]);


function get_pages($http, $q) {

var iou,
    myMethods = {
        pages: function() {
            var promise =  $http.get('api/pages', { cache: true }),
                iou  =  iou || $q.defer();
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