'use strict';

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
            start: -5,
            stop: 5
        }
    }).value('exponentialDistribution', {
        name: 'Exponential',
        link: 'http://en.wikipedia.org/wiki/Exponential_distribution',
        parameters: ['Lambda'],
        pdf: function(lambda) {
            return function(x) {
                return lambda * Math.exp(-1 * lambda * x);
            };
        },
        demo: {
            parameters: [1],
            start: 0,
            stop: 5
        }
    }).value('uniformDistribution', {
        name: 'Uniform',
        link: 'http://en.wikipedia.org/wiki/Uniform_distribution_%28continuous%29',
        parameters: [],
        pdf: function(start, stop) {
            var VALUE = 1 / (stop - start);
            return function(x) {
                return VALUE;
            };
        },
        demo: {
            parameters: [],
            start: 1,
            stop: 5
        }
    }).value('betaDistribution', {
        name: 'Beta',
        link: 'http://en.wikipedia.org/wiki/Beta_distribution',
        parameters: ['alpha', 'beta'],
        pdf: function(alpha, beta) {
            alpha = parseFloat(alpha);
            beta = parseFloat(beta);

            // Implementation of the Beta function
            // http://en.wikipedia.org/wiki/Beta_function
            function betaFunc(x,y) {
                var result = numeric.dopri(0.0, 1.0, 0.0, function(t) {
                                return Math.pow(t, x - 1.0) * Math.pow(1.0 - t, y - 1.0);
                            }).at(1);

                //  if integration fails resort to approximation
                if(_.isNaN(result)) {
                    // Stirlings approximation of beta function
                    // en.wikipedia.org/wiki/Beta_function#Approximation
                    var sqrt2pi = Math.sqrt(2.0 * Math.PI);
                    var numerator = Math.pow(x, x - 0.5) * Math.pow(y, y - 0.5);
                    var denom = Math.pow(x + y, x + y - 0.5);
                    result = sqrt2pi * numerator / denom;                    
                }

                return result;
            } 

            var betaValue = betaFunc(alpha, beta);

            return function(x) {
                return Math.pow(x, alpha -1.0) * Math.pow(1.0 - x,beta - 1.0) / betaValue;
            };
        },
        demo: {
            parameters: [2, 5],
            start: 0,
            stop: 1
        }
    }).factory('distributions',
        ['normalDistribution', 'exponentialDistribution', 'uniformDistribution', 'betaDistribution',
        function(normalDistribution, exponentialDistribution, uniformDistribution, betaDistribution) {
            return [normalDistribution, exponentialDistribution, uniformDistribution, betaDistribution];
        }]
    ).factory('generate', function() {
        return function(pdf, start, stop, step) {
            var xs = _.range(start, stop, step);
            var ys = _.map(xs, pdf);
            return _.zip(xs, ys);
        };
    }).factory('generateDemo', ['generate', function(generate) {
    	var NUM_POINTS = 500;
        return function(distribution, parameters, start, stop) {
        	var step = (stop-start) / NUM_POINTS;
            parameters.push(start);
            parameters.push(stop);
            var pdf = distribution.pdf.apply(this, parameters);
            return generate(pdf, start, stop, step);
        };
    }]).factory('histogram', function() {
        return function(values, bins) {
            var histo = new Array(bins);
            var min = _.min(values), max = _.max(values);
            var width = Math.ceil((max - min) / bins);
            _.each(values, function(value) {
                var index = ((value - min) / width).toFixed();
                var bin = histo[index];
                if (bin === undefined) {
                    bin = [min + (index * width), 0];
                    histo[index] = bin;
                }
                bin[1]++;
            });
            return histo;
        };
    }).factory('binEstimate', function() {
        return function(values) {
            var n = values.length;
            return Math.round(Math.sqrt(n));
        };
    }).factory('genHisto', ['binEstimate', 'histogram', function(binEstimate, histogram) {
        return function(values) {
            var bins = binEstimate(values);
            return histogram(values, bins);
        };
    }]);

