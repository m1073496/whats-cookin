const Recipe = require('../src/Recipe');

class RecipeRepository {
  constructor(data) {
    this.recipes = data.map(recipe => new Recipe(recipe));
    this.foundRecipes = []
  }

  filterByTag(searchTerm) {
    return this.recipes.filter(recipe => {
      if (recipe.tags.includes(searchTerm)) {
        return recipe.id;
      }
    })
  }

  filterByIngredient(searchTerm) {
    return this.recipes.filter(recipe => {
      return recipe.ingredients.find(ingredient => {
        return ingredient.name === searchTerm
      })
    })
  }
}

if (typeof module !== 'undefined') {
  module.exports = RecipeRepository
}
