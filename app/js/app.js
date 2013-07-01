'use strict';


// Declare app level module which depends on filters, and services
angular.module('answers', ['ui.bootstrap', 'answers.filters', 'answers.services', 'answers.directives', 'answers.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'MyCtrl1'});
    $routeProvider.when('/distributions', {templateUrl: 'partials/distributions.html', controller: 'MyCtrl1'});
    $routeProvider.otherwise({redirectTo: '/home'});
  }]);
