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
