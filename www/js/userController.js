angular
    .module('mobileApp')
    .controller('UserController', UserController);

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