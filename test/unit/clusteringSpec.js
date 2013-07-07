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

    });

});

