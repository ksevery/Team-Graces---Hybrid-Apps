var app = app || {};

app.Login = (function () {
    'use strict';
    var isInMistSimulator = (location.host.indexOf('icenium.com') > -1);

    var $loginUsername;
    var $loginPassword;
    $loginUsername = $('#loginUsername');
    $loginPassword = $('#loginPassword');

    var show = function () {
        $loginUsername.val('');
        $loginPassword.val('');
    };
    window.loginViewModel = kendo.observable({
            // Authenticate to use Backend Services as a particular user
            login: function () {
                console.log('Aaaaaaaaaaaaaaaaaaaa!');

                var username = $loginUsername.val();
                var password = $loginPassword.val();

                // Authenticate using the username and password
                app.everlive.Users.login(username, password)
                .then(function () {
                    return app.Recipes.load();
                })
                .then(function () {

                    app.mobileApp.navigate('views/recipes-view.html');
                })
                .then(null,
                      function (err) {
                          app.showError(err.message);
                      }
                );
            
            console.log('Aaaaaaaaaaaaaaaaaaaa!');
        }
    });

}());