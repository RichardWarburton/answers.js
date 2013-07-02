'use strict';

/* Controllers */

angular
    .module('answers.controllers', ['answers.population'])
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
        }]);

