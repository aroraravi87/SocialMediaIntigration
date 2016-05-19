var social =
{
    facebookinit: function () {
        window.fbAsyncInit = function () {
            FB.init({
                appId: '482006111990959',
                xfbml: true,
                version: 'v2.6'
            });

            FB.getLoginStatus(function (response) {
                statusChangeCallback(response);
            });

            //FB.login(function (response) {
            //    console.log(response);
            //    if (response.authResponse) {
            //        console.log('Welcome!  Fetching your information.... ');
            //        FB.api('/me', function (response) {
            //            console.log('Good to see you, ' + response.name + '.');
            //        });
            //    } else {
            //        console.log('User cancelled login or did not fully authorize.');
            //    }
            //});
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));



    },
    facebookLogin: function () {
        social.facebookinit();
        

    },

    
    statusChangeCallback: function (response) {
      
        console.log('hy');
        console.log(response);

        if (response.status === 'connected') {

            testAPI();
        } else if (response.status === 'not_authorized') {

            document.getElementById('status').innerHTML = 'Please log ' +
              'into this app.';
        } else {

            document.getElementById('status').innerHTML = 'Please log ' +
              'into Facebook.';
        }
    }
}