angular.module('app_orcadia')
    .directive('myTabs', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: ['$scope','$rootScope', function MyTabsController($scope, $rootScope) {
                var panes = $scope.panes = [];

                $scope.select = function(pane) {
                    $rootScope.$broadcast('tab', {tab : pane.title});
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
            restrict: 'E',
            templateUrl: 'html/time.html'
        }
    })
    .directive('funForm', function() {
        return {
            templateUrl: 'html/form.html'
        }
    })
    .directive('homer', function() {
        return {
            templateUrl: 'html/homer.html'
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
        self.person = { first: 'Sherman', middle: 'Peabody', last: 'Utamoh'};
        self.address = { street: 'Desmond', suburb: 'Hourve', city: 'Paris'};
    }

    self.clear = function() {
        self.person = angular.copy({});
        self.address = angular.copy({});
    }

    self.submit = function() {
        console.log('User clicked submit with ', self.person , self.address);
    };
}

//  HOMER

angular.module('app_orcadia')
    .directive('homerific', ['$interval','$timeout', function($interval, $timeout){

        function link(scope, element, attrs) {
            var end,
                running = false;

            scope.$on('tab', function(event, args) {
                if(args['tab'] == 'Homer') {
                    $timeout(function () {
                        if(!running) {
                            running = true;
                            next(500);
                        }
                    })
                }
            });

            scope.$watch(attrs.theText, function (newVal) {
                if (newVal) {
                    anime(newVal);
                }
            });

            scope.$watch(attrs.theSpeaker, function (newVal) {
                scope.they = newVal;
            });

            function next(time) {
                return $timeout(function (time) {
                    scope.fade = false;
                    end = scope.$apply(attrs.nextLine);
                }, time)
            }

            function anime(text) {
                scope.saying = '';
                text = text.split('');
                var animation = $interval(function () {
                    if (text[0] === undefined) {
                        $interval.cancel(animation);
                        scope.fade = true;
                        if(!end) next(1800);
                        else running = false;
                        return;
                    }
                    scope.saying += text[0];
                    text.shift();
                }, 50);
            }
        }
        return {
            link: link,
        };
    }])
    .controller('homer', [function() {
        vm = this;
        var lines = [];

        function load() {
            lines.push(["Dr. Hibbert explains the consequences of eating tainted fugu.", '']);
            lines.push(["Well, if there's one consolation, it's that you will feel no pain at all until some time tomorrow evening, when your heart suddenly explodes.", 'Dr. Hibbert']);
            lines.push(["Now, a little death anxiety is normal.  You can expect to go through five stages.  The first is denial.", 'Dr. Hibbert']);
            lines.push(["No way!  Because I'm not dying! [hugs Marge]", 'Homer']);
            lines.push(["The second is anger.", 'Dr. Hibbert']);
            lines.push(["Why you little! [steps towards Dr. H]", 'Homer']);
            lines.push(["After that comes fear.", 'Dr. Hibbert']);
            lines.push(["What's after fear?  What's after fear? [cringes]", 'Homer']);
            lines.push(["Bargaining.", 'Dr. Hibbert']);
            lines.push(["Doc, you gotta get me out of this!  I'll make it worth your while!", 'Homer']);
            lines.push(["Finally, acceptance.", 'Dr. Hibbert']);
            lines.push(["Well, we all gotta go sometime.", 'Homer']);
            lines.push(["Mr. Simpson, your progress astounds me.", 'Dr. Hibbert']);
            lines.push(["He leaves Homer a pamphlet, 'So You're Going to Die.'", '']);
        }

        vm.newLine = function () {
            if(lines.length === 0) load();
            var line  =  lines.shift();
            vm.text = line[0];
            vm.speaker = line[1];
            return !lines.length;
        }
    }])




















