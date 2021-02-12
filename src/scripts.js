const allRecipesButton = document.getElementById('all-recipes');
const landingView = document.querySelector('.landing-view');
// const recipeDetailView = document.querySelector('.recipe-detail-view');
const featuredSections = document.querySelector('.featured-section');
const recipeListView = document.querySelector('.list-view');
const recipeListLeft = document.querySelector('.recipe-list__item');
// const recipeListRight = document.querySelector('.recipe-list__item content2');


hide = (element) => element.classList.add('hidden');

display = (element) => element.classList.remove('hidden');

displayRecipeList = () => {
  console.log('This is working')
  hide(landingView);
  hide(featuredSections);

  display(recipeListView);
  display(recipeListLeft);
  // display(recipeListRight);
}

allRecipesButton.addEventListener('click', displayRecipeList);



const searchBarInput = document.querySelector('.search-bar');
const searchButton = document.querySelector('.search-button');



searchButton.addEventListener('click', function() {
  search(searchBarInput);
});

function search(input) {
  const words = formatInput(input);

  // TODO: need to import RecipeRepository? Assign const allRecipes = recipeRepository.recipes?
  // for each word, run filter by ingredient (recipe repository method)
    // (will return array of recipe objects for each ingredient)
  const foundRecipes = words.map(word => {
    return allRecipes.filterByIngredient(word);
  });



  // use array.flat() to flatten the result into a single array of recipe objects
    // (the flat method will remove any empty arrays if any word mapped to an empty array b/c no results)
  // remove duplicates
  // if array has anything in it,
    // return resulting array of unique recipe objects
    // else return error message saying the search got no results
}

function formatInput(input) {
  return input.toLowerCase().split(' ');
}