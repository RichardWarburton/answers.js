'use strict';

// Declare app level module which depends on filters, and services
angular
    .module('answers',
        ['ui.bootstrap', 'answers.filters', 'answers.services', 
         'answers.directives', 'answers.controllers', 'answers.population',
         'answers.clustering'])

    .config(['$routeProvider', function($routeProvider, Population) {
        $routeProvider.when('/home', {
            templateUrl: 'partials/home.html',
            controller: 'MyCtrl1'
        });
        $routeProvider.when('/basics', {
            templateUrl: 'partials/basics.html', 
            controller: 'BasicsController'
        });
        $routeProvider.when('/distributions', {
            templateUrl: 'partials/distributions.html', 
            controller: 'DistributionsController'
        });
        $routeProvider.when('/clustering', {
            templateUrl: 'partials/clustering.html', 
            controller: 'ClusteringController'
        });
        $routeProvider.otherwise({redirectTo: '/home'});
  }]);

