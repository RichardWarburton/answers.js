'use strict';

angular
    .module('answers.', [])
    .factory('population', function() {
        return function() {
            var population = {
                mean: function() {
                    return 0;
                },
                median: function() {
                    return 0;
                },
                mode: function() {
                    return 0;
                }
            };

            return population;
        };
    });

