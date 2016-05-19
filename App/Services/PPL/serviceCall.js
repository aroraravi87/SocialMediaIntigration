//common function to call the POST services.
function doPost($http, datatopost, address, callback) {
  // alert(address);
    $http({
        method: "POST",
        url: address,
        data: datatopost,
        respondType: "json",
        headers: { 'Content-Type': 'application/json' }
        //headers: { 'Content-Type': "application/x-www-form-urlencoded" },
    })
    .success(function (data, status, headers, config) {
       // alert(JSON.stringify(data));
        callback(data, status);
        
    })
    .error(function (data, status, headers, config) {
        //badRequest(status, callback, data, headers);
       // alert(JSON.stringify(data));
        callback(data, status);
        
    });
};

//common function to call the PUT services.
function doPut($http, datatopost, address, callback) {
        $http({
        method: "PUT",
        url: address,
        data: datatopost,
        respondType: "json",
        headers: { 'Content-Type': 'application/json' }
        //headers: { 'Content-Type': "application/x-www-form-urlencoded" },
    })
    .success(function (data, status, headers, config) {
         callback(data, status);
    })
    .error(function (data, status, headers, config) {
        //badRequest(status, callback, data, headers);
        callback(data, status);
    });
};

//common function to call the POST services for login.
function doPostLogin($http, headerData, address, callback) {

    $http({
        method: "POST",
        url: address,
        //data: datatopost,
        respondType: "json",
        headers: { 'Content-Type': 'application/json', 'username': headerData.username, 'password': headerData.password }
        //headers: { 'Content-Type': "application/x-www-form-urlencoded" },
    })
    .success(function (data, status, headers, config) {
        callback(data, status);
    })
    .error(function (data, status, headers, config) {
        //badRequest(status, callback, data, headers);
        callback(data, status);
    });
};


//common function to call the Get services.
function doGet($http, datatopost, address, callback) {
        $http({
        method: "GET",
        url: address,
        data: datatopost,
        respondType: "json",
        headers: { 'Content-Type': 'application/json' }
      })
    .success(function (data, status, headers, config) {
        callback(data, status);
    })
    .error(function (data, status, headers, config) {
          callback(data, status);
    });
};