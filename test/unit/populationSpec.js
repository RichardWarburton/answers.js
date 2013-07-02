'use strict';

describe('Population of [1,2,3]', function() {
    
    var population;

    beforeEach(module('answers.population'));
    
    beforeEach(inject(function(Population) {
        population = new Population([1,2,3]);
    }));

    describe('sum', function() {
        it('should return 6', inject(function() {
            expect(population.sum()).toEqual(6);
        }));
    });

    describe('mean', function() {
        it('should return 2', inject(function() {
            expect(population.mean()).toEqual(2);
        }));
    });
    
    describe('isPopulation', function() {
        it('yup', inject(function() {
            expect(population.isPopulation()).toEqual(true);
        }));

        it('strings not so much', inject(function(Population) {
            var stringly = new Population(['a', 2, 3]);
            expect(stringly.isPopulation()).toEqual(false);
        }));
    });

});

