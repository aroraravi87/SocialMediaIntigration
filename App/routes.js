app = angular.module('routes', ['ngRoute', 'ngCookies', 'ngTouch', 'base64', 'ui.bootstrap']);

app.controller("spaController", ['$scope', '$location', '$cookies', function ($scope, $location, $cookies) {
    var activeTab = $location.path().replace("/", "");
}]);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('pplInterceptor');
}]);

//Manage Routes 
app.config(['$routeProvider', function ($routeProvider) {

    //Reset headers to avoid OPTIONS request (aka preflight)
    $routeProvider
		.when('/', {
		    templateUrl: 'app/Views/Authentication/Login.html',
		    controller: 'loginController',
		    resolve: {
		        access: ["Access", function (Access) { return Access.isAnonymous(); }]
		    }
		})
        .when('/Login', {
            templateUrl: 'app/Views/Authentication/Login.html',
            controller: 'loginController',
            resolve: {
                access: ["Access", function (Access) { return Access.isAnonymous(); }]
            }
        })
        .when('/Home', {
            templateUrl: 'app/views/PPL/PPLHome.html',
            controller: 'homeController',
            resolve: {
                access: ["Access", function (Access) { return Access.isAuthenticated(); }]
            }
        })
		.when('/signup', {
		    templateUrl: 'app/views/Authentication/Register.html',
		    controller: 'registerController'
		})
        .when('/forgetpassword', {
            templateUrl: 'app/views/Authentication/ForgetPassword.html',
            controller: 'forgetPasswordController'
        })
        .when('/resetpassword', {
            templateUrl: 'app/views/Authentication/ResetPassword.html',
            controller: 'resetPasswordController',
            resolve: {
                access: ["Access", function (Access) { return Access.isAuthenticated(); }]
            }
        })
         .when('/userprofile', {
             templateUrl: 'app/views/Authentication/UserProfile.html',
             controller: 'profileController',
             resolve: {
                 access: ["Access", function (Access) { return Access.isAuthenticated(); }]
             }
         })
         .when('/uploadNewPost', {
             templateUrl: 'app/views/PPL/NewPostUpload.html',
             controller: 'postUploadController',
             resolve: {
                 access: ["Access", function (Access) { return Access.isAuthenticated(); }]
             }
         })
         .when('/construction', {
             templateUrl: 'app/views/PPL/UnderConstruction.html',
             controller: 'homeController',
             resolve: {
                 access: ["Access", function (Access) { return Access.isAuthenticated(); }]
             }
         })

           .when('/comment/:param', {
               templateUrl: 'app/views/PPL/SinglePost.html',
               controller: 'singlePostController',
               resolve: {
                   access: ["Access", function (Access) { return Access.isAuthenticated(); }]
               }
           })
         .when('/uploadLostFoundPost', {
             templateUrl: 'app/views/PPL/UploadLostAndFound.html',
             controller: 'uploadLostAndFoundController',
             resolve: {
                 access: ["Access", function (Access) { return Access.isAuthenticated(); }]
             }
         })
       .when('/lostAndFound', {
            templateUrl: 'app/views/PPL/LostAndFound.html',
             controller: 'lostAndFoundController',
             resolve: {
        access: ["Access", function (Access) { return Access.isAuthenticated(); }]
    }
})
       
		.otherwise({ redirectTo: '/' });
}]);


app.run(["$rootScope", "Access", "$location",
    function ($rootScope, Access, $location) {

        $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
            if (rejection == Access.UNAUTHORIZED) {
                $location.path('/');
            }
            if (rejection == Access.FORBIDDEN) {
                $location.path('/Home');
            }
        });
        
    }]);

