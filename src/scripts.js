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
const searchError = document.querySelector('.search-error');
const dropdownSelection = document.querySelector('#tag-selector');
const goButton = document.getElementById('go')
const homeSelector = document.querySelector('.header__left');
const userSelector = document.querySelector('.header__right');
const featuredSectionSelector = document.querySelector('.featured-section');
const heroSectionSelector = document.querySelector('.hero-section');
const heroTitleSelector = document.querySelector('.hero-section__box--recipe-name');
const heartSelector = document.querySelector('.heart');
const recipeHeartSelector = document.querySelector('.heart-recipe');
const calendarSelector = document.querySelector('.calendar');
const recipeCalendarSelector = document.querySelector('.calendar-recipe');


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
  // todo ==> will need to check whether this is on favorites, and if not, maybe don't use it??
  // in other words, should we only show recipes not on favorites? maybe use a different repository for this??
  const heroName = document.querySelector('.hero-section__box--recipe-name');
  const favorite = allRecipes.recipes[
    Math.floor(Math.random() * allRecipes.recipes.length)
  ];


  heroSectionSelector.style.backgroundImage = `url(${favorite.image})`;
  heroName.innerHTML = `<h3 data-id=${favorite.id}>${favorite.name}</h3>`
}

heroTitleSelector.addEventListener('click', (event) => {
  event.preventDefault();
  let id = event.target.getAttribute('data-id');

  displayRecipe(id);
})

const toggleFavorites = () => {
  document.querySelector('.favorite-heart').classList.toggle('hidden');
  document.querySelector('.unfavorite-heart').classList.toggle('hidden');

  // refresh list of favorites
}

const toggleFavoritesRecipe = () => {
  document.querySelector('.favorite-heart-recipe').classList.toggle('hidden');
  document.querySelector('.unfavorite-heart-recipe').classList.toggle('hidden');

  // refresh list of favorites
}

const toggleCalendar = () => {
  document.querySelector('.add-calendar').classList.toggle('hidden');
  document.querySelector('.remove-calendar').classList.toggle('hidden');

  // refresh list of weekly recipes to cook
}

const toggleCalendarRecipe = () => {
  document.querySelector('.add-calendar-recipe').classList.toggle('hidden');
  document.querySelector('.remove-calendar-recipe').classList.toggle('hidden');

  // refresh list of weekly recipes to cook
}

heartSelector.addEventListener('click', toggleFavorites);
recipeHeartSelector.addEventListener('click', toggleFavoritesRecipe);
calendarSelector.addEventListener('click', toggleCalendar);
recipeCalendarSelector.addEventListener('click', toggleCalendarRecipe)

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
                 alt="${recipe.name}"
                 style="width:250px;">
          </figure>
        </div>
  
        <div class="recipe-list__item cooked-button hidden">
          <button>Cooked It!</button>
          <span>message</span>
        </div>
  
        <div class="recipe-list__item">
          <span><i class="far fa-heart favorite-heart"></i></span>
          <span><i class="far fa-calendar-check remove-calendar"></i></span>
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

const splitInput = (input) => {
  return input.value.split(' ');
}

const removeDuplicates = (arr) => {
  return [...new Set(arr)];
}

const filterByTags = (searchTags, recipes) => {
  const results = [];
  for (let i = 0; i < searchTags.length; i++) {
    recipes.filter(recipe => {
      if (recipe.tags.includes(searchTags[i].toLowerCase())) {
        results.push(recipe);
      }
    })
  }

  return [...new Set(results)];
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

const searchByTags = (tags) => {
  if (tags.includes('all')) {
    return allRecipes.recipes;
  } else {
    return filterByTags(tags, allRecipes.recipes);
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

const search = (input) => {
  hide(searchError);

  const words = splitInput(input);
  // console.log("words: ", words);

  const selections = [...dropdownSelection.selectedOptions].map(option => option.value);
  // console.log("selections: ", selections);

  const parsedSelections = parseSelections(selections);
  // console.log("parsedSelections: ", parsedSelections)

  const tagsToSearchFor = getTagsToSearchFor(parsedSelections);
  // console.log("tagsToSearchFor: ", tagsToSearchFor);

  const tagMatches = searchByTags(tagsToSearchFor);
  // console.log("tagMatches: ", tagMatches);

  const foundIngredientRecipes = words.flatMap(word => {
    return filterByIngredient(word, tagMatches);
  });
  // console.log("found ingredient recipes: ", foundIngredientRecipes);

  const foundNameRecipes = words.flatMap(word => {
    return filterByName(word, tagMatches);
  });
  // console.log("found name recipes: ", foundNameRecipes);

  const foundTagRecipes = words.flatMap(word => {
    return filterByTags([word], tagMatches);
  });
  // console.log("found tag recipes: ", foundTagRecipes);

  const foundRecipes = [...foundIngredientRecipes, ...foundNameRecipes, ...foundTagRecipes];
  // console.log("found recipes: ", foundRecipes);

  const result = removeDuplicates(foundRecipes);
  console.log("final result: ", result);

  if (result.length > 0 && input.value) {
    // TODO could make this display all selected tags ... or not
    // displayRecipes(result, `${selections.innerText} recipes matching "${input.value}"`);
    displayRecipes(result, `Search results matching "${input.value}"`);
  } else if (result.length) {
    // displayRecipes(result, `${selections.innerText} recipes`);
    displayRecipes(result, `Search results`);
  } else {
    display(searchError);
  }
}


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Event Listeners~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

allRecipesButton.addEventListener('click', function() {
  displayRecipes(allRecipes.recipes, 'All recipes');
});


goButton.addEventListener('click', function() {
  search(searchBarInput);
});

homeSelector.addEventListener('click', displayLanding);

userSelector.addEventListener('click', displayPantry);
