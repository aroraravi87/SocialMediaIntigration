app.directive('pplLoader', function () {
    return {
        //templateUrl: 'App/Views/Common/loader.html',
        template:   '<div class="test">' +
                    '<script type="text/ng-template" id="loaderModal" class="loader-modal-dialog loader-modal-content">' +
                    '<div class="modal-body  loader">' +
                    '<img src="/app/content/images/loading.GIF" />' +
                    '<span style="margin-left:30px;">Please wait while content is loading...</span>' +
                    '</div>' +
                    ' </script>' +
                    '</div>',
        restrict: 'E'
    }
});

