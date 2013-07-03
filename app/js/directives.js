'use strict';

angular
    .module('answers.directives', [])
    .directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
          elm.text(version);
        };
    }])
    .directive('lineChart',
        function() {
            // Can't be an element - flot/angular issue
            return {
                restrict: 'A',
                scope: {
                    data: '='
                },
                link: function(scope, element, attrs) {
                    var plot = $.plot($(element), [{
                        data: scope.data
                    }]);

                    scope.$watch('data', function(newValue) {
                        plot.setData([{
                            data: newValue
                        }]);
                        plot.setupGrid();
                        plot.draw();
                    });
                }
            };
        });

