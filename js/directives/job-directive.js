
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
