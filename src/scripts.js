/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Global Variables~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const allRecipesButton = document.getElementById('all-recipes');
const landingView = document.querySelector('.landing-view');
const recipeDetailView = document.querySelector('.recipe-detail-view');
const recipeListView = document.querySelector('.list-view');
const recipeListContent1 = document.querySelector('.recipe-list-content1');
const recipeListContent2 = document.querySelector('.recipe-list-content2');
const recipeListTitle = document.querySelector('.recipe-list-title');
const recipeTitle = document.querySelector('.recipe-title');
const recipeInstructions = document.querySelector('.instructions-details')
const recipeDetailImage = document.querySelector('.detail-section__recipe-profile--img');
const ingredientsDetailList = document.querySelector('.ingredients-list');
const searchBarInput = document.querySelector('.search-bar');
const searchButton = document.querySelector('.search-button');
const searchError = document.querySelector('.search-error');
const dropdownSelection = document.querySelector('#tag-selector');
const goButton = document.getElementById('go')


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
  display(recipeListView);
}

const displayRecipeDetailView = () => {
  hide(recipeListView);
  display(recipeDetailView);
}

const displayRecipes = (recipeList, title) => {
  displayRecipeList();
  recipeListTitle.innerText = title;

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

const displayRecipe = (id) => {
  displayRecipeDetailView();
  let foundRecipe = allRecipes.recipes.find(recipe => {
    return recipe.id === parseInt(id);
  });

  recipeTitle.innerText = foundRecipe.name;
  recipeDetailImage.innerHTML = `
    <img src="${foundRecipe.image}" alt="${foundRecipe.name}">
    <figcaption>Meal cost: $${foundRecipe.getTotalCost()}</figcaption>
  `;
  foundRecipe.ingredients.forEach(ingredient => {
    ingredientsDetailList.innerHTML += `
      <article class="ingredients__item">
        <i class="far fa-times-circle"></i>
        ${ingredient.amount} ${ingredient.unit} ${ingredient.name} <span class="ingredients__message">You'll need xyz more of this.</span>
      </article>
    `;
  })
  foundRecipe.instructions.forEach(instruction => {
    recipeInstructions.innerHTML += `
      <li>${instruction.number}. ${instruction.instruction}</li>
    `;
  })
}


// *** START Nikki's work ***

// TODO compare with Katie stuff; maybe merge/refactor/etc.
const getSearchTerm = () => {
  const searchTerm = dropdownSelection.options[dropdownSelection.selectedIndex];
  console.log("dropdown selection: ", dropdownSelection);
  console.log("dd sel options: ", dropdownSelection.options);
  console.log("dd sel selectedIndex: ", dropdownSelection.selectedIndex);

  // if (searchTerm === '') {
  //   // todo ==> make this an actual message/response
  //   alert("you must make a selection")
  // } else {
  const tagResults = allRecipes.filterByTag(searchTerm.value);
  displayRecipes(tagResults, `${searchTerm.innerText} recipes`);
  // }
}

// const filterByTag = (tag) => {
//   return allRecipes.filterByTag(tag);
// }
// *** END Nikki's work ***



/* 📌 Katie's Ticket 📌 */

function formatInput(input) {
  return input.value.toLowerCase().split(' ');
}

function removeDuplicates(arr) {
  return [...new Set(arr)];
}

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
    displayRecipes(result, `Recipes matching "${input.value}"`);
  } else {
    display(searchError);
  }
}
/* 📌 End Katie's Ticket 📌 */


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Event Listeners~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

allRecipesButton.addEventListener('click', function() {
  displayRecipes(allRecipes.recipes, 'All recipes');
});

// recipeListView.addEventListener('click', displayRecipe);

searchButton.addEventListener('click', function() {
  search(searchBarInput);
});

goButton.addEventListener('click', getSearchTerm);
