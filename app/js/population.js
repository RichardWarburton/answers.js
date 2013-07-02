'use strict';

angular
    .module('answers', [])
    .factory('population', function() {
        return function() {
            var population = {
                data: [],
                mean: function() {
                    return 0;
                },
            };

            return population;
        };
    });

