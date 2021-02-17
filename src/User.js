// const RecipeRepository = require('../src/RecipeRepository');

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
    console.log("recipe ingredients:", recipeIngredients);
    // console.log(this.userPantry);





    let pantryIngredients = this.userPantry.map(item => item.ingredient);
    console.log('pantry ingredient:', pantryIngredients);

    let missingIngredients = recipeIngredients.forEach(item => {
      // console.log(item);
      if(!pantryIngredients.includes(item['id'])) {
        result.push(item);
    }})
    return result;

    //I need to match recipe ingredient items with pantry ingredient items by id
    //Then I need to compare those two things by amount -- pantry item amount must be larger or equal to recipe item amount
    //If the recipe ingredient id cannot be found in pantry, push that recipe item/amount
    //If id is there but the recipe ingredient amount is larger, then push that recipe item/amount --> push the difference between the amounts

    // let ingredientsMissing = []; /* compare recipe ingredient ids with  pantry ingredient ids, store recipe ingredients that are missing, then compare found ingredients with */
    //
    // recipeIngredients.forEach(ingredient => {
    //   if(!this.userPantry.includes(ingredient)) {
    //     ingredientsMissing.push(ingredient);
    //   }
    //
    //   console.log(ingredientsMissing);
  }


    // if (/* recipe ingredient is NOT in pantry OR recipe ingredient is in pantry but recipe ingredient amount is smaller or equal to pantry ingredient amount*/) {
    //   //push that recipe item into the result
    //   //result should contain only items that pantry does not have or does not have enough of
    // }

    //   if (item !== find.!recipeIngredients.includes(this.userPantry.includes(item['id'])) {
    //     console.log(item['id']);
    //   }
    // })

    // let missingIngredients = recipeIngredients.filter(item => {
    //     if (!this.userPantry.includes(item.id) && this.userPantry) {
    //       result.push(item);
    //     }
    //   })
    // return result;

  cookMeal = (recipe) => {
    if (this.findMissingIngredients(recipe)) {
      let ingredientsToRemoveFromPantry = this.findMissingIngredients(recipe);
      let ingredientIndexes = ingredientsToRemoveFromPantry.map(item => {
        ingredientsToRemoveFromPantry.indexOf(item);
      })
      this.userPantry.forEach(item => {
        this.userPantry.splice(ingredientsToRemoveFromPantry.forEach(ingredient => ingredient[ingredientIndexes]))
      })
      let recipeToRemove = this.recipesToCook.indexOf(recipe);
        this.recipesToCook.splice(recipeToRemove, 1);
    }

  };
};

if (typeof module !== 'undefined') {
  module.exports = User;
};
