app.service("messagePostsService", ['$http', function ($http) {

    this.homePosts = function (order, callback) {
        var serviceurl = APP.service.getAllPosts;
        var post = order;
            //{
        //    "renderType": order
        //};
        doPost($http, post, serviceurl, function (data, status) {
            callback(data, status);
        })     
    }

    this.like = function (postId, callback) {
        var serviceurl = APP.service.likePost;
        var post = {
            "id": postId
        };
        doPut($http, post, serviceurl, function (data, status) {
            callback(data, status);
           })
    }

    this.flag = function (postId, callback) {
        var serviceurl = APP.service.flagPost;
        var post = {
            "id": postId
        };
        doPut($http, post, serviceurl, function (data, status) {
            //alert(data);
            callback(data, status);
        })
    }


    this.uploadNewPost = function (newPost, callback) {
        var serviceurl = APP.service.uploadPost;
        var post = {
            "title": newPost.postName,
            "catType": newPost.category, 
            "postImage": newPost.picture
        };
        doPost($http, post, serviceurl, function (data, status) {
            callback(data, status);
        })
    }

    //by ---@run----

    this.getCategories = function (callback) {
        var serviceurl = APP.service.getCategories;
        var post = {
           // "renderType": order
        };
        doGet($http, post, serviceurl, function (data, status) {
            callback(data, status);
        })
    }


    this.singlePost = function (id, callback) {
       
        var serviceurl = APP.service.getSinglePost;
        var post = {
            "id": id
        };
        doPost($http, post, serviceurl, function (data, status) {
         callback(data, status);
      })
    }

    this.postComment = function (post, callback) {
        var serviceurl = APP.service.uploadComment;
         doPost($http, post, serviceurl, function (data, status) {
         callback(data, status);
        })
    }

    this.getComment = function (post, callback) {
        var serviceurl = APP.service.getComment;
        doPost($http, post, serviceurl, function (data, status) {
            callback(data, status);
        })
    }

    this.feateuredPosts = function (callback) {
        var serviceurl = APP.service.getFeaturedPosts;
        //alert(serviceurl);
        var post = {};
        doGet($http, post, serviceurl, function (data, status) {
            //alert(data);
            callback(data, status);
        })
    }

    this.uploadLostFoundPost = function (post, callback) {
        var serviceurl = APP.service.uploadLostFoundPost;
        var postData = post;
        doPost($http, postData, serviceurl, function (data, status) {
            alert(data)
            callback(data, status);
        })
    }

    this.getLostAndFoundPosts = function (status, callback) {
       // alert(status)
        var serviceurl = APP.service.getLostFound;
        var postData = status;
        doPost($http, postData, serviceurl, function (data, status) {
            //alert(data)
            callback(data, status);
        })
    }

    }]);