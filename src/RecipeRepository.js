class RecipeRepository {
  constructor(recipeInstances) {
    this.recipes = recipeInstances;
  }

  filterByTags = (searchTags) => {
    const results = [];
    for (let i = 0; i < searchTags.length; i++) {
      this.recipes.filter(recipe => {
        if (recipe.tags.includes(searchTags[i].toLowerCase())) {
          results.push(recipe);
        }
      })
    }
    return [...new Set(results)];
  }

  filterByIngredient = (searchIng) => {
    return this.recipes.filter(recipe => {
      return recipe.ingredients.find(ingredient => {
        return ingredient.name.toLowerCase().includes(searchIng.toLowerCase());
      });
    });
  }

  filterByName = (searchName) => {
    return this.recipes.filter(recipe => {
      return recipe.name.toLowerCase().includes(searchName.toLowerCase());
    });
  }

  findRecipes = (words) => {
    const foundIngredientRecipes = words.flatMap(word => {
      return this.filterByIngredient(word);
    });

    const foundNameRecipes = words.flatMap(word => {
      return this.filterByName(word);
    });

    const foundTagRecipes = words.flatMap(word => {
      return this.filterByTags([word]);
    });

    const foundRecipes = [...foundIngredientRecipes, ...foundNameRecipes, ...foundTagRecipes];

    const results = this.removeDuplicates(foundRecipes);
    // console.log("results in class file: ", results);

    const resultsRepository = new RecipeRepository(results);
    // console.log("resultsRepository in class file: ", results);
    return resultsRepository;
  }

  removeDuplicates = (arr) => {
    return [...new Set(arr)];
  }
}




if (typeof module !== 'undefined') {
  module.exports = RecipeRepository;
}
