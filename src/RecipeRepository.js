// const Recipe = require('./Recipe');

class RecipeRepository {
  constructor(data) {
    this.recipes = data.map(recipe => new Recipe(recipe));
  }

  filterByTag(searchTerms) {
    const results = [];
    for (let i = 0; i < searchTerms.length; i++) {
      this.recipes.filter(recipe => {
        if (recipe.tags.includes(searchTerms[i])) {
          results.push(recipe.id);
        }
      })
    }

    return [...new Set(results)];
  }

  filterByIngredient(searchTerm) {
    return this.recipes.filter(recipe => {
      return recipe.ingredients.find(ingredient => ingredient.name.includes(searchTerm))
    })
  }

  filterByName(searchTerm) {
    return this.recipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
}

if (typeof module !== 'undefined') {
  module.exports = RecipeRepository;
}



// function matchTerm(matches, term) {
//   return this.recipes.filter(recipe => {
//     if (recipe.tags.includes(term)) {
//       return matches.push(recipe.id);
//     }
//   })
// }
//
//
// const totalMatches = searchTerms.reduce(matchTerm, [])
// console.log('total matches', totalMatches)
// return totalMatches
