/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Global Variables~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const allRecipesButton = document.getElementById('all-recipes');
const landingView = document.querySelector('.landing-view');
const recipeDetailView = document.querySelector('.recipe-detail-view');
const recipeListView = document.querySelector('.list-view');
const pantryView = document.querySelector('.pantry-view');
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
const homeSelector = document.querySelector('.header__left');
const userSelector = document.querySelector('.header__right');
const featuredSectionSelector = document.querySelector('.featured-section');
const heroSectionSelector = document.querySelector('.hero-section');

let allRecipes;

window.addEventListener('load', function() {
  console.log('page loaded 🥺');
  allRecipes = new RecipeRepository(recipeData);
  displayMYFavorite();
  displayRandomFavorites();
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

// *** START 🦄 Nikki's 🦄 work ***

const displayLanding = () => {
  hide(recipeListView);
  hide(recipeDetailView);
  hide(pantryView);
  display(landingView);
}

const displayPantry = () => {
  hide(recipeListView);
  hide(recipeDetailView);
  hide(landingView);
  display(pantryView);
}

const displayRandomFavorites = () => {
  let chunk = '';
  let fourRandomRecipes = [];

  // TODO need to use one of the new prototype methods for this?
  for (let i = 0; i < 4; i++) {
    let randIndex = Math.floor(Math.random() * allRecipes.recipes.length)
    fourRandomRecipes.push(allRecipes.recipes[randIndex]);
  }

  fourRandomRecipes.map(recipe => {
    chunk += `
      <article class="featured-section__recipe-profile">
        <figure>
          <img class="featured-section__recipe-profile--img"
               src=${recipe.image}
               alt=${recipe.name}>
          <figcaption>${recipe.name}</figcaption>
        </figure>
      </article>
    `
  });

  featuredSectionSelector.innerHTML = chunk;
}

const displayMYFavorite = () => {
  let chunk = '';

  const favorite = allRecipes.recipes[
    Math.floor(Math.random() * allRecipes.recipes.length)
  ];

  chunk += `
    <section class="hero-section__box" data-id=${favorite.id}>
      <section class="hero-section__box--recipe-name">
        <h3>${favorite.name}</h3>
      </section>
      <section class="hero-section__box--icons">
        <i class="far fa-heart"></i>
        <i class="far fa-calendar"></i>
      </section>
    </section>
  `;

  heroSectionSelector.style.backgroundImage = `url(${favorite.image})`;
  heroSectionSelector.innerHTML = chunk;
}
// *** END 🦄 Nikki's work 🦄 ***



const displayRecipes = (recipeList, title) => {
  displayRecipeList();
  recipeListTitle.innerText = title;

  recipeList.forEach(recipe => {
    let newRecipeItem = document.createElement('article');
    let parent = document.querySelector('.list-view');
    newRecipeItem.className = 'recipe content1';
    parent.appendChild(newRecipeItem);

    newRecipeItem.innerHTML += `
      <section class="item-container">
        <div class="recipe-list__item">
          <figure>
            <img class="recipe-list__item--img"
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
            <i class="far fa-check-circle"></i>
            You have everything needed to make this recipe!
          </li>
          <li>
            <i class="far fa-badge-dollar"></i>${recipe.getTotalCost()}
          </li>
        </ul>
      </section>
    `;

    newRecipeItem.addEventListener('click', function() {
      let target = newRecipeItem.id;
      displayRecipe(target);
    });
  });
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
  });
  foundRecipe.instructions.forEach(instruction => {
    recipeInstructions.innerHTML += `
      <li>${instruction.number}. ${instruction.instruction}</li>
    `;
  });
}

// const getTaggedRecipes = () => {
//   const selection = dropdownSelection.options[dropdownSelection.selectedIndex];
//   const tagResults = allRecipes.filterByTag(selection.value);
//   displayRecipes(tagResults, `${selection.innerText} recipes`);
// }

function splitInput(input) {
  console.log("input.value: ", input.value);
  return input.value.split(' ');
}

function removeDuplicates(arr) {
  return [...new Set(arr)];
}

const filterByTag = (searchTag, recipes) => {
  return recipes.filter(recipe => {
    if (recipe.tags.includes(searchTag.toLowerCase())) {
      return recipe.id;
    }
  });
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

// TODO build this translator
const getTagToSearchFor = (selection) => {
  // TODO actually make this into a translator
  return selection;
}

const searchByTag = (tag) => {
  if (tag === 'all') {
    return allRecipes.recipes;
  } else {
    return filterByTag(tag, allRecipes.recipes);
  }
}

function search(input) {
  hide(searchError);

  const words = splitInput(input);
  console.log("formatted input: ", words);

  const selection = dropdownSelection.options[dropdownSelection.selectedIndex].value;
  console.log("selection: ", selection);

  // TODO build translator above
  const tagToSearchFor = getTagToSearchFor(selection);
  console.log("tagToSearchFor: ", tagToSearchFor);

  const tagMatches = searchByTag(tagToSearchFor);

  const foundIngredientRecipes = words.flatMap(word => {
    // return allRecipes.filterByIngredient(word);
    return filterByIngredient(word, tagMatches);
  });
  console.log("found ingredient recipes: ", foundIngredientRecipes);

  const foundNameRecipes = words.flatMap(word => {
    // return allRecipes.filterByName(word);
    return filterByName(word, tagMatches);
  });
  console.log("found name recipes: ", foundNameRecipes);

  const foundRecipes = [...foundIngredientRecipes, ...foundNameRecipes];
  console.log("found recipes: ", foundRecipes);

  const result = removeDuplicates(foundRecipes);
  console.log("final result: ", result);

  // TODO: fix display message so that it handles empty search, "all" tag selection, etc.
  if (result.length > 0) {
    displayRecipes(result, `${selection.innerText} recipes matching "${input.value}"`);
    // displayRecipes(tagResults, `${selection.innerText} recipes`);
  } else {
    display(searchError);
  }
}


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Event Listeners~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

allRecipesButton.addEventListener('click', function() {
  displayRecipes(allRecipes.recipes, 'All recipes');
});

// recipeListView.addEventListener('click', displayRecipe);

// searchButton.addEventListener('click', function() {
//   search(searchBarInput);
// });

goButton.addEventListener('click', function() {
  search(searchBarInput);
});

homeSelector.addEventListener('click', displayLanding);

userSelector.addEventListener('click', displayPantry);