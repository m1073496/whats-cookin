const chai = require('chai');
const expect = chai.expect;

const testData = require('../data/test-data');
const testRecipeData = testData.testRecipeData;
const testUsersData = testData.testUsersData;
const testIngredientsData = testData.testIngredientsData;

const Recipe = require('../src/Recipe');

describe('Recipe', function() {
  let recipe;

  beforeEach(function() {
    // TODO fill in Recipe parameters
    recipe = new Recipe();
  });

  it('should be a function', function() {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of Recipe', function() {
    expect(recipe).to.be.an.instanceof(Recipe);
  }); 

  it('should have an id', function() {
    // TODO fill in with test data recipe id
    expect(recipe.id).to.equal();
  });  

  it('should have an image', function() {
    // TODO fill in with test data recipe image path
    expect(recipe.image).to.equal();
  });  

  it('should have ingredients', function() {
    // TODO fill in with test data recipe ingredients
    expect(recipe.ingredients).to.deep.equal();
  });

  it('should have instructions', function() {
    // TODO fill in with test data recipe instructions
    expect(recipe.instructions).to.deep.equal();
  });

  it('should have a name', function() {
    // TODO fill in with test data recipe name
    expect(recipe.name).to.equal();
  });

  it('should have tags', function() {
    // TODO fill in with test data recipe tags
    expect(recipe.tags).to.deep.equal();
  });
});