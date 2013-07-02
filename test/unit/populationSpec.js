'use strict';

/* jasmine specs for services go here */

describe('Population', function() {
    beforeEach(module('answers'));

    describe('mean', function() {
        it('should return 2 for [1,2,3]', inject(function(Population) {
            var population = new Population();
            population.data = [1,2,3];
            expect(population.mean()).toEqual(2);
        }));
    });

});
