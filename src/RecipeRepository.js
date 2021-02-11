
const { ingredientsData } = require('../data/ingredients');

class RecipeRepository {
  constructor(data) {
    this.recipes = data
  }

  filterByTag(searchTerm) {
    return this.recipes.filter(recipe => {
      if (recipe.tags.includes(searchTerm)) {
        return recipe.id;
      }
    })
  }

  filterByIngredient(searchTerm) {
    // todo ==> this isn't working yet.
    return this.recipes.filter(recipe => {
      return recipe.ingredients.id.includes(searchTerm)
    })
  }

  getIngredientName(id) {
    const match = ingredientsData.find(ingredient => {
      return ingredient.id === id;
    });

    return match.name;
  }
}

if (typeof module !== 'undefined') {
  module.exports = RecipeRepository
}
