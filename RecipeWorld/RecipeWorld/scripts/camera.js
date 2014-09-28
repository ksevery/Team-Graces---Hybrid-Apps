(function () {

    window.listView = kendo.observable({
        addImage: function () {

            var success = function (data) {
                var image = document.getElementById("pic");
                image.src = "data:image/jpeg;base64," + data;

                console.log(image.src)
            };

            var error = function () {
                navigator.notification.alert("Unfortunately we could not add the image");
            };

            var config = {
                destinationType: Camera.DestinationType.DATA_URL,
                targetHeight: 100,
                targetWidth: 100,
                encodingType: Camera.EncodingType.JPEG

            };

            navigator.camera.getPicture(success, error, config);
        }
    });

}())