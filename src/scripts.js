// const User = require("./User");

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Global Variables~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const allRecipesButton = document.getElementById('all-recipes');
const myFavoritesButton = document.getElementById('my-favorites');
const cookitButton = document.getElementById('cookit');
const landingView = document.querySelector('.landing-view');
const recipeDetailView = document.querySelector('.recipe-detail-view');
const recipeListView = document.querySelector('.list-view');
const favoritesView = document.querySelector('.favorites-view');
const pantryView = document.querySelector('.pantry-view');
const cookitListView = document.querySelector('.cookit-view');
const recipeListSearchMessage = document.querySelector('.recipe-list-search-message');
const favoritesListSearchMessage = document.querySelector('.favorites-list-search-message');
const cookitListSearchMessage = document.querySelector('.cookit-list-search-message');
const recipeListContainer = document.querySelector('.recipe-list-content1');
const recipeTitle = document.querySelector('.recipe-title');
const recipeInstructions = document.querySelector('.instructions-details')
const recipeDetailImage = document.querySelector('.detail-section__recipe-profile--img');
const ingredientsDetailList = document.querySelector('.ingredients-list');
const searchBarInput = document.querySelector('.search-bar');
const searchError = document.querySelector('.search-error');
const dropdownSelection = document.querySelector('#tag-selector');
const goButton = document.getElementById('go');
const goListButton = document.getElementById('goListButton');
const goFavoritesButton = document.getElementById('goFavoritesButton');
const goCookitButton = document.getElementById('goCookitButton');
const homeSelector = document.querySelector('.header__left');
const userSelector = document.querySelector('.header__right');
const featuredSectionSelector = document.querySelector('.featured-section');
const heroTitleSelector = document.querySelector('.hero-section__box--recipe-name');
const heartSelector = document.querySelector('.heart');
const recipeHeartSelector = document.querySelector('.heart-recipe');
const calendarSelector = document.querySelector('.calendar');
const recipeCalendarSelector = document.querySelector('.calendar-recipe');
const userGreeting = document.querySelector('.header__right--text');
const userPantryList = document.querySelector('.pantry__bottom--left');
const userPantryTitle = document.querySelector('.pantry__top--title');


let allRecipes;
let currentUser;

