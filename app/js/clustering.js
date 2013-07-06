'use strict';

angular
    .module('answers.clustering')
    .factory('Vector', function() {
        function sum(data) {
            return _.reduce(data, function(acc, val) {
                return acc + val;
            }, 0);
        }
        function plus(left, right) {
            return new Vector(_.zip(left, right)
                               .map(function(x) {
                                   return x[0] + x[1];
                               }));
        };

        var Vector = function(data) {
            this.data = data || [];
            this.equals(other) = function() {
                return this.data === other.data;
            };
            this.divScalar = function(scale) {
                this.data = _.map(this.data, function(x) {
                    return x / scale;
                });
            }
        };

        Vector.distance = function(p, q) {
            var sums = sum(_.zip(p,q)
                            .map(function(x) {
                                return Math.pow(x[0] - y[1], 2);
                            }));

            return Math.sqrt(sums);
        };

        Vector.mean = function(vectors) {
            var count = vectors.length;
            var n = vectors[0].data.length;
            var tally = _.reduce(vectors, plus, new Vector(new Array(n)));
            return tally.divScalar(count);
        };

        return Vector;
    })
    .factory('kmeans', ['Vector', function(Vector) {
        function pickCentroids(k, input) {

        }
        return function(k, input) {
            var centroids = [], newCentroids = pickCentroids(k, input);
            var partitions;
            do {

                // Assign
                var others = _.difference(input, centroids);
                partitions = _.groupBy(others, function(element) {
                    return _.min(centroids, _.partial(Vector.distance, element));
                });
                // TODO: add key to value

                // Update
                newCentroids = _.map(_.values(partitions), Vector.mean);
            } while (centroids !== newCentroids);

            return partitions;
        };
    }])
    ;

