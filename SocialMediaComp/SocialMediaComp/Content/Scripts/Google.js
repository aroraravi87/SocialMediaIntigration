//Place this asynchronous JavaScript just before your </body> tag -->


//<script type="text/javascript">
    (function () {
        var po = document.createElement('script');
        po.type = 'text/javascript'; po.async = true;
        po.src = 'https://apis.google.com/js/client:plusone.js?onload=render';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(po, s);
    })();

function render() {
   
    gapi.signin.render('customBtn', {
        'callback': 'onSignInCallback',
        'clientid': document.getElementById('googleAppID').value,
       //'clientid': '885799406807-otc9n9vql317gumchrue44q89la9s8jq.apps.googleusercontent.com', //server
       // 'clientid': '266730670400-t4cs1196diaglm4nclkinfrdc3edqeed.apps.googleusercontent.com',//localhost
        'cookiepolicy': 'single_host_origin',
        'requestvisibleactions': 'http://schemas.google.com/AddActivity',
        'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
    });
}


//</script>
