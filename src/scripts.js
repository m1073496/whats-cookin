/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Global Variables~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const allRecipesButton = document.getElementById('all-recipes');
const landingView = document.querySelector('.landing-view');
const recipeDetailView = document.querySelector('.recipe-detail-view');
const landingSection1 = document.querySelector('.landing-content1');
const landingSection2 = document.querySelector('.landing-content2');
const recipeListView = document.querySelector('.list-view');
const recipeListContent1 = document.querySelector('.recipe-list-content1');
const recipeListContent2 = document.querySelector('.recipe-list-content2');
const recipeListTitle = document.querySelector('.recipe-list-h1');
const recipeDetailContent1 = document.querySelector('.recipe-detail__bottom--left');
const recipeDetailContent2 = document.querySelector('.recipe-detail__bottom--right');


let allRecipes;

window.addEventListener('load', function() {
  console.log('🥺');
  allRecipes = new RecipeRepository(recipeData);
  console.log(allRecipes);
  hide(searchError);
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Functions~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const hide = (element) => element.classList.add('hidden');

const display = (element) => element.classList.remove('hidden');

const displayRecipeList = () => {
  hide(landingView);
  hide(landingSection1);
  hide(landingSection2);

  display(recipeListView);
}

const displayAllRecipes = () => {
  displayRecipeList();
  recipeListTitle.innerText = "All";

  allRecipes.recipes.forEach(recipe => {
    let newRecipeItem = document.createElement('article');
    let parent = document.querySelector('.list-view')
    newRecipeItem.className = 'recipe content1';
    parent.appendChild(newRecipeItem);

    newRecipeItem.innerHTML += `
    <section class="item-container">
      <div class="recipe-list__item">
        <figure>
          <img class="pantry__recipe-profile--img"
               src="${recipe.image}"
               alt="${recipe.name}">
        </figure>
      </div>

      <div class="recipe-list__item cooked-button hidden">
        <button>Cooked It!</button>
        <span>message</span>
      </div>

      <div class="recipe-list__item">
        <span><i class="far fa-heart"></i></span>
        <span><i class="far fa-calendar-check"></i></span>
      </div>
    </section>

    <section class="recipe-list__item">
      <ul class="ingredients-and-cost">
        <li>
          <i class="fal fa-ellipsis-h"></i>${recipe.name}
        </li>
        <li>
          <i class="far fa-check-circle"></i>${recipe.ingredients[0].amount} ${recipe.ingredients[0].unit} ${recipe.ingredients[0].name}
        </li>
        <li>
          <i class="far fa-times-circle"></i>${recipe.ingredients[1].amount} ${recipe.ingredients[1].unit} ${recipe.ingredients[1].name}
        </li>
        <li>
          <i class="far fa-badge-dollar"></i>${recipe.getTotalCost()}
        </li>
      </ul>
    </section>
  `
  })
}

const displayRecipeDetailView = () => {
  hide(recipeListView);
  display(recipeDetailContent1);
  display(recipeDetailContent2);

  display(recipeDetailView);
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Event Listeners~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

allRecipesButton.addEventListener('click', displayAllRecipes);
recipeListView.addEventListener('click', displayRecipeDetailView);
// console.log('Hello world');
// const { recipeData } = require('../data/recipes');
//
// var singleInstruction = recipeData.filter(recipe => recipe.instructions.length < 2)
//
// console.log(singleInstruction);



/* 📌 Katie's Ticket 📌 */
const searchBarInput = document.querySelector('.search-bar');
const searchButton = document.querySelector('.search-button');	
const searchError = document.querySelector('.search-error');	


searchButton.addEventListener('click', function() {
  search(searchBarInput);
});

function search(input) {
  hide(searchError);
  const words = formatInput(input);
  console.log("formatted input: ", words);

  const foundIngredientRecipes = words.flatMap(word => {
    return allRecipes.filterByIngredient(word);
  });
  console.log("found ingredient recipes: ", foundIngredientRecipes);

  const foundNameRecipes = words.flatMap(word => {
    return allRecipes.filterByName(word);
  });
  console.log("found name recipes: ", foundNameRecipes);

  const foundRecipes = [...foundIngredientRecipes, ...foundNameRecipes];
  console.log("found recipes: ", foundRecipes);

  const result = removeDuplicates(foundRecipes);
  console.log("final result: ", result);

  if (result.length > 0) {
    displayRecipes(result);
  } else {
    display(searchError);
  }
}

function formatInput(input) {
  return input.value.toLowerCase().split(' ');
} 

function removeDuplicates(arr) {
  return [...new Set(arr)];
}

const displayRecipes = (recipeList) => {
  displayRecipeList();

  if (recipeList === 'allRecipes') {
    recipeListTitle.innerText = "All recipes";
  } else if (recipeList === 'searchResults') {
    recipeListTitle.innerText = "Search results";
  }

  recipeList.forEach(recipe => {
    let newRecipeItem = document.createElement('article');
    let parent = document.querySelector('.list-view')
    newRecipeItem.className = 'recipe content1';
    parent.appendChild(newRecipeItem);

    newRecipeItem.innerHTML += `
    <section class="item-container">
      <div class="recipe-list__item">
        <figure>
          <img class="pantry__recipe-profile--img"
               src="${recipe.image}"
               alt="${recipe.name}">
        </figure>
      </div>

      <div class="recipe-list__item cooked-button hidden">
        <button>Cooked It!</button>
        <span>message</span>
      </div>

      <div class="recipe-list__item">
        <span><i class="far fa-heart"></i></span>
        <span><i class="far fa-calendar-check"></i></span>
      </div>
    </section>

    <section class="recipe-list__item">
      <ul class="ingredients-and-cost">
        <li>
          <i class="fal fa-ellipsis-h"></i>${recipe.name}
        </li>
        <li>
          <i class="far fa-check-circle"></i>${recipe.ingredients[0].amount} ${recipe.ingredients[0].unit} ${recipe.ingredients[0].name}
        </li>
        <li>
          <i class="far fa-times-circle"></i>${recipe.ingredients[1].amount} ${recipe.ingredients[1].unit} ${recipe.ingredients[1].name}
        </li>
        <li>
          <i class="far fa-badge-dollar"></i>${recipe.getTotalCost()}
        </li>
      </ul>
    </section>
  `
  })
}