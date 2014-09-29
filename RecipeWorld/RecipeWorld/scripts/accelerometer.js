/// <reference path="../kendo/js/jquery.min.js" />
(function () {
    document.addEventListener("deviceready", onDeviceReady, false);
    

   function onDeviceReady() {
       navigator.accelerometer.watchAcceleration(onSuccess, onError, { frequency: 100 });
       var salad = $('#recipe-image-products')
        salad.hide();
    }
  
    

    var watchId = navigator.accelerometer.watchAcceleration(onSuccess, onError, { frequency: 100 });
    

    function onSuccess(acceleration) {
        var products = $("#recipeContent");
       
        if (acceleration.x < -10 || acceleration.x > 10) {
            products.hide();
            salad.show();

            navigator.accelerometer.clearWatch(watchId);
        }
        setTimeout(function () {
            products.show('slow')
        }, 2000)
    }
    function onError() {
        //navigator.notification.alert("Error!")
    }

}())