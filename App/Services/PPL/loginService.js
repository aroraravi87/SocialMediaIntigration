
/*=======Interceptors ==============*/

app.factory("pplInterceptor", ['$cookies', function ($cookies) {
    var tokenInjector = {
        request: function (config) {
            if ($cookies.get('token')) {
                config.headers['token'] = $cookies.get('token');
            }
            return config;
        }
    };
    return tokenInjector;
}]);

/*======= login service ============*/

app.service("loginService", ['$http', function ($http) {

    this.LoginPPL = function (data, callback) {
        var serviceurl = APP.service.userLogin;               
        doPostLogin($http, data, serviceurl, function (data, status) {
            callback(data, status);
        })       
    }

    this.RegisterUser = function (formData, callback) {
        var serviceurl = APP.service.registerUser;
        var data = formData;       
        doPost($http, data, serviceurl, function (data, status) {
            callback(data, status);
        })
    }

    this.ResetPassword = function (newPassword, callback) {
        var serviceurl = APP.service.resetPassword;
        var data = { "password": newPassword };
        doPost($http, data, serviceurl, function (data, status) {
            callback(data, status);
        })
    }

    this.ForgetPassword = function (email, callback) {
        var serviceurl = APP.service.forgetPassword;
        var data = { "email": email };
        doPost($http, data, serviceurl, function (data, status) {
            callback(data, status);
        })
    }
}]);