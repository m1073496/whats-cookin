const chai = require('chai');
const expect = chai.expect;

const User = require('../src/User');
const RecipeRepository = require('../src/RecipeRepository');
const Recipe = require('../src/Recipe');

const {
  testUsersData,
  testRecipeData
} = require('../data/test-data');

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
    expect(thirdResult.recipes).to.deep.equal([recipeRepository.recipes[0], recipeRepository.recipes[2]])
  });

  it('should determine missing ingredients needed to cook recipe', function() {
    let badResultUser1 = user1.findMissingIngredients(recipes[1]);
    let goodResultUser1 = user1.findMissingIngredients(recipes[0]);

    let badResultUser2 = user2.findMissingIngredients(recipes[0]);
    let goodResultUser2 = user1.findMissingIngredients(recipes[1]);

    expect(badResultUser1).to.equal([
      {  "id": 6150,
       "quantity": {
         "amount": 1,
         "unit": "cup"
       }
     },
     {
       "id": 6194,
       "quantity": {
         "amount": 1,
         "unit": "cup"
       }
     },
     {
       "id": 93627,
       "quantity": {
         "amount": 3,
         "unit": "tbsp"
       }
     },
     {
       "id": 2028,
       "quantity": {
         "amount": 8,
         "unit": "servings"
       }
     },
     {
       "id": 10072,
       "quantity": {
         "amount": 6,
         "unit": "lbs"
       }
     },
     {
       "id": 6971,
       "quantity": {
         "amount": 2,
         "unit": "tbsp"
       }
     }
    ]);
    expect(goodResultUser1).to.equal([
      {
        "id": 9019,
        "quantity": {
          "amount": 2,
          "unit": "tablespoons"
        }
      },
      {
        "id": 18079,
        "quantity": {
          "amount": 1,
          "unit": "cup"
        }
      },
      {
        "id": 16069,
        "quantity": {
          "amount": 1,
          "unit": "cup"
        }
      },
      {
        "id": 19334,
        "quantity": {
          "amount": 2,
          "unit": "tablespoons"
        }
      },
      {
        "id": 11124,
        "quantity": {
          "amount": 1,
          "unit": "cup"
        }
      },
      {
        "id": 2009,
        "quantity": {
          "amount": 0.25,
          "unit": "teaspoon"
        }
      },
      {
        "id": 9079,
        "quantity": {
          "amount": 0.3333333333333333,
          "unit": "cup"
        }
      },
      {
        "id": 11165,
        "quantity": {
          "amount": 0.25,
          "unit": "cup"
        }
      },
      {
        "id": 11215,
        "quantity": {
          "amount": 3,
          "unit": ""
        }
      },
      {
        "id": 1002014,
        "quantity": {
          "amount": 0.5,
          "unit": "teaspoon"
        }
      },
      {
        "id": 2042,
        "quantity": {
          "amount": 0.5,
          "unit": "teaspoon"
        }
      },
      {
        "id": 11935,
        "quantity": {
          "amount": 2,
          "unit": "tablespoons"
        }
      },
      {
        "id": 4053,
        "quantity": {
          "amount": 2,
          "unit": "tablespoon"
        }
      },
      {
        "id": 11282,
        "quantity": {
          "amount": 1,
          "unit": "cup"
        }
      },
      {
        "id": 12151,
        "quantity": {
          "amount": 0.5,
          "unit": "cup"
        }
      },
      {
        "id": 11821,
        "quantity": {
          "amount": 1,
          "unit": "cup"
        }
      },
      {
        "id": 1102047,
        "quantity": {
          "amount": 8,
          "unit": "servings"
        }
      },
      {
        "id": 6615,
        "quantity": {
          "amount": 3,
          "unit": "cups"
        }
      }
    ]);

    expect(badResultUser2).to.equal([
      {
       "id": 9019,
       "quantity": {
         "amount": 2,
         "unit": "tablespoons"
       }
     },
     {
       "id": 18079,
       "quantity": {
         "amount": 1,
         "unit": "cup"
       }
     },
     {
       "id": 16069,
       "quantity": {
         "amount": 1,
         "unit": "cup"
       }
     },
     {
       "id": 19334,
       "quantity": {
         "amount": 2,
         "unit": "tablespoons"
       }
     },
     {
       "id": 11124,
       "quantity": {
         "amount": 1,
         "unit": "cup"
       }
     },
     {
       "id": 2009,
       "quantity": {
         "amount": 0.25,
         "unit": "teaspoon"
       }
     },
     {
       "id": 9079,
       "quantity": {
         "amount": 0.3333333333333333,
         "unit": "cup"
       }
     },
     {
       "id": 11165,
       "quantity": {
         "amount": 0.25,
         "unit": "cup"
       }
     },
     {
       "id": 11215,
       "quantity": {
         "amount": 3,
         "unit": ""
       }
     },
     {
       "id": 1002014,
       "quantity": {
         "amount": 0.5,
         "unit": "teaspoon"
       }
     },
     {
       "id": 2042,
       "quantity": {
         "amount": 0.5,
         "unit": "teaspoon"
       }
     },
     {
       "id": 11935,
       "quantity": {
         "amount": 2,
         "unit": "tablespoons"
       }
     },
     {
       "id": 4053,
       "quantity": {
         "amount": 2,
         "unit": "tablespoon"
       }
     },
     {
       "id": 11282,
       "quantity": {
         "amount": 1,
         "unit": "cup"
       }
     },
     {
       "id": 12151,
       "quantity": {
         "amount": 0.5,
         "unit": "cup"
       }
     },
     {
       "id": 11821,
       "quantity": {
         "amount": 1,
         "unit": "cup"
       }
     },
     {
       "id": 1102047,
       "quantity": {
         "amount": 8,
         "unit": "servings"
       }
     },
     {
       "id": 6615,
       "quantity": {
         "amount": 3,
         "unit": "cups"
       }
    ]);
    expect(goodResultUser2).to.equal([
      {
        "id": 1001,
        "quantity": {
          "amount": 2,
          "unit": "tablespoons"
        }
      },
      {
        "id": 20027,
        "quantity": {
          "amount": 0.25,
          "unit": "cup"
        }
      },
      {
        "id": 1123,
        "quantity": {
          "amount": 1,
          "unit": ""
        }
      },
      {
        "id": 1125,
        "quantity": {
          "amount": 2,
          "unit": ""
        }
      },
      {
        "id": 1077,
        "quantity": {
          "amount": 2,
          "unit": "cups"
        }
      },
      {
        "id": 2050,
        "quantity": {
          "amount": 1,
          "unit": "teaspoon"
        }
      },
      {
        "id": 19335,
        "quantity": {
          "amount": 0.3333333333333333,
          "unit": "cup"
        }
      }
    ]);
  });

  it('should remove ingredients from pantry', function() {

  });

});
