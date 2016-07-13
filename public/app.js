(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*******************************
* Login Controller
* display volunteer information from service
********************************/


module.exports = function(app) {

  app.controller('LoginController', ['$scope', 'VolunteerService', function($scope, VolunteerService){
    $scope.username = '';
    $scope.vol = {};

    let loggedIn = function() {
      let log = document.getElementById('log');
      let a = document.createElement('A');
      a.setAttribute('href', '#/logout');
      a.innerHtml = 'Logout';
      log.appendChild(a);
    }

    $scope.login = function() {

      //block user input *ADD* condition if user has been created
      if ($scope.username === '' || $scope.password === '') {
        console.log("enter your shit right");
        return
      } else {
          // check to see if user exits
          VolunteerService.getVol(function(response){

              user = response.data.filter(function(e){
                return e.username === $scope.username && e.password === $scope.password;
              })
              $scope.username = '';
              $scope.password = '';
              console.log('user', user[0].info)
              if (user.length === 1) {
                // set user session, probs change *login* link to *logout*

                $scope.vol = user[0].info;

                return $scope.vol;
              } else {
                // create new user
                console.log("create new user");

                //** need server and db ** set username and password

                // VolunteerService.setVol(username, password)
                return
              }
          });

      }
    }


    $scope.logout = function() {
      //clear session
      VolunteerService.clearSession()

    }




  }])
}

},{}],2:[function(require,module,exports){
/*******************************
* Nav Controller
*
********************************/

module.exports = function(app) {

  app.controller('NavController', ['$scope', 'VolunteerService', function($scope, VolunteerService){

    /*******************************
    * menu collapse
    *********************************/
    $scope.logStatus = VolunteerService.getLogStatus();
    $scope.vol = VolunteerService.getUser();
    $scope.isCollapsed = false;




  }])
}

},{}],3:[function(require,module,exports){
'use strict';

/*******************************
* Forest Watch App
* Date: 7-12-2016
********************************/

(function () {
  "use strict";

  var app = angular.module('ForestWatchApp', ['ngRoute'])

  //Router
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'main.html'
    }).when('/login', {
      templateUrl: 'login.html',
      controller: 'LoginController'
    }).when('/jobs', {
      templateUrl: 'jobs.html'
    }).when('/news', {
      templateUrl: 'news.html'
    }).when('/about', {
      templateUrl: 'about.html'
    }).otherwise({
      redirectTo: '/404'
    });
  }]);

  // Services
  require('./services/volunteer-service')(app);
  require('./services/jobs-service')(app);

  // Controllers
  require('./controllers/nav-controller')(app);
  require('./controllers/login-controller')(app);

  // Filters

  // Directives
})();
},{"./controllers/login-controller":1,"./controllers/nav-controller":2,"./services/jobs-service":4,"./services/volunteer-service":5}],4:[function(require,module,exports){
/*******************************
* Jobs Service
* stores Job/Event info
********************************/


module.exports = function(app) {

  app.factory('JobsService', ['$http', '$location', function($http, $location) {

      let jobs = [];

      let job = {
        volunteers: [],
        date: {},
        title: '',
        description: '',
        hrs: 0,
        peepsNeeded: 0,
      }

      return {
        getJobs() {

        },

        getJob() {

        },

      }



  }])
}

},{}],5:[function(require,module,exports){
/*******************************
* Volunteer Service
* stores Job/Event info
********************************/


module.exports = function(app) {

  app.factory('VolunteerService', ['$http', '$location', function($http, $location) {

      let vol = {};
      let logStatus = {status: false};

      return {
        // need server and db to post
        setVol(userObj) {
          $http({
            url: '',
            method: 'POST',
            data: {
              vol: userObj,
            }
          })

        },

        getVol(callback) {
          $http({
            url: './mock/volunteers.json',
            method: 'GET',
          }).then(function(response){

            let user = callback(response);
            angular.copy(user, vol);

            let log = {status: true};
            angular.copy(log, logStatus);

            $location.path('/');
          })
        },

        getLogStatus() {

          return logStatus;
        },

        getUser() {

          return vol;
        },

      }




  }])
}

},{}]},{},[3])