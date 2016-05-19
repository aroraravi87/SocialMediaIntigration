var APP = APP || {};

/*--- API service list ---*/
// Base URL (domain)

var domain = "http://172.18.2.11:8033/";

APP.service = {
    "baseURI": domain,
    //Web URLs
    "userLogin": domain + "api/Account/Login",
    "registerUser": domain + "api/Account/Signup",
    "resetPassword": domain + "api/User/UpdatePassword",
    "forgetPassword": domain + "api/Account/ForgetPassword/",

    "getAllPosts": domain + "api/Posts/GetAllPost",
    "likePost": domain + "api/Posts/Like",
    "flagPost": domain + "api/Posts/Flag",
    "uploadPost": domain + "api/Posts/PostsTitle",
    "getFeaturedPosts": domain + "api/Posts/GetTopThreePost",
    
    "getUserProfile": domain + "api/User/Profile",
    "updateUserProfile": domain + "api//User/UpdateProfile",
    "updateUserPic": domain + "api/User/UpdatePicture",
    "getTimeLinePosts": domain + "api/Posts/TimeLinePost",

    "getCategories": domain + "api/Category/GetCategory",
    "getSinglePost": domain + "api/Posts/SinglePost",
    "uploadComment": domain + "api/Posts/Comment",
    "getComment": domain + "api/Posts/GetComments",

    "getLostFound": domain + "api/LostAndFoundPets/GetLostOrFound",
    "uploadLostFoundPost": domain + "api/LostAndFoundPets/PostLostOrFound"
}