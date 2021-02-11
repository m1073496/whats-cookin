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
