'use strict';

describe('Clustering', function() {
    
    beforeEach(module('answers.clustering'));
    
    describe('distance', function() {
        it('from a point to itself is 0', inject(function(distance) {
            var result = distance([1,2],[1,2]);
            expect(result).toEqual(0);
        }));
        it('scales', inject(function(distance) {
            var result = distance([4,2],[2,4]);
            expect(result).toEqual(2);
        }));
    });

});

