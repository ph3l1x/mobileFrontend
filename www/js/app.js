
angular.module('mobileApp', ['ionic', 'mobileApp.controllers', 'ui.router', 'satellizer'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider, $authProvider, USER_ROLES) {

        $authProvider.loginUrl = 'db.copz.net/api/authenticate';
        $urlRouterProvider.otherwise('/auth');

        $stateProvider
            .state('auth', {
                url: '/auth',
                templateUrl: 'templates/authView.html',
                controller: 'AuthController as auth'
            })
            .state('users', {
                url: '/users',
                templateUrl: 'templates/userView.html',
                controller: 'UserController as user'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })
            .state('main', {
                url: '/',
                abstract: true,
                templateUrl: 'templates/main.html'
            })
            .state('main.dash', {
                url: 'main/dash',
                views: {
                    'dash-tab': {
                        templateUrl: 'templates/dashboard.html',
                        controller: 'DashCtrl'
                    }
                }
            })
            .state('main.public', {
                url: 'main/public',
                views: {
                    'public-tab': {
                        templateUrl: 'templates/public.html'
                    }
                }
            })
            .state('main.admin', {
                url: 'main/admin',
                views: {
                    'admin-tab': {
                        templateUrl: 'templates/admin.html'
                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            });
        $urlRouterProvider.otherwise(function ($injector, $location) {
            var $state = $injector.get("$state");
            $state.go("main.dash");
        });
    })

    .run(function($httpBackend){
        //$httpBackend.whenGET('http://db.xxx.local')
        //    .respond({message: 'This is my valid response!'});
        //$httpBackend.whenGET('http://db.xxx.local')
        //    .respond(401, {message: "Not Authenticated"});
        //$httpBackend.whenGET('http://db.xxx.local')
        //    .respond(403, {message: "Not Authorized"});
        //
        //$httpBackend.whenGET(/templates\/\w+.*/).passThrough();
    })

    .run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
        $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {

            if ('data' in next && 'authorizedRoles' in next.data) {
                var authorizedRoles = next.data.authorizedRoles;
                if (!AuthService.isAuthorized(authorizedRoles)) {
                    event.preventDefault();
                    $state.go($state.current, {}, {reload: true});
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                }
            }

            if (!AuthService.isAuthenticated()) {
                if (next.name !== 'login') {
                    event.preventDefault();
                    $state.go('login');
                }
            }
        });
    });