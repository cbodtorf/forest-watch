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
