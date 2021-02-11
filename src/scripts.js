var allRecipesButton = document.getElementById('all-recipes');
var landingView = document.querySelector('.landing-view');
var recipeDetailView = document.querySelector('.recipe-detail-view');
var featuredSections = document.querySelector('.featured-section');
var recipeDetailLeft = document.querySelector('.recipe-detail__bottom--left');
var recipeDetailRight = document.querySelector('.recipe-detail__bottom--right');


hide = (element) => element.classList.add('hidden');

display = (element) => element.classList.remove('hidden');

displayRecipeList = () => {
  console.log('This is working')
  hide(landingView);
  hide(featuredSections);

  display(recipeDetailView);
  display(recipeDetailLeft);
  display(recipeDetailRight);
}

allRecipesButton.addEventListener('click', displayRecipeList);
