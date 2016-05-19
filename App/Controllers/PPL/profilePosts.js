/*======= home Controller =========*/

app.controller('homeController', ['$rootScope', '$scope', '$location', 'loginService', 'messagePostsService', '$uibModal', function ($rootScope, $scope, $location, loginService, messagePostsService, $uibModal) {
    $rootScope.$emit("showHeaderPart");
    // $scope.showModal = !$scope.showModal;
    // $scope.post = {};
    // $scope.post.order = '';
    $scope.viewMoreImg = true;
    var postsData;
    $scope.order = {
        RenderType: "LatestFirst",
        id: "0",
        Index: "0",
        CatType: "",
    };
    $scope.search = { CatType: '' };
    $scope.categories = "";
    $scope.order.CatType = $scope.search.CatType;
    //load dialog
    $scope.$modalInstance = $uibModal.open({
        scope: $scope,
        templateUrl: 'loaderModal',
        controller: 'modalController',
        backdrop: 'static',
        size: 'sm',
        windowClass: 'loader-div loadingImg'
    });

    ($scope.renderHomePost = function () {
        messagePostsService.homePosts($scope.order, function (data, status) {
            postsData = JSON.parse(data);
            $scope.posts = postsData;
            $scope.category();
            $scope.$modalInstance.dismiss('cancel');
        });
    })();

    //render featured
    messagePostsService.feateuredPosts(function (data, status) {
        if (status == "200") {
            var newData = JSON.parse(data);
            $scope.featuredPosts = newData;
        }
        else {
            alert("OOpss.. Something went wrong..");
        }
    });

    //Post order
    $scope.postsOrder = function (order) {
        $scope.viewMoreImg = true;
        $scope.order.Index = "0";
        $scope.order.RenderType = order;
        $scope.renderHomePost();
    }

    $scope.flaggedPost = function () {      
        $scope.order.CatType = "";
        $scope.order.RenderType = "Flaged";
        $scope.viewMoreImg = true;
        $scope.order.Index = "0";
        $scope.renderHomePost();       
    }

    //$scope.flaggedPost = function () {
    //    if ($scope.flag) {
    //        $scope.order.RenderType = "Flaged";
    //        $scope.renderHomePost();
    //    }
    //    else {
    //        $scope.order.RenderType = "LatestFirst";
    //        $scope.renderHomePost();
    //    }
    //}

    //like post
    //$scope.likePost = function (id) {
    //    messagePostsService.like(id, function (data, status) {
    //        if (status == "200") {
    //            // $scope.renderPage();
    //        }
    //        if (status == "403") {
    //            alert("Already liked this");
    //        }
    //    });
    //}

    $scope.likePost = function (index) {
        var id = $scope.posts[index].Id;
        messagePostsService.like(id, function (data, status) {
            if (status == "200") {
                // $scope.renderPage();              
                $scope.posts[index].LikeCount = data;
                if ($scope.posts[index].Like == "Like") {
                    $scope.posts[index].Like = "Unlike";
                }
                else {
                    $scope.posts[index].Like = "Like";
                }
            }
            if (status == "403") {
                alert("Already liked this");
            }
        });
    }

    //Flag post
    $scope.flagPost = function (index) {       
        var id = $scope.posts[index].Id;        
        messagePostsService.flag(id, function (data, status) {            
            if (status == "200") {
                if ($scope.posts[index].Flag == "Flag") {
                    $scope.posts[index].Flag = "Unflag";
                }
                else {
                    $scope.posts[index].Flag = "Flag";
                }
                // $scope.renderPage();
            }
            if (status == "403") {
                alert("Already flaged this");
            }
        });
    }

    //Render category from server
    $scope.category = function () {
        messagePostsService.getCategories(function (data, status) {
            $scope.categories = data;
            console.log($scope.categories);

        });
    };

    //
    $scope.catType = function (input) {
        $scope.viewMoreImg = true;
        $scope.search.CatType = input;
        $scope.order.CatType = input;
        $scope.order.Index = "0";
        $scope.renderHomePost();
    }

    $scope.viewMore = function () {
        $scope.order.Index = ($scope.order.Index) * 1 + 5;
        messagePostsService.homePosts($scope.order, function (data, status) {
            postsData = JSON.parse(data);
            $scope.posts = $scope.posts.concat(postsData);
            //$scope.order.Index = ($scope.order.Index) * 1 + 5;
            //disable view more button
            if ($scope.posts[$scope.posts.length - 1]["LastItem"] == "true") {
                $scope.viewMoreImg = false;
            }
            else {
                $scope.viewMoreImg = true;
            }
            $scope.$modalInstance.dismiss('cancel');
        });
    }

}]);

