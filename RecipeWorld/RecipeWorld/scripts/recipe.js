var app = app || {};

app.Recipe = (function () {

    var $productsContainer,
        listScroller;
    var recipeModel = (function () {
        var recipeUid,
            recipe,
            $recipePicture;

        var init = function () {
            $productsContainer = $('#recipeProducts');
            $recipePicture = $('#recipe-image');
        };

        var show = function (e) {

            $productsContainer.empty();

            listScroller = e.view.scroller;
            listScroller.reset();

            recipeId = e.view.params.uid;
            console.log(app.Recipes.recipesData);
            // Get current recipe (based on item uid) from Recipes model
            recipe = app.Recipes.recipesData.get(recipeId);
            $recipePicture[0].style.display = recipe.Picture ? 'block' : 'none';

            kendo.bind(e.view.element, recipe, kendo.mobile.ui);
        };

        return {
            init: init,
            show: show,
            recipe: function () {
                return recipe;
            }
        }
    })();

    kendo.bind($('#recipe'), recipeModel);
    return recipeModel;
})();