// const Recipe = require('./Recipe');

class RecipeRepository {
  constructor(data) {
    this.recipes = data.map(recipe => new Recipe(recipe));
  }

  filterByTag(searchTerm) {
    return this.recipes.filter(recipe => {
      if (recipe.tags.includes(searchTerm.toLowerCase())) {
        return recipe.id;
      }
    })
  }

  filterByIngredient(searchTerm) {
    return this.recipes.filter(recipe => {
      return recipe.ingredients.find(ingredient => ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()))
    })
  }

  filterByName(searchTerm) {
    return this.recipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
}

if (typeof module !== 'undefined') {
  module.exports = RecipeRepository;
}