/*======= post upload controller ===== */

app.controller('postUploadController', ['$rootScope', '$scope', '$location', 'loginService', 'messagePostsService', function ($rootScope, $scope, $location, loginService, messagePostsService) {
    $rootScope.$emit("showHeaderPart");

    //upload profile image
    $scope.newPost = {};
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

    $scope.uploadPost = function () {
        //alert($scope.newPost.category);
        if (!$scope.newPostForm.$valid) {
            $scope.error = "Title or category must have values.";
        }
        else {
            if ($scope.newPost.picture == undefined || $scope.newPost.picture == '') {
                $scope.error = "Image is required. Please select image.";
            }
            else {
                //alert("all data good....");
                messagePostsService.uploadNewPost($scope.newPost, function (data, status) {
                    if (status = "200") {
                        alert("Post successfully uplaoded");
                        $location.path("/home");
                    }
                });
            }
        }
    }

    $scope.categories = "";
    ($scope.category = function () {
        messagePostsService.getCategories(function (data, status) {
            $scope.categories = data;
        });
    })();

}]);

/*======= profile Controller =========*/

app.controller('profileController', ['$rootScope', '$scope', '$location', 'loginService', 'profileService', 'messagePostsService', '$base64', '$uibModal', function ($rootScope, $scope, $location, loginService, profileService, messagePostsService, $base64, $uibModal) {
    $rootScope.$emit("showHeaderPart");
    $scope.user = {};
    $scope.display = false;
    $scope.categories = "0";
    $scope.Id = "0";
    $scope.Index = "0";
    $scope.viewMoreImg = true;
    var postsData;
    $scope.search = { CatType: '' };

    //open dialog
    $scope.open = function () {
        $scope.$modalInstance = $uibModal.open({
            scope: $scope,
            templateUrl: 'loaderModal',
            controller: 'modalController',
            backdrop: 'static',
            size: 'sm',
            windowClass: 'loader-div loadingImg'
        });
    };

    profileService.UserProfile(function (data, status) {
        $scope.user.name = data.FirstName + " " + data.LastName;
        $scope.user.firstName = data.FirstName;
        $scope.user.lastName = data.LastName;
        $scope.user.sex = data.Sex;
        $scope.user.description = data.Description;
        $scope.user.picture = "data:image/jpeg;base64," + data.Picture;
        $scope.category();
    })

    $scope.category = function () {
        messagePostsService.getCategories(function (data, status) {
            $scope.categories = data;
            console.log($scope.categories);

        });
    };

    $scope.catType = function (input) {
        //alert(input);
        $scope.viewMoreImg = true;
        $scope.search.CatType = input;
        $scope.CatType = input;
        $scope.Index = "0";
        $scope.renderTimeLinePost();

    }

    $scope.showBrowse = function () {
        if ($scope.browse) {
            $scope.browse = false;
        } else {
            $scope.browse = true;
        }
    }

    $scope.editProfile = function () {
        if ($scope.display) {
            $scope.display = false;
        } else {
            $scope.display = true;
        }
    }

    $scope.updateProfile = function () {
        profileService.UpdateUserProfile($scope.user, function (data, status) {
            //alert("in controller status is   " + data + "    " + status);
            if (status == "200") {
                alert("Your profile has been successfully updated...");
                $scope.display = false;
                //$location.path("/userprofile");
            }
            else {
                alert("OOppss.. Something gonna wrong... try again.");
            }
        });
    }

    //upload profile image
    $scope.imageUpload = function (element) {
        var filename = element.files[0].name;
        var extn = filename.split(".").pop();
        if (element.files && element.files[0]) {
            var reader = new FileReader();
            reader.onload = $scope.imageIsLoaded;
            reader.readAsDataURL(element.files[0]);
        }
        else {
            alert("Try with another image...");
        }
    }

    $scope.imageIsLoaded = function (e) {
        $scope.$apply(function () {
            $scope.user.picture = e.target.result;
            //  $scope.imageChanged = true;
            // $scope.removeLink = true;
        });
    }

    $scope.uploadFile = function () {
        var file = $scope.uploadImage;
        //alert($scope.user.picture);
        if (file != undefined && file != '') {
            profileService.uploadProfileImage($scope.user, function (data, status) {
                //alert("hoye in controller");
                if (status == '200') {
                    alert("Your profile image has been successfully updated");
                    $scope.browse = false;
                }
            });
        }
    }

    //timeline posts
    var timelinePosts;

    $scope.open();

    ($scope.renderTimeLinePost = function () {
        profileService.timelinePosts($scope.Index, $scope.CatType, function (data, status) {

            timelinePosts = JSON.parse(data);
            $scope.myPosts = timelinePosts;
            //  $scope.Id = $scope.myPosts[$scope.myPosts.length - 1]["Id"];
            if ($scope.myPosts[$scope.myPosts.length - 1]["LastItem"] == "true") {
                $scope.viewMoreImg = false;
            }
            else {
                $scope.viewMoreImg = true;
            }
            $scope.$modalInstance.dismiss('cancel');
        });
    })();


    //render featured
    messagePostsService.feateuredPosts(function (data, status) {
        if (status == "200") {
            var newData = JSON.parse(data);
            $scope.featuredPosts = newData;
        }
        else {
            alert("OOpss.. Something went wrong..");
        }
    });

    //like post
    $scope.likePost = function (index) {        
        var id = $scope.myPosts[index].Id;       
        messagePostsService.like(id, function (data, status) {           
            if (status == "200") {
                // $scope.renderPage();
                $scope.myPosts[index].LikeCount = data;
                if($scope.myPosts[index].Like=="Like")
                {
                    $scope.myPosts[index].Like = "Unlike";
                }
                else {
                    $scope.myPosts[index].Like = "Like";
                }
            }
            if (status == "403") {
                alert("Already liked this");
            }
        });
    }

    //Flag post
    $scope.flagPost = function (index) {      
        var id = $scope.myPosts[index].Id;        
        messagePostsService.flag(id, function (data, status) {
            if (status == "200") {
                // $scope.renderPage();
                if ($scope.myPosts[index].Flag == "Flag") {
                    $scope.myPosts[index].Flag = "Unflag";
                }
                else {
                    $scope.myPosts[index].Flag = "Flag";
                }
            }
            if (status == "403") {
                alert("Already flaged this");
            }
        });
    }

    $scope.viewMore = function () {
        $scope.Index = ($scope.Index) * 1 + 5;
        profileService.timelinePosts($scope.Index, $scope.CatType, function (data, status) {
            postsData = JSON.parse(data);
            $scope.myPosts = $scope.myPosts.concat(postsData);

            if ($scope.myPosts[$scope.myPosts.length - 1]["LastItem"] == "true") {
                $scope.viewMoreImg = false;
            }
            else {
                $scope.viewMoreImg = true;
            }
            $scope.$modalInstance.dismiss('cancel');
        });
    }
}]);

