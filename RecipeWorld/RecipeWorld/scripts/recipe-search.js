var app = app || {};

app.Search = (function () {
    var searchView = kendo.observable({
        selectedProducts: [],
        products: function () {
            return app.Products.products.data();
        },
        addProductToList: function (e) {
            console.log(e);
        }
    });

    kendo.bind($('#search'), searchView);
    return searchView;
})();