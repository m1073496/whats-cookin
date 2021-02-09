const chai = require('chai');
const expect = chai.expect;

const { 
  testRecipeData, 
  testUsersData, 
  testIngredientsData 
} = require('../data/test-data');

const Recipe = require('../src/Recipe');

describe('Recipe', function() {
  let recipe;

  beforeEach(function() {
    recipe = new Recipe(testRecipeData[0]);
  });

  it('should be a function', function() {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of Recipe', function() {
    expect(recipe).to.be.an.instanceof(Recipe);
  }); 

  it('should have an id', function() {
    expect(recipe.id).to.equal(testRecipeData[0].id);
  });  

  it('should have an image', function() {
    expect(recipe.image).to.equal(testRecipeData[0].image);
  });  

  it('should have ingredients', function() {
    expect(recipe.ingredients).to.deep.equal(testRecipeData[0].ingredients);
  });

  it('should have instructions', function() {
    expect(recipe.instructions).to.deep.equal(testRecipeData[0].instructions);
  });

  it('should have a name', function() {
    expect(recipe.name).to.equal(testRecipeData[0].name);
  });

  it('should have tags', function() {
    expect(recipe.tags).to.deep.equal(testRecipeData[0].tags);
  });

  it('should be able to return its instructions', function() {
    expect(recipe.returnInstructions()).to.deep.equal(testRecipeData[0].instructions);
  });

  it('should be able calculate the cost of its ingredients', function() {
    const ingredients = testRecipeData[0].ingredients;

    // calculate total price so we know what the expected result is
    const ingredientIds = ingredients.map(ingredient => ingredient.id);
    // console.log(ingredientIds);
    const ingredientQuantities = ingredients.map(ingredient => ingredient.quantity.amount);
    // console.log(ingredientQuantities);
    
    const ingredientPrices = [];
    // for each ingredient in ingredientIds,
      // for each ingredient in the array of test ingredients
        // if ids match
          // put the ingredient price into the prices array
    ingredientIds.forEach(ingredientId => {
      testIngredientsData.forEach(testIngredient => {
        if (testIngredient.id === ingredientId) {
          ingredientPrices.push(testIngredient.estimatedCostInCents);
        }
      });

    });
    // console.log(ingredientPrices);

    const ingredientTotalCost = ingredientIds.reduce((total, ingredientId, index) => {
      total += ingredientQuantities[index] * ingredientPrices[index];
      return total;
    }, 0);

    // console.log(ingredientQuantities[0] * ingredientPrices[0]);
    // console.log(ingredientTotalCost);
    // // --> 14836

    expect(recipe.getIngredientsCost()).to.equal(14836);
  });
});