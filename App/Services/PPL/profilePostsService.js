app.service("profileService", ['$http', function ($http) {

    this.UserProfile = function (callback) {
        var serviceurl = APP.service.getUserProfile;
        var data = {};        
        doPost($http, data, serviceurl, function (data, status) {
            callback(data, status);
        })
    }

    this.UpdateUserProfile = function (data, callback) {
        var serviceurl = APP.service.updateUserProfile;            
        doPut($http, data, serviceurl, function (data, status) {
            callback(data, status);
        })
    }

    this.uploadProfileImage = function (data, callback) {
        var serviceurl = APP.service.updateUserPic;
        var profileData = data.picture;      
        doPut($http, profileData, serviceurl, function (data, status) {
            callback(data, status);
        })
    }

    this.timelinePosts = function (index, catType, callback) {
        var serviceurl = APP.service.getTimeLinePosts;
        var data = {
            "Index": index,
            "CatType": catType
        };
        doPost($http, data, serviceurl, function (data, status) {
            callback(data, status);
        })
    }

}]);