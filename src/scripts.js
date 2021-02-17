// const User = require("./User");

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Global Variables~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const allRecipesButton = document.getElementById('all-recipes');
const landingView = document.querySelector('.landing-view');
const recipeDetailView = document.querySelector('.recipe-detail-view');
const recipeListView = document.querySelector('.list-view');
const pantryView = document.querySelector('.pantry-view');
const recipeListTitle = document.querySelector('.recipe-list-title');
const recipeListSearchMessage = document.querySelector('.recipe-list-search-message');
const recipeTitle = document.querySelector('.recipe-title');
const recipeInstructions = document.querySelector('.instructions-details')
const recipeDetailImage = document.querySelector('.detail-section__recipe-profile--img');
const ingredientsDetailList = document.querySelector('.ingredients-list');
const searchBarInput = document.querySelector('.search-bar');
const searchError = document.querySelector('.search-error');
const dropdownSelection = document.querySelector('#tag-selector');
const goButton = document.getElementById('go');
const goListButton = document.getElementById('goListButton');
const homeSelector = document.querySelector('.header__left');
const userSelector = document.querySelector('.header__right');
const featuredSectionSelector = document.querySelector('.featured-section');
const heroTitleSelector = document.querySelector('.hero-section__box--recipe-name');
const heartSelector = document.querySelector('.heart');
const recipeHeartSelector = document.querySelector('.heart-recipe');
// const listHeartSelector = document.querySelector('.heart-list');
const calendarSelector = document.querySelector('.calendar');
const recipeCalendarSelector = document.querySelector('.calendar-recipe');
// const listCalendarSelector = document.querySelector('.calendar-list');


// TODO trash this later; here just to have something for testing
const currentUser = new User({
  name: 'Bob',
  id: 123,
  pantry: [],
  favoriteRecipes: [],
  recipesToCook: []
});

let allRecipes;

