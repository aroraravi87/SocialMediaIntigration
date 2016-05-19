/*======== login controller ==========*/

app.controller('loginController', ['$rootScope', '$scope', '$location', '$cookies', 'loginService', function ($rootScope, $scope, $location, $cookies, loginService) {

    
    //if ($cookies.get('token')) {       
    //    $rootScope.$emit("showHeaderPart");
    //}
    //else {
    //    $location.path('/');
        $rootScope.$emit("hideHeaderPart");
    //}    

    //to set username and password if remember
    $scope.formdata = {};    
    $scope.formdata.remember = false;
    if ($cookies.get('username') && $cookies.get('password')) {
        $scope.formdata.remember = true;
        $scope.formdata.username = $cookies.get('username');
        $scope.formdata.password = $cookies.get('password');
    }

    $scope.clicked = function () {

        //alert("controller scope" + JSON.stringify($scope.formdata));
        //for remember me 
        if ($scope.formdata.remember) {
            var now = new Date();
            var exp = new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());
            $cookies.put('username', $scope.formdata.username, {
                expires: exp
            });
            $cookies.put('password', $scope.formdata.password, {
                expires: exp
            });
           // alert("user password cookie:   " + document.cookie);           
        } else {
            $cookies.put('username', '');
            $cookies.put('password', '');        
        }

        loginService.LoginPPL($scope.formdata, function (data, status) {
            //alert("controller Token" + JSON.stringify(data));           
            if (status == "200") {
                var date = new Date();
                date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
                $cookies.put('token', data, {
                    expires: date.toString()
                });
                //alert("final token in cookie : " + $cookies.get('token'));

                $rootScope.$emit("showHeaderPart");

                $location.path('/Home');                
            }
            else {
                $scope.error = "Invalid Credentials, please try again.";
            }
        });
    };   
}]); 

/*====== Register Controller ===========*/

app.controller('registerController', ['$scope', '$location', 'loginService', function ($scope, $location, loginService) {
    $scope.formdata = {};
    $scope.registerUser = function () {
        //alert(JSON.stringify($scope.formdata))
        if (!$scope.userForm.$valid) {
            $scope.showErrors = true;
            $scope.error = "* valid entries are required.";
        }
        else {
            if ($scope.formdata.checkAgree == false || $scope.formdata.checkAgree == undefined) {
                $scope.error = "You must agree to terms and conditions.";
            }
            else {
                loginService.RegisterUser($scope.formdata, function (data, status) {
                    //alert("controller" + status);
                    //alert("controller" + data);
                    if (data == "Thank You!!") {
                        $location.path('/Home');
                    }
                    else {
                        $scope.error = data;
                    }
                });
            }
        }
    }
}]);

/*======= Forget Password Controller =========*/

app.controller('forgetPasswordController', ['$scope', '$location', 'loginService', function ($scope, $location, loginService) {

    $scope.showModal = false;

    $scope.forgetPassword = function () {       
        if ($scope.forgetForm.$valid) {

            loginService.ForgetPassword($scope.formdata.userEmail, function (data, status) {              
                if (status == "200") {
                    $scope.error = '';
                    $scope.showModal = !$scope.showModal;
                    
                } else {
                    $scope.error = "User with this email address not registered. Try again with valid email address.";
                }
            });          
        }
        else {
            $scope.error = "A valid email is required!!";
        }       
    }
}]);

/*========Reset Password Controller==========*/

app.controller('resetPasswordController', ['$rootScope', '$scope', '$location', 'loginService', function ($rootScope, $scope, $location, loginService) {

    $rootScope.$emit("showHeaderPart");
    //$scope.resetPasswordForm = {};   

    $scope.resetPassword = function () {
        if (!$scope.resetPasswordForm.$valid) {
            if ($scope.formdata.newpassword == '' || $scope.formdata.newpassword == undefined) {
                $scope.error = "Enter new valid password first..";
            }
        }
        else {
            if ($scope.formdata.newpassword != $scope.formdata.confirmpassword) {
                $scope.error = "Confirm password does not match..";
            }
            else {
                $scope.error = false;
                loginService.ResetPassword($scope.formdata.newpassword, function (result, status) {                 
                    //alert("status code controller   " + status);
                    if (status == '200') {
                        alert("Password Updated Successfuly");
                        $location.path('/Home');
                    }
                    else {
                        $scope.error = "Ooopps, something went wrong..try again";
                    }
                });
            }
        }
    }
}]);

