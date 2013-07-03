'use strict';


/**
 * All distributions have a:
 * name
 * link - to a description
 * parameters
 * pdf - the probability density function
 */
angular
    .module('answers.distributions', [])
    .value('normalDistribution', {
        name: 'Normal',
        link: 'https://en.wikipedia.org/wiki/Normal_distribution',
        parameters: ['Mean', 'Standard Deviation'],
        pdf: function(mean, stddev) {
            var denom = Math.sqrt(2.0 * Math.PI);
            return function(x) {
                var rhsNum = Math.pow(x - mean, 2);
                var rhsDenom = 2 * Math.pow(stddev, 2);
                var rhs = Math.exp(-1 * ( rhsNum / rhsDenom));
                return (1 / (stddev * denom)) * rhs;
            };
        },
        demo: {
            parameters: [0, Math.sqrt(0.5)],
            range: [-5, 5]
        }
    }).factory('distributions',
        ['normalDistribution', function(normalDistribution) {
            return [normalDistribution];
        }]
    ).factory('generate', function() {
        return function(pdf, start, stop, step) {
            var xs = _.range(start, stop, step);
            var ys = _.map(xs, pdf);
            return _.zip(xs, ys);
        };
    }).factory('generateDemo', ['generate', function(generate) {
        var STEP = 0.1;
        return function(distribution) {
            var parameters = distribution.demo.parameters;
            var pdf = distribution.pdf.apply(this, parameters);
            var range = distribution.demo.range;
            return generate(pdf, range[0], range[1], STEP);
        };
    }]);

