(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*******************************
* Login Controller
* display volunteer information from service
********************************/


module.exports = function(app) {

  app.controller('LoginController', ['$scope', 'VolunteerService', function($scope, VolunteerService){
    $scope.username = '';
    $scope.vol = VolunteerService.getUser();

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

              if (user.length === 1) {
                // set user session, probs change *login* link to *logout*

                return user[0].info;
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

module.exports = function(app) {

  app.directive('job', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/directives/job.html',
      scope: {
        job: '=info',
      },
      replace: true,
    };
  });
};

},{}],4:[function(require,module,exports){
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
    }).when('/logout', {
      templateUrl: 'logout.html',
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
  require('./directives/job-directive')(app);
})();
},{"./controllers/login-controller":1,"./controllers/nav-controller":2,"./directives/job-directive":3,"./services/jobs-service":5,"./services/volunteer-service":6}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

        //when logging in
        getVol(callback) {
          $http({
            url: '/volunteers',
            method: 'GET',
          }).then(function(response){

            let user = callback(response);
            angular.copy(user, vol);

            let log = {status: true};
            angular.copy(log, logStatus);

            $location.path('/');
          })
        },

        // return log status
        getLogStatus() {

          return logStatus;
        },

        // current user
        getUser() {

          return vol;
        },

        // clear out user information and reset status
        clearSession() {
          user = {};
          let log = {status: false};

          angular.copy(user, vol);
          angular.copy(log, logStatus);

          $location.path('/');
        },

      }




  }])
}

},{}]},{},[4])