window.addEventListener('load', function() {
  console.log('page loaded 🥺');
  const recipeInstances = recipeData.map(recipe => new Recipe(recipe));
  allRecipes = new RecipeRepository(recipeInstances);
  displayMYFavorite();
  displayRandomFavorites();
  hide(searchError);
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Functions~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const hide = (element) => element.classList.add('hidden');

const display = (element) => element.classList.remove('hidden');

const displayRecipeList = () => {
  hide(landingView);
  hide(pantryView);
  hide(recipeDetailView);
  display(recipeListView);
}

const displayRecipeDetailView = () => {
  hide(recipeListView);
  hide(landingView);
  hide(pantryView);
  display(recipeDetailView);
}


// *** START 🦄 Nikki's 🦄 work ***
const displayLanding = () => {
  // todo ==> not sure how to clear that form out, because this isn't working
  // searchBarInput.textContent = '';
  displayMYFavorite();
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
  const heroName = document.querySelector('.hero-section__box--recipe-name');
  heroName.innerHTML = `<h3 data-id='698701'>Double Raspberry Soufflé</h3>`
}

heroTitleSelector.addEventListener('click', (event) => {
  event.preventDefault();
  let id = event.target.getAttribute('data-id');

  displayRecipe(id);
})

const toggleFavorites = (qualifier) => {
  if (qualifier === 'none') {
    document.querySelector('.favorite-heart').classList.toggle('hidden');
    document.querySelector('.unfavorite-heart').classList.toggle('hidden');
  } else if (qualifier === 'recipe') {
    document.querySelector('.favorite-heart-recipe').classList.toggle('hidden');
    document.querySelector('.unfavorite-heart-recipe').classList.toggle('hidden');
  } else if (qualifier === 'list') {
    document.querySelector('.favorite-heart-list').classList.toggle('hidden');
    document.querySelector('.unfavorite-heart-list').classList.toggle('hidden');
  }

  // refresh list of favorites
}

const toggleCalendar = (qualifier) => {
  if (qualifier === 'none') {
    document.querySelector('.add-calendar').classList.toggle('hidden');
    document.querySelector('.remove-calendar').classList.toggle('hidden');
  } else if (qualifier === 'recipe') {
    document.querySelector('.add-calendar-recipe').classList.toggle('hidden');
    document.querySelector('.remove-calendar-recipe').classList.toggle('hidden');
  } else if (qualifier === 'list') {
    document.querySelector('.add-calendar-list').classList.toggle('hidden');
    document.querySelector('.remove-calendar-list').classList.toggle('hidden');
  }

  // refresh list of favorites
}

heartSelector.addEventListener('click', () => {
  toggleFavorites('none')
});

recipeHeartSelector.addEventListener('click', () => {
  toggleFavorites('recipe')
});

calendarSelector.addEventListener('click', () => {
  toggleCalendar('none')
});

recipeCalendarSelector.addEventListener('click', () => {
  toggleCalendar('recipe')
});

// todo ==> need to get bubbling set up for these?? they don't exist when page is loaded
// listHeartSelector.addEventListener('click', () => {
//   toggleFavorites('list')
// });

// listCalendarSelector.addEventListener('click', () => {
//   toggleCalendar('list')
// });

// *** END 🦄 Nikki's work 🦄 ***

const displayRecipes = (recipeList, title) => {
  displayRecipeList();
  recipeListSearchMessage.innerText = title;

  recipeList.forEach(recipe => {
    let newRecipeItem = document.createElement('article');
    let parent = document.querySelector('.list-view');
    newRecipeItem.className = 'recipe content1';
    newRecipeItem.id = recipe.id;
    parent.appendChild(newRecipeItem);

    newRecipeItem.innerHTML += `
      <section class="item-container">
        <div class="recipe-list__item">
          <figure>
            <img class="recipe-list__item--img"
                 src="${recipe.image}"
                 alt="${recipe.name}"
                 style="width:250px;">
          </figure>
        </div>
        <div class="recipe-list__item cooked-button hidden">
          <button>Cooked It!</button>
          <span>message</span>
        </div>
      </section>

      <section class="recipe-list__item">
        <ul class="ingredients-and-cost">
          <li>
            <span class="ingredients-and-cost__item--name">${recipe.name}</span>
          </li>
          
          <li>
            <span class="ingredients-and-cost__item--icon"><i class="far fa-check-circle"></i></span>
            <span class="ingredients-and-cost__item--isInPantry">You have everything needed to make this recipe!</span>
          </li>
          
          <li>
            <span class="ingredients-and-cost__item--icon"><i class="far fa-badge-dollar"></i></span>
            <span class="ingredients-and-cost__item--cost">${recipe.getTotalCost()}</span>
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
    <img src="${foundRecipe.image}" alt="${foundRecipe.name}" style="width:250px;">
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
      <li class="instructions-details__item"><span class="instructions-details__number">${instruction.number}.</span> ${instruction.instruction}</li>
    `;
  });
}

const getTagsToSearchFor = (choices) => {
  console.log("choices passed in to getTagsToSearchFor: ", choices);
  console.log('check out these choices');
  let searchFor = [];

  choices.forEach(choice => {
    if (choice === 'appetizers') {
      searchFor.push('appetizer', 'hor d\'oeuvre', 'hor d\'oeuvres', 'antipasti', 'antipasto');
    } else if (choice === 'side-dishes') {
      searchFor.push('side dish');
    } else if (choice === 'main-courses') {
      searchFor.push('main dish', 'main course', 'lunch', 'dinner');
    } else if (choice === 'desserts') {
      searchFor.push('dessert');
    } else {
      searchFor.push(choice);
    }
  });

  return searchFor;
}

const searchByTags = (tags, repository) => {
  if (tags.includes('all')) {
    return repository.recipes;
  } else {
    return repository.filterByTags(tags);
  }
}

// TODO force choice of "all" if no choice is made
// -- but could solve this in the UI instead?
const parseSelections = (selections) => {
  if (selections.length) {
    return selections;
  } else {
    return ['all'];
  }
}

const splitInput = (input) => {
  return input.value.split(' ');
}

const search = (searchInput, dropDownInput, repository) => {
  hide(searchError);

  const words = splitInput(searchInput);

  const selections = [...dropDownInput.selectedOptions].map(option => option.value);
  const parsedSelections = parseSelections(selections);
  const tagsToSearchFor = getTagsToSearchFor(parsedSelections);
  const tagMatches = searchByTags(tagsToSearchFor, repository);
  const tagMatchesRepository = new RecipeRepository(tagMatches);

  const results = tagMatchesRepository.findRecipes(words);
  displayResults(searchInput, results.recipes, repository);
}

const displayResults = (searchInput, recipes, repository) => {
  determineListTitle(repository);

  if (recipes.length > 0 && searchInput.value) {
    displayRecipes(recipes, `Search results matching "${searchInput.value}"`);
  } else if (recipes.length) {
    displayRecipes(recipes, `Search results`);
  } else {
    display(searchError);
  }
}

const determineListTitle = (repository) => {
  const listTitle = '';

  if (repository === currentUser.favoriteRecipes) {
    listTitle = 'My favorite recipes';
    display(recipeListTitle);
  } else if (repository === allRecipes) {
    hide(recipeListTitle);
  } else if (repository === recipesToCook) {
    listTitle = 'Recipes to cook this week';
    display(recipeListTitle);
  }
}


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Event Listeners~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

allRecipesButton.addEventListener('click', function() {
  displayRecipes(allRecipes.recipes, 'All recipes');
});


goButton.addEventListener('click', function() {
  search(searchBarInput, dropdownSelection, allRecipes);
});

goListButton.addEventListener('click',function() {
  // TODO change allRecipes to favorites or whatever: currentUser.favoriteRecipes
  search(searchBarInput, dropdownSelection, allRecipes);
});

homeSelector.addEventListener('click', displayLanding);

userSelector.addEventListener('click', displayPantry);
