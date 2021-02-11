const chai = require('chai');
const expect = chai.expect;

const { 
  testRecipeData, 
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

  // TODO change this so it checks that ingredients exist
  // TODO then further down check that ingredients match what we expect
  it.skip('should have ingredients', function() {
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

  it.skip('should create an ingredients object', function() {
    const ingredients = recipe.createIngredients(testRecipeData[0].ingredients);

    expect(recipe.ingredients).to.deep.equal(ingredients);
  });

  it('should be able to return the names of its ingredients', function() {
    const allTestNames = testIngredientsData.map(ingredient => {
      return ingredient.name;
    });
    const testNames = allTestNames.slice(0, 18);

    const names = recipe.ingredients.map(ingredient => {
      return ingredient.name;
    });

    expect(names).to.deep.equal(testNames);
  });

  it('should be able calculate the cost of its ingredients', function() {
    const total = recipe.getTotalCost();

    expect(total).to.equal(14836);
  });
});