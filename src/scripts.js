const landingView = document.querySelector('.landing-view');
const landingSection1 = document.querySelector('.landing-content1');
const landingSection2 = document.querySelector('.landing-content2');
const recipeListView = document.querySelector('.list-view');

let allRecipes;

window.addEventListener('load', function() {
  console.log('🥺');
  allRecipes = new RecipeRepository(recipeData);
  console.log(allRecipes);
});

const hide = (element) => element.classList.add('hidden');

const display = (element) => element.classList.remove('hidden');

const displayRecipeList = () => {
  hide(landingView);
  hide(landingSection1);
  hide(landingSection2);

  display(recipeListView);
}


// *** START Nikki's work ***
const dropdownSelection = document.querySelector('#tag-selector');
const goButton = document.getElementById('go')

const getSearchTerm = () => {
  const searchTerm = dropdownSelection.options[dropdownSelection.selectedIndex].value;

  if (searchTerm === '') {
    // todo ==> make this an actual message/response
    alert("you must make a selection")
  } else {
    filterByTag(searchTerm);
    displayRecipeList();
  }
}

const filterByTag = (tag) => {
  return allRecipes.filterByTag(tag)
}

goButton.addEventListener('click', getSearchTerm);
// *** END Nikki's work ***
