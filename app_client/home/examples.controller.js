angular.module('app_orcadia')
    .directive('myTabs', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: ['$scope', function MyTabsController($scope) {
                var panes = $scope.panes = [];

                $scope.select = function(pane) {
                    angular.forEach(panes, function(pane) {
                        pane.selected = false;
                    });
                    pane.selected = true;
                };

                this.addPane = function(pane) {
                    if (panes.length === 0) {
                        $scope.select(pane);
                    }
                    panes.push(pane);
                };
            }],
            templateUrl: 'html/tab.html'
        };
    })
    .directive('myPane', function() {
        return {
            require: '^^myTabs',
            restrict: 'E',
            transclude: true,
            scope: {
                title: '@'
            },
            link: function(scope, element, attrs, tabsCtrl) {
                tabsCtrl.addPane(scope);
            },
            templateUrl: 'html/pane.html'
        };
    })
    .directive('time', function() {
        return {
            //replace: true,
            templateUrl: 'html/time.html'
        }
    })
    .directive('funForm', function() {
        return {
            templateUrl: 'html/form.html'
        }
    });

// TIME
angular.module('app_orcadia')
    .controller('time', ['$scope', function($scope) {
        $scope.format = 'M/d/yy h:mm:ss a';
    }])
    .directive('myCurrentTime', ['$interval', 'dateFilter', function($interval, dateFilter) {

        function link(scope, element, attrs) {
            var format,
                timeoutId;

            function updateTime() {
                element.text(dateFilter(new Date(), format));
            }

            scope.$watch(attrs.myCurrentTime, function(value) {
                format = value;
                updateTime();
            });

            element.on('$destroy', function() {
                $interval.cancel(timeoutId);
            });

            // start the UI update process; save the timeoutId for canceling
            timeoutId = $interval(function() {
                updateTime(); // update DOM
            }, 1000);
        }

        return {
            link: link
        };
    }]);


// FORM
angular.module('app_orcadia')
    .controller('model', [model]);

function model() {
    var self = this;

    self.fill = function() {
        self.person = { first: 'Wallaces', middle: 'Peabody', last: 'Utamoh'};
        self.address = { street: 'Desmond', suburb: 'Hourve', city: 'Paris'};
    }

    self.clear = function() {
        self.person = {};
        self.address = {};
    }

    self.submit = function() {
        console.log('User clicked submit with ', self.person , self.address);
    };
}