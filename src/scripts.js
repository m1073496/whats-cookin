/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Global Variables~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const allRecipesButton = document.getElementById('all-recipes');
const landingView = document.querySelector('.landing-view');
// const recipeDetailView = document.querySelector('.recipe-detail-view');
const landingSection1 = document.querySelector('.landing-content1');
const landingSection2 = document.querySelector('.landing-content2');
const recipeListView = document.querySelector('.list-view');
const recipeListContent1 = document.querySelector('.recipe-list-content1');
const recipeListContent2 = document.querySelector('.recipe-list-content2');
const recipeListTitle = document.querySelector('.recipe-list-h1');

let allRecipes;

window.addEventListener('load', function() {
  console.log('🥺');
  allRecipes = new RecipeRepository(recipeData);
  console.log(allRecipes);
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Functions~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const hide = (element) => element.classList.add('hidden');

const display = (element) => element.classList.remove('hidden');

const displayRecipeList = () => {
  hide(landingView);
  hide(landingSection1);
  hide(landingSection2);

  display(recipeListView);
  display(recipeListContent1);
  display(recipeListContent2);

  recipeListTitle.innerText = "All";

  console.log(allRecipes);

}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Event Listeners~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

allRecipesButton.addEventListener('click', displayRecipeList);
// console.log('Hello world');
// const { recipeData } = require('../data/recipes');
//
// var singleInstruction = recipeData.filter(recipe => recipe.instructions.length < 2)
//
// console.log(singleInstruction);
