var app = app || {};

app.Recipes = (function () {
    var recipesModel = (function () {
        var currentRecipe = kendo.observable({ data: null });
        var recipesData = [];

        var recipeModel = {

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
                Picture: {
                    fields: 'Picture',
                    defaultValue: null
                },
                Products: {
                    fields: 'Products',
                    defaultValue: null
                }
            },
            CreatedAtFormatted: function () {

                return app.helper.formatDate(this.get('CreatedAt'));
            },
            PictureUrl: function () {

                return app.helper.resolvePictureUrl(this.get('Picture'));
            },
            ProductsData: function () {
                var productsIds = this.get('Products');

                var products = [];
                for (var i = 0; i < productsIds.length; i++) {
                    var product = app.Products.products.filter({
                        field: 'Id',
                        operator: 'eq',
                        value: productsIds[i]
                    });

                    if (product) {
                        products.push(product);
                    }
                }

                return products;
            }
        };

        var loadRecipes = function () {
            return app.everlive.data('Recipes').get()
            .then(function (data) {
                var currentRecipesData = data.result;
                for (var i = 0; i < currentRecipesData.length; i++) {
                    var currentRecipeData = currentRecipesData[i];
                    currentRecipeData.PictureUrl = app.helper.resolveRecipePictureUrl(currentRecipeData.Picture);
                    currentRecipe.set('data', currentRecipeData);

                    recipesData.push(currentRecipeData);
                }

                return recipesData;
            })
            .then(null, function (err) {
                app.showError(err.message)
            });
        };

        var recipesDataSource = new kendo.data.DataSource({
            type: 'everlive',
            schema: {
                model: recipeModel
            },
            data: 'data',
            transport: {
                // Required by Backend Services
                typeName: 'Recipes'
            },
            sort: { field: 'CreatedAt', dir: 'desc' }
        });

        recipesDataSource.read();

        var recipeSelected = function (e) {

            app.mobileApp.navigate('views/recipe-view.html?uid=' + e.data.Id);
        };

        return {
            load: loadRecipes,
            recipes: function () {
                return recipesData;
            },
            currentRecipe: currentRecipe,
            recipeSelected: recipeSelected,
            recipesData: recipesDataSource
        };
    })();
    
    kendo.bind($('recipes'), recipesModel);
    return recipesModel;
})();