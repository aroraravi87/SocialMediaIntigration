
app.directive('pplForgetPassPopUp', function () {
    return {
        templateUrl: 'App/Views/Authentication/ForgetPasswordPopUp.html',
        restrict: 'E'
    }
});

app.directive('modal', ['$location', function ($location) {
    return {
        template: '<div class="modal fade forgetPassword">' +
            '<div class="modal-dialog">' +
              '<div class="modal-content popup_sec">' +
                '<div class="modal-header forgetModalHeder">' +
                  '<button type="button" class="close forgetPass" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                  '<h4 class="modal-title">{{ title }}</h4>' +
                '</div>' +
                '<div class="modal-body" ng-transclude></div>' +
              '</div>' +
            '</div>' +
          '</div>',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: true,
        link: function postLink(scope, element, attrs) {
            scope.title = attrs.title;

            scope.$watch(attrs.visible, function (value) {
                if (value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = false;
                    $location.path("/");
                });
            });
        }
    };
}]);


app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);