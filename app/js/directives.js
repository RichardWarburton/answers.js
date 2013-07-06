'use strict';

angular
    .module('answers.directives', [])
    .directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
          elm.text(version);
        };
    }])
    .factory('chart', function() {
        // Generic chart, to be customised by children
        return function(options) {
            options = options || {};
            // Can't be an element - flot/angular issue
            return {
                restrict: 'A',
                scope: {
                    data: '='
                },
                link: function(scope, element, attrs) {
                    var data = [{ data: scope.data }];
                    var plot = $.plot($(element), data, options);

                    scope.$watch('data', function(newValue) {
                        plot.setData([{
                            data: newValue
                        }]);
                        plot.setupGrid();
                        plot.draw();
                    });
                }
            }
        };
    }).directive('lineChart', ['chart', function(chart) {
        return chart();
    }]).directive('barChart', ['chart', function(chart) {
        return chart({
            series: {
                bars: {
                    show: true,
                    align: "center",
                    barWidth: 0.75,
                }
            }
        });
    }]);

