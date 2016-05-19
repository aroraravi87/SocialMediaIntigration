app.directive('pplImageUpload', function () {
    return {
        templateUrl: 'App/Views/Common/imageUpload.html',
        restrict: 'E',
        scope: {},
        controller: function ($scope) {
            $scope.newPost = {};
            //debugger;
            $scope.postImageUpload = function (element) {
                //alert("jkjgkjddkjfbasfsdaf  hi new");
                var filename = element.files[0].name;
                var extn = filename.split(".").pop();
                if (element.files && element.files[0]) {
                    var reader = new FileReader();
                    reader.onload = $scope.postImageIsLoaded;
                    reader.readAsDataURL(element.files[0]);
                }
                else {
                    alert("Try with another image...");
                }
            }

            $scope.postImageIsLoaded = function (e) {
                $scope.$apply(function () {
                    $scope.newPost.picture = e.target.result;
                });
            }
        }
    }
});