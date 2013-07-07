'use strict';

angular
    .module('answers.clustering', [])
    .factory('Vector', function() {
        function sum(data) {
            return _.reduce(data, function(acc, val) {
                return acc + val;
            }, 0);
        }
        function plus(left, right) {
            return new Vector(_.zip(left.data, right.data)
                               .map(function(x) {
                                   return x[0] + x[1];
                               }));
        };

        var Vector = function(data) {
            this.data = data || [];
            this.equals = function(other) {
                if (this.data.length !== other.data.length)
                    return false;

                return _.zip(this.data, other.data)
                        .map(function(x) {
                            return x[0] === x[1];
                        })
                        .reduce(function(acc, val) {
                            return acc && val;
                        });
            };
            this.divScalar = function(scale) {
                return new Vector(_.map(this.data, function(x) {
                    return x / scale;
                }));
            }
        };

        Vector.distance = function(p, q) {
            var sums = sum(_.zip(p.data,q.data)
                            .map(function(x) {
                                return Math.pow(x[0] - x[1], 2);
                            }));

            return Math.sqrt(sums);
        };

        Vector.mean = function(vectors) {
            var count = vectors.length;
            var n = vectors[0].data.length;
            var initial = new Vector(new Array(n));
            _.times(n, function(x) { initial.data[x] = 0; });
            var tally = _.reduce(vectors, plus, initial);
            return tally.divScalar(count);
        };

        // between two lists of vectors
        // TODO: check this is still needed/useful
        Vector.difference = function(left, right) {
            return _.filter(left, function(value) {
                return !_.reduce(right, function(acc, inner) {
                    return acc || value.equals(inner);
                }, false);
            });
        };

        // Wire up arrays
        Array.prototype.equals = function(other) {
            if (this.length !== other.length)
                return false;

            return _.zip(this, other)
                    .reduce(function(acc, x) {
                        var left = x[0], right = x[1];
                        return acc && (left === right)
                                   || (left !== undefined
                                   && right !== undefined
                                   && left.equals(right));
                    }, true);
        };

        return Vector;
    })
    .factory('kmeans', ['Vector', function(Vector) {
        function pickCentroids(k, input) {
            var indexes = [];
            while (indexes.length !== k) {
                var index = _.random(0, input.length - 1);
                if (!_.contains(indexes, index))
                    indexes.push(index);
            }
            return _.map(indexes, function(index) { return input[index]; });
        }
        return function(k, input) {
            var centroids = [], newCentroids = pickCentroids(k, input);
            var partitions;
            do {
                centroids = newCentroids;
                console.log(newCentroids);
                // Assign
                partitions = [];
                _.each(input, function(element) {
                    var minIndex = _.reduce(centroids, function(acc, centroid, index) {
                        var dist = Vector.distance(centroid, element);
                        return (dist < acc[0]) ? [dist, index] : acc;
                    }, [-1, -1])[1];

                    partitions[minIndex] = element;
                });
                console.log("ass", partitions);

                // Update
                newCentroids = _.map(partitions, Vector.mean);
                console.log("update");
            } while (!centroids.equals(newCentroids));

            console.log("final");

            return _.values(partitions);
        };
    }])
    ;

