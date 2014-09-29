/// <reference path="../kendo/js/jquery.min.js" />
(function () {
    document.addEventListener("deviceready", onDeviceReady, false);
    //device APIs are available

    function onDeviceReady() {
        navigator.accelerometer.watchAcceleration(onSuccess, onError, { frequency: 100 });
        $("#s").hide()
    }

    var watchId = navigator.accelerometer.watchAcceleration(onSuccess, onError, { frequency: 100 });
    // onSuccess: Get a snapshot of the current acceleration

    function onSuccess(acceleration) {
        var t = $("#t");
        //t.html(acceleration.x + " " + acceleration.y + " " + acceleration.z);
        var currentAcc = 1;
        if (acceleration.x < -10 || acceleration.x > 10) {
            t.hide();
            $("#s").show();

            navigator.accelerometer.clearWatch(watchId);
        }
    }

    // onError: Failed to get the acceleration
    //
    function onError() {
        $("#t").html("error")
    }

}())