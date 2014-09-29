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

    $(document).on('click', '.available-product', function (e) {
        var $this = $(this);
        var productName = $this.context.innerText;

        if ($this.hasClass('is-selected')) {
            $this.removeClass('is-selected');
        }
        else {
            $this.addClass('is-selected');
        }

        console.log($this);
    })
    kendo.bind($('#search'), searchView);
    return searchView;
})();