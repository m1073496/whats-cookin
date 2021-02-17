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
    let missingIngredients = [];
    // console.log("recipe ingredients:", recipe.name, recipeIngredients);
    // console.log(this.userPantry);

    let pantryIngredients = this.userPantry.map(item => item.ingredient);
    // console.log('pantry ingredients:', this.userName, pantryIngredients);

    recipeIngredients.forEach(item => {
      const recipeAmount = item.amount;
      let pantryAmount;

      pantryIngredients.includes(item['id']) ? pantryAmount = this.userPantry.find(element => element['ingredient'] === item['id']).amount : pantryAmount = 0;

      const missingAmount = recipeAmount - pantryAmount;

      if (!pantryIngredients.includes(item['id'])) {
        missingIngredients.push(item);
      } else if (pantryAmount < recipeAmount) {
        const itemCopy = item;
        itemCopy.amount = missingAmount;
        missingIngredients.push(itemCopy);
      }
    });
    return missingIngredients;
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
