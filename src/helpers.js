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

const splitInput = (input) => {
  return input.value.split(' ');
}

const removeDuplicates = (arr) => {
  return [...new Set(arr)];
}
