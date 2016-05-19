
app.directive('spaHeader', function () {
      return {
        templateUrl: 'App/Views/Header/header.html',
        restrict: 'E',
       controller: ['$rootScope', '$scope', '$cookies', 'profileService', '$location', function ($rootScope, $scope, $cookies, profileService, $location) {
            $scope.show = false;
        
            $rootScope.$on("showHeaderPart", function () {
                $scope.show = true;
            });
            $rootScope.$on("hideHeaderPart", function () {
                $scope.show = false;
            });

            $scope.logOut = function () {                   
                $cookies.remove('token');               
                $location.path('/');
            }

           
            $scope.user = {
                name: "",
                firstName: "",
                lastName: "",
                sex: "",
                description: "",
                picture:"",
            };
            profileService.UserProfile(function (data, status) {
                $scope.user.name = data.FirstName + " " + data.LastName;
                $scope.user.firstName = data.FirstName;
                $scope.user.lastName = data.LastName;
                $scope.user.sex = data.Sex;
                $scope.user.description = data.Description;
                $scope.user.picture = "data:image/jpeg;base64," + data.Picture;
               
            })
            
       
        }]
      }
  
});


