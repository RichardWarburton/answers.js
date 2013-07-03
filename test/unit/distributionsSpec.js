'use strict';

describe('Distributions', function() {
    
    beforeEach(module('answers.distributions'));
    
    describe('histogram', function() {
        it('should return specified bins', inject(function(histogram) {
            var result = histogram([], 5);
            expect(result.length).toEqual(5);
        }));
        it('example works', inject(function(histogram) {
            var result = histogram([1,1,1,2,2,3], 3);
            expect(result).toEqual([[1,3], [2,2], [3,1]]);
        }));
    });

});

