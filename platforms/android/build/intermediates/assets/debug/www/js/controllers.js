'use strict';
angular.module('mobileApp')


    .controller('AuthController', AuthController)
    .controller('RegisterController', RegisterController)
    .controller('UserController', UserController);



function RegisterController($scope, $http, $ionicPopover, $location) {

    $scope.phone = undefined;
    $scope.register = {};
    var register = $scope.register;

    $ionicPopover.fromTemplateUrl('templates/popover.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popover = popover;
    });
    $scope.openPopover = function($event) {
        $scope.popover.show($event);
    };
    $scope.closePopover = function() {
        $scope.popover.hide();
    };
    ////Cleanup the popover when we're done with it!
    //$scope.$on('$destroy', function() {
    //    $scope.popover.remove();
    //});
    //// Execute action on hide popover
    //$scope.$on('popover.hidden', function() {
    //    // Execute action
    //});
    //// Execute action on remove popover
    //$scope.$on('popover.removed', function() {
    //    // Execute action
    //});

    $scope.registerFormSubmit = function() {
     //   console.log($scope.register);
        $http({
            method  : 'POST',
            url     : 'http://db.copz.net/api/register',
            data    : $scope.register
        })
            .success(function(data) {
                if(!data.success) {

                    console.log(data);
                    if(data.response) {
                        $scope.serverMessage = data;
                        $location.path('/auth');

                    } else {
                        $scope.serverMessage = data;
                    }

                } else {
                    $scope.message = data.message;
                }
            });
    };
}

function UserController($http) {

    var vm = this;

    vm.users;
    vm.error;
    vm.something;

    vm.getUsers = function() {

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

        $auth.login(credentials).then(function (data) {

            $state.go('users', {});
        });
    };
}



