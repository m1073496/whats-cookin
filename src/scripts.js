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
const favoritedHeart = document.querySelector('.unfavorite-heart'); // already on favorites array, can be removed
const notFavoritedHeart = document.querySelector('.favorite-heart'); // not favorited yet
const onWeekly = document.querySelector('.remove-calendar'); // already on weekly array, can be removed
const notOnWeekly = document.querySelector('.add-calendar');

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
          <i class="far fa-heart favorite-heart"></i>
          <i class="fas fa-heart unfavorite-heart hidden"></i>
          <i class="far fa-calendar add-calendar"></i>
          <i class="far fa-calendar-check remove-calendar hidden"></i>
        </section>

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

favoritedHeart.addEventListener('click', (event) => {
  event.preventDefault();

  if (event.target.className === 'favorite-heart') {
    updateFavorites('remove')
  }

}) // already on favorites array, can be removed

notFavoritedHeart.addEventListener('click', () => {
  updateFavorites('add')
})  // not favorited yet

onWeekly.addEventListener('click', () => {
  updateWeekly('remove')
})  // already on weekly array, can be removed

notOnWeekly.addEventListener('click', () => {
  updateWeekly('remove')
})  // not on weekly yet

// should all of these be one function, with params of add/remove, and the list passed in???
const updateFavorites = (direction) => {
  if (direction === 'remove') {
    // hide full red heart
    favoritedHeart.classList.add('hidden')
    // show empty heart -- color??
    notFavoritedHeart.classList.remove('hidden')
    // remove from array
  } else {
    // hide empty heart -- color??
    notFavoritedHeart.classList.add('hidden')
    // show full red heart
    favoritedHeart.classList.remove('hidden')
    // add to array
  }

  // refresh list of favorites
}

const updateWeekly = (direction) => {
  if (direction === 'remove') {
    // hide calendar with check
    // show empty calendar -- color??
    // remove from array
  } else {
    // hide empty calendar -- color??
    // show calendar with check
    // add to array
  }

  // refresh list of favorites
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
