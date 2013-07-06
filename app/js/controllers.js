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
        ['$scope', '$parse', 'distributions', 'generateDemo', 'genHisto',
        function($scope, $parse, distributions, generateDemo, genHisto) {
            $scope.distributions = distributions;
            $scope.distribution = distributions[0];
            $scope.cell = "";
            $scope.userData = [];

            var oldWatches = [];
            
            $scope.$watch('distribution', function(distribution) {
                if (!distribution)
                    return;

                // Unregister
                _.each(oldWatches, function(removeWatch) {
                    removeWatch();
                });
                oldWatches = [];

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
                    oldWatches.push($scope.$watch('demo.parameters['+i+']', update));
                }
                oldWatches.push($scope.$watch('demo.start', update));
                oldWatches.push($scope.$watch('demo.stop', update));
            });

            $scope.$watch('cell', function() {
                try {
                    var rawData = $parse($scope.cell)($scope);
                    $scope.userData = genHisto(rawData);
                } catch (e) {
                    // deliberately ignore parse exceptions
                }
            });
        }]);

