var app = app || {};

app.Products = (function () {
    var productsViewModel = (function () {
        var productModel = {
            id: 'Id',
            fields: {
                Name: {
                    field: 'Name',
                    defaultValue: ''
                },
                CreatedAt: {
                    field: 'CreatedAt',
                    defaultValue: new Date()
                },
                Recipes: {
                    field: 'Recipes',
                    defaultValue: null
                },
                Picture: {
                    field: 'Picture',
                    defaultValue: null
                }
            },
            PictureUrl: function () {
                return app.helper.resolvePictureUrl(this.get('Picture'));
            },
            RecipesData: function () {
                var recipesIds = this.get('Recipes');

                var recipes = [];
                var recipesData = app.Products.products.data();
                var recipesDataIds = app.getDataIds(recipesData);
                for (var i = 0; i < recipesIds.length; i++) {
                    var recipeIndex = recipesDataIds.indexOf(recipesIds[i]);

                    if (recipeIndex !== -1) {
                        recipes.push(recipesData[recipeIndex]);
                    }
                }

                return products;
            }
        }

        var productsDataSource = new kendo.data.DataSource({
            type: 'everlive',
            schema: {
                model: productModel
            },
            data: 'data',
            transport: {
                typeName: 'Products'
            },
            serverFiltering: true,
            //change: function (e) {

            //    if (e.items && e.items.length > 0) {
            //        $('#recipeProducts').kendoMobileListView({
            //            dataSource: e.items,
            //            template: kendo.template($('#productsTemplate').html())
            //        });
            //    } else {
            //        $('#recipeProducts').empty();
            //    }
            //},
            sort: { field: 'CreatedAt', dir: 'desc' }
        });

        productsDataSource.read();

        return {
            products: productsDataSource
        }
    })()

    return productsViewModel;
})();