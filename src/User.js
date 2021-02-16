const RecipeRepository = require('../src/RecipeRepository');

class User {
  constructor(user) {
    this.userName = user.name;
    this.userId = user.id;
    this.userPantry = user.pantry;
    this.favoriteRecipes = new RecipeRepository([]);
    this.recipesToCook = [];
  }

  updateFavorites = (recipeInstance) => {
    if(this.favoriteRecipes.recipes.includes(recipeInstance)) {
      let indexToRemove = this.favoriteRecipes.recipes.indexOf(recipeInstance);
      this.favoriteRecipes.recipes.splice(indexToRemove, 1);
    } else {
      this.favoriteRecipes.recipes.push(recipeInstance);
    }
  };

  updateCookList = (recipe) => {
    if(this.recipesToCook.includes(recipe)) {
      let indexToRemove = this.recipesToCook.indexOf(recipe);
      this.recipesToCook.splice(indexToRemove, 1);
    } else {
      this.recipesToCook.push(recipe);
    }
  };

  filterFavorites = (searchTerm) => {
    return this.favoriteRecipes.findRecipes(searchTerm);
  };

  findMissingIngredients = (recipe) => {
    let recipeIngredients = recipe.ingredients;
    let result = [];
    // console.log("recipe ingredients:", recipe.name, recipeIngredients);
    // console.log(this.userPantry);

    let pantryIngredients = this.userPantry.map(item => item.ingredient);
    // console.log('pantry ingredients:', this.userName, pantryIngredients);

    let missingIngredients = recipeIngredients.forEach(item => {
      // console.log(item);
      if(!pantryIngredients.includes(item['id'])) {
        result.push(item);
    }});
    return result;
  }

  cookMeal = (recipe) => {
    // console.log(this.findMissingIngredients(recipe))
    if (this.findMissingIngredients(recipe).length === 0) {
      let ingredientsToRemoveFromPantry = this.findMissingIngredients(recipe);
      let ingredientIndexes = ingredientsToRemoveFromPantry.map(item => {
        ingredientsToRemoveFromPantry.indexOf(item);
      });
      this.userPantry.forEach(item => {
        this.userPantry.splice(ingredientsToRemoveFromPantry.forEach(ingredient => ingredient[ingredientIndexes]))
      });
      let recipeToRemove = this.recipesToCook.indexOf(recipe);
        this.recipesToCook.splice(recipeToRemove, 1);
    }
  };
};

if (typeof module !== 'undefined') {
  module.exports = User;
};
