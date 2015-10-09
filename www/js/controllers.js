angular
    .module('mobileApp')


    .controller('AuthController', AuthController)
    .controller('RegisterController', RegisterController)
    .controller('UserController', UserController);

function RegisterController($auth, $scope, $http, $ionicPopup, $state) {
    console.log("REGISTER CONTROLLER");
    $scope.registration = function() {
        $http.get("http://").then(
            function(result) {
                $scope.response = result;
            });
    };
}

function UserController($http) {

    var vm = this;

    vm.users;
    vm.error;
    vm.something;

    vm.getUsers = function() {

        // This request will hit the index method in the AuthenticateController
        // on the Laravel side and will return the list of users
        $http.get('http://db.copz.net/api/authenticate').success(function(users) {
            vm.users = users;
        }).error(function(error) {
            vm.error = error;
        });
    };
    vm.doSomething = function() {
        $http.get('http://db.copz.net/shit').success(function(something) {
            vm.something = something;
        }).error(function(error) {
            vm.error = error;
        });
    }
}

function AuthController($auth, $state) {

    var vm = this;

    vm.login = function () {

        var credentials = {
            email: vm.email,
            password: vm.password
        };

        // Use Satellizer's $auth service to login
        $auth.login(credentials).then(function (data) {

            // If login is successful, redirect to the users state
            $state.go('users', {});
        });
    }

}




