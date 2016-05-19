app.directive('spaNav', ['$location', function ($location) {
    return {
        templateUrl: 'App/Views/Navigation/navigation.html',
        restrict: 'E',
        controller: function ($scope) {
            //var activeTab = $location.path().replace("/", "");
           
            //if (activeTab.indexOf("customer") != -1)
            //{
            //    activeTab = 'customer';
            //}
            //console.log(activeTab);
            //    switch (activeTab) {
            //        case 'customer':
            //            $scope.activeMenu = 'customer';
            //            $scope.customerMenu = 'active';
            //            $scope.mapMenu = 'inactive';
            //            break;
            //        case 'map':
            //            $scope.activeMenu = 'map';
            //            $scope.customerMenu = 'inactive';
            //            $scope.mapMenu = 'active';
            //            break;
            //    }
        }
    }
}]);