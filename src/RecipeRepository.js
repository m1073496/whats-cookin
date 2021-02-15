// const Recipe = require('./Recipe');

class RecipeRepository {
  constructor(data) {
    this.recipes = data.map(recipe => new Recipe(recipe));
  }

  filterByTag(searchTerms) {
    const results = [];
    for (let i = 0; i < searchTerms.length; i++) {
      this.recipes.filter(recipe => {
        if (recipe.tags.includes(searchTerms[i].toLowerCase())) {
          // question for the group
          // TODO need to remove the ".id" here?? 
          // so that it will return entire Recipe object, not just id
          // (Katie removed the ".id" in the scripts.js version)
          results.push(recipe.id);
        }
      })
    }

    return [...new Set(results)];
  }

  filterByIngredient(searchTerm) {
    return this.recipes.filter(recipe => {
      return recipe.ingredients.find(ingredient => {
        return ingredient.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
  }

  filterByName(searchTerm) {
    return this.recipes.filter(recipe => {
      return recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }
}

if (typeof module !== 'undefined') {
  module.exports = RecipeRepository;
}
