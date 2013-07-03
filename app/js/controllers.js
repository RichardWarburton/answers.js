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
                    $scope.values = generateDemo(distribution);
                }
            });
        }]);

