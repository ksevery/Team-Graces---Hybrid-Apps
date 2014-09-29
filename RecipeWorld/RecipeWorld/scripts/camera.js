var app = app || {}

app.Camera = (function () {
    var everlive = new Everlive("UaQVFmYbtMPgqUG0");

    var cameraModel = function () {
       window.listView = kendo.observable({
            addImage: function () {


                var success = function (data) {
                    everlive.Files.create({
                        Filename: Math.random().toString(36).substring(2, 15) + ".jpg",
                        ContentType: "image/jpeg",
                        base64: data
                    })
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
    }  

    kendo.bind($("#add-recipe"), cameraModel);
    return cameraModel;
}())