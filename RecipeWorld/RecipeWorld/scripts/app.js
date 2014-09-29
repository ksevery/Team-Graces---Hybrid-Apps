window.app = (function (win) {
    var emptyGuid = '00000000-0000-0000-0000-000000000000';
    var onDeviceReady = function () {
        // Handle "backbutton" event
        document.addEventListener('backbutton', onBackKeyDown, false);

        navigator.splashscreen.hide();
        fixViewResize();
    };

    document.addEventListener('deviceready', onDeviceReady, true);

    var showAlert = function (message, title, callback) {
        navigator.notification.alert(message, callback || function () {
        }, title, 'OK');
    };

    var showError = function (message) {
        showAlert(message, 'Error occured');
    };

    //win.addEventListener('error', function (e) {
    //    e.preventDefault();

    //    var message = e.message + "' from " + e.filename + ":" + e.lineno;

    //    showAlert(message, 'Error occured');

    //    return true;
    //});

    var isNullOrEmpty = function (value) {
        return typeof value === 'undefined' || value === null || value === '';
    };

    var isKeySet = function (key) {
        var regEx = /^\$[A-Z_]+\$$/;
        return !isNullOrEmpty(key) && !regEx.test(key);
    };

    var fixViewResize = function () {
        if (device.platform === 'iOS') {
            setTimeout(function () {
                $(document.body).height(window.innerHeight);
            }, 10);
        }
    };

    var onBackKeyDown = function (e) {
        e.preventDefault();

        navigator.notification.confirm('Do you really want to exit?', function (confirmed) {
            var exit = function () {
                navigator.app.exitApp();
            };

            if (confirmed === true || confirmed === 1) {
                AppHelper.logout().then(exit, exit);
            }
        }, 'Exit', ['OK', 'Cancel']);
    };

    var el = new Everlive({
        apiKey: 'UaQVFmYbtMPgqUG0',
        scheme: 'http',
        token: window.token || ''
    });

    var AppHelper = {
        // Return user profile picture url
        resolveRecipePictureUrl: function (id) {
            if (id && id !== emptyGuid) {
                return el.Files.getDownloadUrl(id);
            } else {
                return 'styles/images/default.jpg';
            }
        },

        // Return current activity picture url
        resolvePictureUrl: function (id) {
            if (id && id !== emptyGuid) {
                return el.Files.getDownloadUrl(id);
            } else {
                return '';
            }
        },

        // Date formatter. Return date in d.m.yyyy format
        formatDate: function (dateString) {
            return kendo.toString(new Date(dateString), 'MMM d, yyyy');
        },

        // Current user logout
        logout: function () {
            return el.Users.logout();
        }
    };
    var mobileApp = new kendo.mobile.Application(document.body, {
        transition: 'slide',
        skin: 'flat'
    })

    return {
        showAlert: showAlert,
        showError: showError,
        //showConfirm: showConfirm,
        isKeySet: isKeySet,
        mobileApp: mobileApp,
        helper: AppHelper,
        everlive: el,
        //getYear: getYear
        }
})(window);