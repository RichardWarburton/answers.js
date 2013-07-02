'use strict';

angular
    .module('answers', [])
    .factory('Population', function() {
        return function(mbData) {
            
            this.data = mbData || [];

            this.sum = function() {
                return _.reduce(this.data, function(acc, val) {
                    return acc + val;
                }, 0);
            };

            this.mean = function() {
                return this.sum() / this.data.length;
            };

            this.isPopulation = function() {
                return _.every(this.data, _.isNumber);
            };

        };
    });