window.addEventListener('load', function() {
  console.log('page loaded 🥺');
  const recipeInstances = recipeData.map(recipe => new Recipe(recipe));
  allRecipes = new RecipeRepository(recipeInstances);

  currentUser = new User(usersData.find(user => user.name === "Earline Von"));

  // currentUser = new User(usersData[getRandomIndex(usersData.length)]);
  userGreeting.innerText = `Hello, ${currentUser.userName}!`;
  displayMYFavorite();
  displayRandomFavorites();
  hide(searchError);
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Functions~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const getRandomIndex = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const hide = (element) => element.classList.add('hidden');

const display = (element) => element.classList.remove('hidden');

const displayCookitListView = () => {
  hide(landingView);
  hide(pantryView);
  hide(recipeDetailView);
  hide(favoritesView);
  hide(recipeListView);
  display(cookitListView);
}

const displayRecipeListView = () => {
  hide(landingView);
  hide(pantryView);
  hide(recipeDetailView);
  hide(favoritesView);
  hide(cookitListView);
  display(recipeListView);
}

const displayFavoritesListView = () => {
  hide(landingView);
  hide(pantryView);
  hide(recipeDetailView);
  hide(recipeListView);
  hide(cookitListView);
  display(favoritesView);
}

const displayRecipeDetailView = () => {
  hide(recipeListView);
  hide(landingView);
  hide(pantryView);
  hide(favoritesView);
  hide(cookitListView);
  display(recipeDetailView);
}

// *** START 🦄 Nikki's 🦄 work ***
const displayLanding = () => {
  displayMYFavorite();
  hide(recipeListView);
  hide(recipeDetailView);
  hide(pantryView);
  hide(favoritesView);
  hide(cookitListView);
  display(landingView);
}

const displayPantry = () => {
  hide(recipeListView);
  hide(recipeDetailView);
  hide(landingView);
  hide(favoritesView);
  hide(cookitListView);
  display(pantryView);

  userPantryTitle.innerHTML = `${currentUser.userName}'s Pantry`;
  userPantryList.innerHTML = '';

  currentUser.userPantry.forEach(item => {
    let ingredient = ingredientsData.find(element => element['id'] === item['ingredient']);
    userPantryList.innerHTML += `
      <ul>
        <li class="pantry__item">${ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1)} -- Quantity: ${item['amount']}</li>
      </ul>
    `
  })


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
  let id = event.target.getAttribute('data-id'); // todo ==> should we change the other id to data attribute?

  displayRecipe(id);
})

const toggleFavorites = (qualifier) => {
  if (qualifier === 'none') {
    document.querySelector('.favorite-heart').classList.toggle('hidden');
    document.querySelector('.unfavorite-heart').classList.toggle('hidden');
  } else {
    document.querySelector(`.favorite-heart-${qualifier}`).classList.toggle('hidden');
    document.querySelector(`.unfavorite-heart-${qualifier}`).classList.toggle('hidden');
  }
  // todo ==> refresh list of favorites

}

const toggleCalendar = (qualifier) => {

  if (qualifier === 'none') {
    document.querySelector('.add-calendar').classList.toggle('hidden');
    document.querySelector('.remove-calendar').classList.toggle('hidden');
  } else {
    document.querySelector(`.add-calendar-${qualifier}`).classList.toggle('hidden');
    document.querySelector(`.remove-calendar-${qualifier}`).classList.toggle('hidden');
  }

  // todo ==> refresh list of recipesToCook

}

const addRecipeToFavorites = (targetId) => {
  targetId = Number(targetId);
  let recipe = allRecipes.recipes.find(recipe => recipe.id === targetId);
  if (!currentUser.favoriteRecipes.recipes.includes(targetId)) {
    currentUser.updateFavorites(recipe);
  }
}

const addRecipeToCookit = (targetId) => {
  targetId = Number(targetId);
  let recipe = allRecipes.recipes.find(recipe => recipe.id === targetId);
  if (!currentUser.recipesToCook.includes(targetId)) {
    currentUser.updateCookList(recipe);
  }
}

heartSelector.addEventListener('click', (e) => {
  e.preventDefault();
  const targetId = e.target.getAttribute('data-id');
  toggleFavorites('none');
  addRecipeToFavorites(targetId);
});

recipeHeartSelector.addEventListener('click', (e) => {
  e.preventDefault();
  const targetId = e.target.getAttribute('data-id');
  toggleFavorites('recipe');
  addRecipeToFavorites(targetId);
});

calendarSelector.addEventListener('click', (e) => {
  e.preventDefault();
  const targetId = e.target.getAttribute('data-id');
  toggleCalendar('none');
  addRecipeToCookit(targetId);
});

recipeCalendarSelector.addEventListener('click', (e) => {
  e.preventDefault();
  const targetId = e.target.getAttribute('data-id');
  toggleCalendar('recipe');
  addRecipeToCookit(targetId);
});


// *** END 🦄 Nikki's work 🦄 ***

const findAppropriateMessage = (recipe) => {
  let appropriateMessage;

  if (currentUser.findMissingIngredients(recipe).length === 0) {
    appropriateMessage = `You have everything needed to make this recipe!`;
  } else {
    appropriateMessage = `You're a few ingredients short.`;
  }
  return appropriateMessage;
}

const createRecipeListContent = (recipeList) => {
  recipeList.forEach(recipe => {
    // todo ==> this is where property id isn't recognized, for displaying favorites. find out why.
    let newRecipeItem = document.createElement('article');
    newRecipeItem.className = 'recipe content1';
    newRecipeItem.id = recipe.id; //  specifically,  here
    recipeListContainer.appendChild(newRecipeItem);

    findAppropriateMessage(recipe);

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
            <span class="ingredients-and-cost__item--isInPantry">${findAppropriateMessage(recipe)}</span>
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

const displayRecipes = (recipeList, searchMessage, listName) => {
  if (listName === 'favorites') {
    favoritesListSearchMessage.innerText = searchMessage;
  } else if (listName === 'cookit') {
    favoritesListSearchMessage.innerText = searchMessage;
  } else {
    recipeListSearchMessage.innerText = searchMessage;
  }

  recipeListContainer.innerHTML = '';
  createRecipeListContent(recipeList);
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

  let allMissingIngredients = currentUser.findMissingIngredients(foundRecipe);

  ingredientsDetailList.innerHTML = '';
  recipeInstructions.innerHTML = '';

  foundRecipe.ingredients.forEach(ingredient => {
    let amount;
    let amounts = allMissingIngredients.map(element => element.amount);
    amounts.forEach(element => amount = element)

    ingredientsDetailList.innerHTML += `
      <article class="ingredients__item">
        <i class="far fa-times-circle"></i>
        ${ingredient.amount} ${ingredient.unit} ${ingredient.name} <span class="ingredients__message">You'll need ${amount} more of this.</span>
      </article>
    `;
  });

  foundRecipe.instructions.forEach(instruction => {
    recipeInstructions.innerHTML += `
      <li class="instructions-details__item"><span class="instructions-details__number">${instruction.number}.</span> ${instruction.instruction}</li>
    `;
  });

  recipeHeartSelector.setAttribute('data-id', foundRecipe.id);
  document.querySelector('.favorite-heart-recipe').setAttribute('data-id', foundRecipe.id);
  document.querySelector('.unfavorite-heart-recipe').setAttribute('data-id', foundRecipe.id);

  recipeCalendarSelector.setAttribute('data-id', foundRecipe.id);
  document.querySelector('.add-calendar-recipe').setAttribute('data-id', foundRecipe.id);
  document.querySelector('.remove-calendar-recipe').setAttribute('data-id', foundRecipe.id);

  displayAppropriateIcons(foundRecipe.id)
}

const displayAppropriateIcons = (id) => {
  // if this recipe id is in the currentUser's favorites, show red full heart
  // else show blank
  if (currentUser.favoriteRecipes.recipes.find(recipe => recipe.id === id)) {
    document.querySelector('.favorite-heart-recipe').classList.add('hidden');
    document.querySelector('.unfavorite-heart-recipe').classList.remove('hidden');
  } else {
    document.querySelector('.favorite-heart-recipe').classList.remove('hidden');
    document.querySelector('.unfavorite-heart-recipe').classList.add('hidden');
  }

  // if this recipe id is in the currentUser's recipesToCook array, show blue checkmark calendar
  // else show blank
  console.log("this is the id", id)
  if (currentUser.recipesToCook.find(recipe => recipe.id === id)) {
    document.querySelector('.add-calendar-recipe').classList.add('hidden');
    document.querySelector('.remove-calendar-recipe').classList.remove('hidden');
  } else {
    document.querySelector('.add-calendar-recipe').classList.remove('hidden');
    document.querySelector('.remove-calendar-recipe').classList.add('hidden');
  }
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

const searchByTags = (tags, listName) => {
  if (tags.includes('all')) {
    return allRecipes.recipes;
  } else if (listName === 'favorites') {
    return currentUser.favoriteRecipes.filterByTags(tags);
  } else {
    return allRecipes.filterByTags(tags);
  }
}

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

const search = (searchInput, dropDownInput, listName) => {
  hide(searchError);

  const words = splitInput(searchInput);

  const selections = [...dropDownInput.selectedOptions].map(option => option.value);
  const parsedSelections = parseSelections(selections);
  const tagsToSearchFor = getTagsToSearchFor(parsedSelections);
  const tagMatches = searchByTags(tagsToSearchFor, listName);
  const tagMatchesRepository = new RecipeRepository(tagMatches);

  const results = tagMatchesRepository.findRecipes(words);
  displayResults(searchInput, results.recipes, listName);
}

const displayResults = (searchInput, recipes, listName) => {
  // TODO later will need to incorporate recipesToCook
  if (listName === 'favorites') {
    displayFavoritesListView();
  } else {
    displayRecipeListView();
  }

  if (recipes.length > 0 && searchInput.value) {
    displayRecipes(recipes, `Search results matching "${searchInput.value}"`, listName);
  } else if (recipes.length) {
    displayRecipes(recipes, `Search results`, listName);
  } else {
    display(searchError);
  }
}

const displayFavorites = () => {
  displayFavoritesListView();
  if (currentUser.favoriteRecipes.recipes.length === 0) {
    favoritesListSearchMessage.innerText = `You don't have any favorites 😢`
  } else {
    displayRecipes(currentUser.favoriteRecipes.recipes, '', 'favorites');
  }
}

const displayCookit = () => {
  displayCookitListView();
  if (currentUser.recipesToCook.length === 0) {
    cookitListSearchMessage.innerText = `You don't have any recipes on this week's list. 😢`
  } else {
    displayRecipes(currentUser.recipesToCook, '', 'cookit');
  }
}


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Event Listeners~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

allRecipesButton.addEventListener('click', function() {
  // TODO need to make this a separate named function now that it's more than one line?
  displayRecipeListView();
  displayRecipes(allRecipes.recipes, '', 'all');
});


goButton.addEventListener('click', function() {
  search(searchBarInput, dropdownSelection, 'all');
  document.getElementById('searchBarLanding').value = '';
});

goListButton.addEventListener('click', function() {
  search(searchBarInput, dropdownSelection, 'all');
  document.getElementById('searchBarList').value = '';
});

goFavoritesButton.addEventListener('click', function() {
  search(searchBarInput, dropdownSelection, 'favorites');
  document.getElementById('searchBarFavorites').value = '';
});

goCookitButton.addEventListener('click', function() {
  search(searchBarInput, dropdownSelection, 'cookit');
  document.getElementById('searchBarCookit').value = '';
});

homeSelector.addEventListener('click', displayLanding);

userSelector.addEventListener('click', displayPantry);

myFavoritesButton.addEventListener('click', displayFavorites);
cookitButton.addEventListener('click', displayCookit);
