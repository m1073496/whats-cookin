console.log('🤩');

const filterByTags = (searchTags, recipes) => {
  const results = [];
  for (let i = 0; i < searchTags.length; i++) {
    recipes.filter(recipe => {
      if (recipe.tags.includes(searchTags[i].toLowerCase())) {
        results.push(recipe);
      }
    })
  }

  return [...new Set(results)];
}

const filterByIngredient = (searchIng, recipes) => {
  return recipes.filter(recipe => {
    return recipe.ingredients.find(ingredient => {
      return ingredient.name.toLowerCase().includes(searchIng.toLowerCase());
    });
  });
}

const filterByName = (searchName, recipes) => {
  return recipes.filter(recipe => {
    return recipe.name.toLowerCase().includes(searchName.toLowerCase());
  });
}

//helper function
//clean and format data collected
const splitInput = (input) => {
  return input.value.split(' ');
}

const removeDuplicates = (arr) => {
  return [...new Set(arr)];
}

const findRecipes = (words, recipes) => {
  const foundIngredientRecipes = words.flatMap(word => {
    return filterByIngredient(word, recipes);
  });
  // console.log("found ingredient recipes: ", foundIngredientRecipes);

  const foundNameRecipes = words.flatMap(word => {
    return filterByName(word, recipes);
  });
  // console.log("found name recipes: ", foundNameRecipes);

  const foundTagRecipes = words.flatMap(word => {
    return filterByTags([word], recipes);
  });
  // console.log("found tag recipes: ", foundTagRecipes);

  //combines each array into one big ole arrays
  const foundRecipes = [...foundIngredientRecipes, ...foundNameRecipes, ...foundTagRecipes];
  // console.log("found recipes: ", foundRecipes);

  const result = removeDuplicates(foundRecipes);
  console.log("final result: ", result);
  return result;
}
