/*******************************
* Forest Watch App
* Date: 7-12-2016
********************************/


(function() {
"use strict"

let app = angular.module('ForestWatchApp', ['ngRoute'])



  //Router
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'main.html',
        // controller: '',
      })

      .when('/login',{
        templateUrl: 'login.html',
        controller: 'LoginController',
      })

      .when('/jobs', {
        templateUrl: 'jobs.html',
        // controller: '',
      })

      .when('/news', {
        templateUrl: 'news.html',
        // controller: '',
      })

      .when('/about', {
        templateUrl: 'about.html',
      })

      .otherwise({
        redirectTo: '/404',
      })
  }])

  // Services
  require('./services/volunteer-service')(app);
  require('./services/jobs-service')(app);

  // Controllers
  require('./controllers/nav-controller')(app);
  require('./controllers/login-controller')(app);



  // Filters

  // Directives



})();
