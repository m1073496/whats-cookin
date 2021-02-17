// const User = require("./User");

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Global Variables~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const allRecipesButton = document.getElementById('all-recipes');
const yourFavoritesButton = document.getElementById('your-favorites');
const landingView = document.querySelector('.landing-view');
const recipeDetailView = document.querySelector('.recipe-detail-view');
const recipeListView = document.querySelector('.list-view');
const favoritesView = document.querySelector('.favorites-view');
const pantryView = document.querySelector('.pantry-view');
const recipeListSearchMessage = document.querySelector('.recipe-list-search-message');
const favoritesSearchMessage = document.querySelector('.favorites-search-message');
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
const userGreeting = document.querySelector('.header__right--text');
const userPantryList = document.querySelector('.pantry__bottom--left');


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

const displayRecipeList = () => {
  hide(landingView);
  hide(pantryView);
  hide(recipeDetailView);
  hide(favoritesView);
  display(recipeListView);
}

const displayFavoritesList = () => {
  hide(landingView);
  hide(pantryView);
  hide(recipeDetailView);
  display(favoritesView);
  hide(recipeListView);
}

const displayRecipeDetailView = () => {
  hide(recipeListView);
  hide(landingView);
  hide(pantryView);
  hide(favoritesView);
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
  hide(favoritesView);
  display(landingView);
}

const displayPantry = () => {
  hide(recipeListView);
  hide(recipeDetailView);
  hide(landingView);
  hide(favoritesView);
  display(pantryView);


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

const addRecipeToFavorites = () => {
  console.log(document.querySelector('.recipe-title').innerText);
  let recipe = allRecipes.recipes.find(element => element.name === document.querySelector('.recipe-title').innerText);
  console.log(recipe);
  currentUser.updateFavorites(recipe);
  console.log(currentUser.favoriteRecipes);
}

heartSelector.addEventListener('click', () => {
  toggleFavorites('none');
  addRecipeToFavorites();
});

recipeHeartSelector.addEventListener('click', () => {
  toggleFavorites('recipe');
  addRecipeToFavorites();
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
    let newRecipeItem = document.createElement('article');
    newRecipeItem.className = 'recipe content1';
    newRecipeItem.id = recipe.id;
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

const displayRecipes = (recipeList, searchMessage) => {
  displayRecipeList();
  recipeListSearchMessage.innerText = searchMessage;
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
    return allRecipes.recipes;
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
  determineListTitle(listName);

  if (recipes.length > 0 && searchInput.value) {
    displayRecipes(recipes, `Search results matching "${searchInput.value}"`);
  } else if (recipes.length) {
    displayRecipes(recipes, `Search results`);
  } else {
    display(searchError);
  }
}

const displayFavorites = () => {
  displayFavoritesList();
  console.log(currentUser.favoriteRecipes);
  if (currentUser.favoriteRecipes.recipes.length === 0) {
    favoritesSearchMessage.innerText = `You don't have any favorites 😢`
  } else {
    displayRecipes(currentUser.favoriteRecipes.recipes, '');
  }
}


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Event Listeners~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

allRecipesButton.addEventListener('click', function() {
  displayRecipes(allRecipes.recipes, '');
});


goButton.addEventListener('click', function() {
  search(searchBarInput, dropdownSelection, 'all');
});

goListButton.addEventListener('click', function() {
  search(searchBarInput, dropdownSelection, 'all');
});

goFavoritesButton.addEventListener('click', function() {
  search(searchBarInput, dropdownSelection, 'favorites');
});

homeSelector.addEventListener('click', displayLanding);

userSelector.addEventListener('click', displayPantry);

yourFavoritesButton.addEventListener('click', displayFavorites);
