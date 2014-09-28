var app = app || {};

app.Login = (function () {
    'use strict';
    //var isInMistSimulator = (location.host.indexOf('icenium.com') > -1);

    var $loginUsername;
    var $loginPassword;
    $loginUsername = $('#loginUsername');
    $loginPassword = $('#loginPassword');

    var loginViewModel = kendo.observable({
            // Authenticate to use Backend Services as a particular user
        login: function () {

            var username = $loginUsername.val();
            var password = $loginPassword.val();

            // Authenticate using the username and password
            app.everlive.Users.login(username, password)
            .then(function () {
                window.token = app.everlive.token;

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
        }
    });

    kendo.bind($('#login-btn'), loginViewModel);

}());