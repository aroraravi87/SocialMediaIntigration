app.factory("Access", ['$q', '$rootScope', '$cookies', function ($q, $rootScope, $cookies) {
    
    var Access = {
        OK: 200,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,

        isAuthenticated: function () {
            var deferred = $q.defer();
            if ($cookies.get('token')) {
                //debugger;
                deferred.resolve(Access.OK);
            }
            else {
                //debugger;
                deferred.reject(Access.UNAUTHORIZED);
            }
            return deferred.promise;
        },

        isAnonymous: function () {
            var deferred = $q.defer();
            if ($cookies.get('token')) {
                //debugger;
                deferred.reject(Access.FORBIDDEN);
            }
            else {
                //debugger;
                deferred.resolve(Access.OK);
            }
            return deferred.promise;
        }
    }

    return Access;

}]);