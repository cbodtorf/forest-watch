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
