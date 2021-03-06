const chai = require('chai');
const expect = chai.expect;

// const User = require('../src/User');
// const RecipeRepository = require('../src/RecipeRepository');
// const Recipe = require('../src/Recipe');

const {
  testUsersData,
  testRecipeData
} = require('../src/data/test-data');

describe('User', function() {
  let user1;
  let user2;
  let recipeRepository;
  let recipes;

  beforeEach(function() {
    user1 = new User(testUsersData[0]);
    user2 = new User(testUsersData[1]);
    recipes = testRecipeData.map(recipe => new Recipe(recipe));
    recipeRepository = new RecipeRepository(recipes);
  });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should be an instance of a User', function() {
    expect(user1).to.be.an.instanceOf(User);
  });

  it('should have a name', function() {
    expect(user1.userName).to.equal(testUsersData[0].name);
  });

  it('should have a unique id', function() {
    expect(user1.userId).to.equal(testUsersData[0].id);
    expect(user1.userId).to.not.equal(user2.userId);
  });

  it('should have a pantry of ingredients', function() {
    expect(user1.userPantry).to.deep.equal(testUsersData[0].pantry);
  });

  it('should add recipes to list of favorites', function() {
    user2.updateFavorites(recipes[0]);

    expect(user2.favoriteRecipes.recipes[0]).to.be.an.instanceOf(Recipe);
    expect(user2.favoriteRecipes.recipes.length).to.equal(1);
    expect(user2.favoriteRecipes.recipes[0]).to.deep.equal(recipeRepository.recipes[0]);

    user2.updateFavorites(recipeRepository.recipes[1]);

    expect(user2.favoriteRecipes.recipes.length).to.equal(2);
    expect(user2.favoriteRecipes.recipes[1]).to.deep.equal(recipeRepository.recipes[1]);
    expect(user2.favoriteRecipes.recipes).to.deep.equal([recipeRepository.recipes[0], recipeRepository.recipes[1]]);
  });

  it('should remove recipes from list of favorites', function() {
    user2.updateFavorites(recipeRepository.recipes[0]);
    user2.updateFavorites(recipeRepository.recipes[1]);
    user2.updateFavorites(recipeRepository.recipes[0]);

    expect(user2.favoriteRecipes.recipes.length).to.equal(1);
    expect(user2.favoriteRecipes.recipes[0]).to.deep.equal(recipeRepository.recipes[1]);
    expect(user2.favoriteRecipes.recipes).to.deep.equal([recipeRepository.recipes[1]]);
  });

  it('should add recipes to `recipes to cook` list', function() {
    user1.updateCookList(recipeRepository.recipes[0]);
    user1.updateCookList(recipeRepository.recipes[1]);

    expect(user1.recipesToCook.length).to.equal(2);
    expect(user1.recipesToCook[0]).to.deep.equal(recipeRepository.recipes[0]);
    expect(user1.recipesToCook[0]).to.be.an.instanceOf(Recipe);
  });

  it('should remove recipes from `recipes to cook` list', function() {
    user1.updateCookList(recipeRepository.recipes[0]);
    user1.updateCookList(recipeRepository.recipes[1]);
    user1.updateCookList(recipeRepository.recipes[1]);

    expect(user1.recipesToCook.length).to.equal(1);
    expect(user1.recipesToCook[0]).to.deep.equal(recipeRepository.recipes[0]);
    expect(user1.recipesToCook).to.deep.equal([recipeRepository.recipes[0]]);
  });

  it('should filter favorite recipes by tags', function() {
    user2.updateFavorites(recipeRepository.recipes[0]);
    user2.updateFavorites(recipeRepository.recipes[1]);
    let firstResult = user2.filterFavorites(['onions']);
    let secondResult = user2.filterFavorites(['side dish']);

    expect(firstResult.recipes.length).to.equal(1);
    expect(firstResult.recipes).to.deep.equal([recipeRepository.recipes[0]]);

    expect(secondResult.recipes.length).to.equal(2);
    expect(secondResult.recipes).to.deep.equal([recipeRepository.recipes[0], recipeRepository.recipes[1]]);
  });

  it('should filter favorite recipes by name/ingredient using a search term', function() {
    user1.updateFavorites(recipeRepository.recipes[0]);
    user1.updateFavorites(recipeRepository.recipes[2]);
    let firstResult = user1.filterFavorites(['vegan lentil loaf']);
    let secondResult = user1.filterFavorites(['lentil']);
    let thirdResult = user1.filterFavorites(['s&p']);

    expect(firstResult.recipes.length).to.equal(1);
    expect(firstResult.recipes).to.deep.equal([recipeRepository.recipes[0]]);

    expect(secondResult.recipes.length).to.equal(1);
    expect(secondResult.recipes).to.deep.equal([recipeRepository.recipes[0]]);

    expect(thirdResult.recipes.length).to.equal(2);
    expect(thirdResult.recipes).to.deep.equal([recipeRepository.recipes[0], recipeRepository.recipes[2]]);
  });

  it('should determine missing ingredients needed to cook recipe', function() {
    // user1 Flossie can't make pastry cream
    let badResultUser1 = user1.findMissingIngredients(recipes[1]);
    // user1 Flossie CAN make vegan lentil loaf
    let goodResultUser1 = user1.findMissingIngredients(recipes[0]);
    let mixedResultUser1 = user1.findMissingIngredients(recipes[2]);

    // user2 Rocky can't make vegan lentil loaf
    let badResultUser2 = user2.findMissingIngredients(recipes[0]);
    // user2 Rocky CAN make pastry cream
    let goodResultUser2 = user2.findMissingIngredients(recipes[1]);


    expect(badResultUser1).to.deep.equal([
      {
        id: 1001,
        amount: 1,
        unit: 'tablespoons',
        name: 'butter',
        costPerUnit: 618,
        totalCostInCents: 1236
      },
      {
        id: 20027,
        amount: 0.25,
        unit: 'cup',
        name: 'corn starch',
        costPerUnit: 236,
        totalCostInCents: 59
      },
      {
        id: 1123,
        amount: 1,
        unit: '',
        name: 'eggs',
        costPerUnit: 472,
        totalCostInCents: 472
      },
      {
        id: 1125,
        amount: 2,
        unit: '',
        name: 'egg yolks',
        costPerUnit: 889,
        totalCostInCents: 1778
      },
      {
        id: 1077,
        amount: 2,
        unit: 'cups',
        name: 'full-fat milk',
        costPerUnit: 276,
        totalCostInCents: 552
      },
      {
        id: 2050,
        amount: 1,
        unit: 'teaspoon',
        name: 'vanilla',
        costPerUnit: 926,
        totalCostInCents: 926
      },
      {
        id: 19335,
        amount: 0.33,
        unit: 'cup',
        name: 'sucrose',
        costPerUnit: 902,
        totalCostInCents: 297.66
      }
    ]);

    expect(goodResultUser1).to.deep.equal([]);

    expect(mixedResultUser1).to.deep.equal([
      {
        amount: 1,
        costPerUnit: 966,
        id: 6150,
        name: 'bar b que sauce',
        totalCostInCents: 966,
        unit: 'cup'
      },
      {
        amount: 1,
        costPerUnit: 983,
        id: 6194,
        name: 'chicken broth',
        totalCostInCents: 983,
        unit: 'cup'
      },
      {
        amount: 3,
        costPerUnit: 412,
        id: 93627,
        name: 'liquid smoke',
        totalCostInCents: 1236,
        unit: 'tbsp'
      },
      {
        amount: 8,
        costPerUnit: 302,
        id: 2028,
        name: 'paprika',
        totalCostInCents: 2416,
        unit: 'servings'
      },
      {
        amount: 6,
        costPerUnit: 969,
        id: 10072,
        name: 'pork shoulder',
        totalCostInCents: 5814,
        unit: 'lbs'
      },
      {
        amount: 2,
        costPerUnit: 57,
        id: 6971,
        name: 'worcestershire',
        totalCostInCents: 114,
        unit: 'tbsp'
      }
    ]);

    expect(badResultUser2).to.deep.equal([
      {
        id: 9019,
        amount: 2,
        unit: 'tablespoons',
        name: 'unsweetened apple sauce',
        costPerUnit: 154,
        totalCostInCents: 308
      },
      {
        id: 18079,
        amount: 1,
        unit: 'cup',
        name: 'dry breadcrumbs',
        costPerUnit: 167,
        totalCostInCents: 167
      },
      {
        id: 16069,
        amount: 1,
        unit: 'cup',
        name: 'legumes',
        costPerUnit: 903,
        totalCostInCents: 903
      },
      {
        id: 19334,
        amount: 2,
        unit: 'tablespoons',
        name: 'brown sugar',
        costPerUnit: 559,
        totalCostInCents: 1118
      },
      {
        id: 11124,
        amount: 1,
        unit: 'cup',
        name: 'carrots',
        costPerUnit: 136,
        totalCostInCents: 136
      },
      {
        id: 2009,
        amount: 0.25,
        unit: 'teaspoon',
        name: 'red chili powder',
        costPerUnit: 499,
        totalCostInCents: 124.75
      },
      {
        id: 9079,
        amount: 0.33,
        unit: 'cup',
        name: 'dried cranberries',
        costPerUnit: 921,
        totalCostInCents: 303.93
      },
      {
        id: 11165,
        amount: 0.25,
        unit: 'cup',
        name: 'cilantro',
        costPerUnit: 159,
        totalCostInCents: 39.75
      },
      {
        id: 11215,
        amount: 3,
        unit: '',
        name: 'whole garlic clove',
        costPerUnit: 220,
        totalCostInCents: 660
      },
      {
        id: 1002014,
        amount: 0.5,
        unit: 'teaspoon',
        name: 'comino',
        costPerUnit: 547,
        totalCostInCents: 273.5
      },
      {
        id: 2042,
        amount: 0.5,
        unit: 'teaspoon',
        name: 'dried thyme',
        costPerUnit: 307,
        totalCostInCents: 153.5
      },
      {
        id: 11935,
        amount: 2,
        unit: 'tablespoons',
        name: 'catsup',
        costPerUnit: 666,
        totalCostInCents: 1332
      },
      {
        id: 4053,
        amount: 2,
        unit: 'tablespoon',
        name: 'pure olive oil',
        costPerUnit: 705,
        totalCostInCents: 1410
      },
      {
        id: 11282,
        amount: 1,
        unit: 'cup',
        name: 'onions',
        costPerUnit: 439,
        totalCostInCents: 439
      },
      {
        id: 12151,
        amount: 0.5,
        unit: 'cup',
        name: 'pistachio',
        costPerUnit: 813,
        totalCostInCents: 406.5
      },
      {
        id: 11821,
        amount: 1,
        unit: 'cup',
        name: 'red sweet peppers',
        costPerUnit: 1027,
        totalCostInCents: 1027
      },
      {
        id: 1102047,
        amount: 8,
        unit: 'servings',
        name: 's&p',
        costPerUnit: 524,
        totalCostInCents: 4192
      },
      {
        id: 6615,
        amount: 3,
        unit: 'cups',
        name: 'vegetable stock',
        costPerUnit: 613,
        totalCostInCents: 1839
      }
    ]);

    expect(goodResultUser2).to.deep.equal([]);
  });
});
