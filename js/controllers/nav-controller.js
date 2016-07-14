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
