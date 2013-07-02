'use strict';

angular
    .module('answers', [])
    .factory('Population', function() {
        return function() {
            this.data = [];
            this.mean = function() {
                var sum = _.reduce(this.data, function(acc, val) {
                    return acc + val;
                }, 0);
                return sum / this.data.length;
            };
        };
    });

