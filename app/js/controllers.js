'use strict';

angular
    .module('answers.controllers', ['answers.population', 'answers.distributions'])
    .controller('BasicsController',
        ['$scope', '$parse', 'Population', 
        function($scope, $parse, Population) {
            $scope.cell = "";
            $scope.compute = function(field) {
                var data = $parse($scope.cell)($scope);
                if (!data)
                    return "Feed me more";

                var population = new Population(data);
                return population[field]();
            };
        }])
    .controller('DistributionsController',
        ['$scope', 'distributions', 'generateDemo',
        function($scope, distributions, generateDemo) {
            $scope.distributions = distributions;
            $scope.distribution = distributions[0];
            $scope.cell = "";
            
            $scope.$watch('distribution', function(distribution) {
                if (distribution) {
                    $scope.demo = distribution.demo;
                    
                    var update = function() {
                        var parameters = $scope.demo.parameters;
                        var start = parseInt($scope.demo.start);
                        var stop = parseInt($scope.demo.stop);
                        if (_.isNaN(start) || _.isNaN(stop))
                            return;

                        $scope.values = generateDemo(distribution, parameters, start, stop);
                    }

                    for (var i in $scope.demo.parameters) {
                        $scope.$watch('demo.parameters['+i+']', update);
                    }
                    $scope.$watch('demo.start', update);
                    $scope.$watch('demo.stop', update);
                }
            });
        }]);

