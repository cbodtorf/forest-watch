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