/*======= singlePost Controller =========*/

app.controller('singlePostController', ['$rootScope', '$scope', '$routeParams', '$location', 'loginService', 'profileService', 'messagePostsService', '$base64', function ($rootScope, $scope, $routeParams, $location, loginService, profileService, messagePostsService, $base64) {
    $scope.post = {
        comments: "",
        id: $location.search().id,
    }

    var postData;
    var id = $routeParams.param;
    $scope.postComment = id;



    ($scope.renderPage = function () {
        messagePostsService.singlePost(id, function (data, status) {
            $scope.post = data;
            $scope.getComment();
        });

    })();


    //This function is use to getComment
    $scope.getComment = function () {
        messagePostsService.getComment($scope.post, function (data, status) {
            data = JSON.parse(data);
            $scope.comments = data;
        });
    }


    $scope.submitComment = function () {
        messagePostsService.postComment($scope.post, function (data, status) {
            $scope.post.comments = "";
            $scope.renderPage();

        });
    }

    //Flag post
    $scope.flagPost = function (id) {
        messagePostsService.flag(id, function (data, status) {
            if (status == "200") {
                // $scope.renderPage();
            }
            if (status == "403") {
                alert("Already flaged this");
            }
        });
    }

    $scope.likePost = function (id) {
        messagePostsService.like(id, function (data, status) {
            if (status == "200") {
                $scope.renderPage();
            }
            if (status == "403") {
                alert("Already liked this");
            }
        });
    }



}]);

