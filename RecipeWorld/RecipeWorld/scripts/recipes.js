var app = app || {};

app.Recipes = (function () {
    var recipesModel = (function () {
        var currentRecipe = kendo.observable({ data: null });
        var recipesData = [];

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

        return {
            load: loadRecipes,
            recipes: function () {
                return recipesData;
            },
            currentRecipe: currentRecipe
        };
    })();
    
    //console.log(recipesModel.recipes());
    kendo.bind($('recipes'), recipesModel);
    return recipesModel;
})();