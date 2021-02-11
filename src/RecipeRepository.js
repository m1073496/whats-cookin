
const { ingredientsData } = require('../data/ingredients');
const Recipe = require('../src/Recipe');

class RecipeRepository {
  constructor(data) {
    this.recipes = data.map(recipe => new Recipe(recipe));
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
