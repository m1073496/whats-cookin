const allRecipesButton = document.getElementById('all-recipes');
const landingView = document.querySelector('.landing-view');
// const recipeDetailView = document.querySelector('.recipe-detail-view');
const featuredSection1 = document.querySelector('.featured-content1');
const featuredSection2 = document.querySelector('.featured-content2');
const recipeListView = document.querySelector('.list-view');
const recipeListContent1 = document.querySelector('.recipe-list-content1');
const recipeListContent2 = document.querySelector('.recipe-list-content2');



hide = (element) => element.classList.add('hidden');

display = (element) => element.classList.remove('hidden');

displayRecipeList = () => {
  hide(landingView);
  hide(featuredSection1);
  hide(featuredSection2);

  display(recipeListView);
  display(recipeListContent1);
  display(recipeListContent2);
}

allRecipesButton.addEventListener('click', displayRecipeList);
