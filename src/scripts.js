var allRecipesButton = document.getElementById('all-recipes');
var landingView = document.querySelector('.landing-view');
var recipeDetailView = document.querySelector('.recipe-detail-view');
var featuredSections = document.querySelector('.featured-section');
var recipeDetailLeft = document.querySelector('.recipe-detail__bottom--left');
var recipeDetailRight = document.querySelector('.recipe-detail__bottom--right');



allRecipesButton.addEventListener('click', displayRecipeList);

function displayRecipeList() {
  landingView.classList.add('hidden');
  featuredSections.classList.add('hidden');

  recipeDetailView.classList.remove('hidden');
  recipeDetailLeft.classList.remove('hidden');
  recipeDetailRight.classList.remove('hidden');
}
