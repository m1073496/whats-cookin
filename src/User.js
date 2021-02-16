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
    // let pantryIngredients = this.userPantry.map(item => item.ingredient);
    //
    // let missingIngredients = recipeIngredients.map(item => {
    //   if(!pantryIngredients.includes(item)) {
    //     result.push(item);
    // }})
    // return result;


    let missingIngredients = recipeIngredients.filter(item => {
        if (!this.userPantry.includes(item.id)) {
          result.push(item);
        }
      })
    return result;
  }

};



if (typeof module !== 'undefined') {
  module.exports = User;
};
