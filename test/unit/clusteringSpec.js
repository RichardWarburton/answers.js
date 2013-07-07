'use strict';

describe('Clustering', function() {
    
    beforeEach(module('answers.clustering'));

    describe('Vector', function() {
        it('distance from a point to itself is 0', inject(function(Vector) {
            var vector = new Vector([1,2]);
            var result = Vector.distance(vector, vector);
            expect(result).toEqual(0);
        }));
        it('distance scales', inject(function(Vector) {
            var result = Vector.distance(new Vector([4,2]),new Vector([2,4]));
            expect(result).toEqual(2.8284271247461903);
        }));

        it('equals itself', inject(function(Vector) {
            var vector = new Vector([1,2]);
            console.log(vector.equals(new Vector([1,2])));
            expect(vector.equals(new Vector([1,2]))).toBe(true);
        }));
        it('doesnt equal something else', inject(function(Vector) {
            expect(new Vector([1,2]).equals(new Vector([1,3]))).toBe(false);
        }));
        
        it('calculates mean', inject(function(Vector) {
            var vectors = [
                new Vector([1,2]),
                new Vector([2,3]),
                new Vector([3,4]),
            ];
            expect(Vector.mean(vectors)).toNotEqual(new Vector([2,3]));
        }));
        
        it('is divisible by a scalar', inject(function(Vector) {
            var vector = new Vector([2,4]);
            expect(vector.divScalar(2).equals(new Vector([1,2]))).toBe(true);
        }));
        
        it('calculates difference', inject(function(Vector) {
            var left = [new Vector([1,2]), new Vector([2,4])];
            var right = [new Vector([1,2])];
            var result = Vector.difference(left, right);
            expect(result.length).toEqual(1);
            expect(result[0].equals(new Vector([2,4]))).toBe(true);
        }));
        
        it('wires Array.equals', inject(function(Vector) {
            var a1 = [new Vector([1,2]), new Vector([2,4])];
            var a2 = [new Vector([1,2])];
            var a3 = [new Vector([1,2])];
            expect(a1.equals(a2)).toBe(false);
            expect(a2.equals(a3)).toBe(true);
            expect(a1.equals(a3)).toBe(false);
        }));
    });

    describe('kmeans', function() {
        it('clusters a single point', inject(function(kmeans, Vector) {
            var input = [new Vector([1,2])];
            var result = kmeans(1, input);
            console.log(result);
            expect(result.equals(input)).toBe(true);
        }));
    });

});