/*=======modal pop-ups controller====*/

app.controller('modalController', function ($scope, $uibModalInstance) {
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

/*======= lostAndFound Controller ====== */

app.controller('lostAndFoundController', ['$rootScope', '$scope', '$routeParams', '$location', 'loginService', 'profileService', 'messagePostsService', '$base64', function ($rootScope, $scope, $routeParams, $location, loginService, profileService, messagePostsService, $base64) {

    $rootScope.$emit("showHeaderPart");

    $scope.found = {
        Status:"Found"
    }
    $scope.lost = {
        Status:"Lost"
    }

    $scope.categories = "";
    ($scope.category = function () {
        messagePostsService.getCategories(function (data, status) {
            $scope.categories = data;
        });
    })();

    profileService.timelinePosts($scope.Id, function (data, status) {
        timelinePosts = JSON.parse(data);
        $scope.myPosts = timelinePosts;
    });

    messagePostsService.getLostAndFoundPosts($scope.found, function (data, status) {
        //alert(data);
       // var postsForFound = JSON.parse(data);
        console.log(data);
        $scope.foundPosts = data;
    });

    messagePostsService.getLostAndFoundPosts($scope.lost, function (data, status) {
        //alert(data);
        // var postsForFound = JSON.parse(data);
        console.log(data);
        $scope.lostPosts = data;
    });

}]);

/*====== Upload lost and found post controller ======= */

app.controller('uploadLostAndFoundController', ['$rootScope', '$scope', '$routeParams', '$location', 'loginService', 'profileService', 'messagePostsService', '$base64', function ($rootScope, $scope, $routeParams, $location, loginService, profileService, messagePostsService, $base64) {

    $rootScope.$emit("showHeaderPart");

    $scope.newPost = {};
    //$scope.obj = {};
    //$scope.files = [];
    //var fileModel = {
    //    "picture": "",
    //    "file": ""
    //}
    //$scope.files.push(fileModel);
    //alert(JSON.stringify($scope.files));

    //debugger;

    //$scope.params= {
    //    Index : "0"
    //}

    $scope.categories = "";
    ($scope.category = function () {
        messagePostsService.getCategories(function (data, status) {
            $scope.categories = data;
        });
    })();

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

    $scope.uploadLostFoundPost = function () {
        alert(JSON.stringify($scope.newPost));

        $scope.newPost.Index = "0";
        
        if (!$scope.newPostForm.$valid) {
            $scope.error = "Please make sure for valid entries.";
        }
        else {
            if ($scope.newPost.picture == undefined || $scope.newPost.picture == '') {
                $scope.error = "Image is required. Please select image.";
            }
            else {
                //alert("all data good....");
                messagePostsService.uploadLostFoundPost($scope.newPost, function (data, status) {
                    //alert(data + "          " + status)
                    if (status = "200") {
                        alert("Post successfully uploaded");
                        $location.path("/lostAndFound");
                    }
                    else {
                        alert("Something went wrong");
                    }
                });
            }
        }
    }


}]);

