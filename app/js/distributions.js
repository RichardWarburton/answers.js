'use strict';


/**
 * All distributions have a:
 * name
 * link - to a description
 * pdf - the probability density function
 */
angular
    .module('answers.distributions', [])
    .value('normal', {
        name: 'Normal',
        link: 'https://en.wikipedia.org/wiki/Normal_distribution',
        pdf: function(mean, stddev) {
            return 0;
        }
    });

