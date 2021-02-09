const chai = require('chai');
const expect = chai.expect;

const { testRecipeData, testUsersData, testIngredientsData } = require('../data/test-data');

const Recipe = require('../src/Recipe');

describe('Recipe', function() {
  let recipe;

  beforeEach(function() {
    recipe = new Recipe(
      testRecipeData[0].id, 
      testRecipeData[0].image, 
      testRecipeData[0].ingredients, 
      testRecipeData[0].instructions, 
      testRecipeData[0].name, 
      testRecipeData[0].tags, 
    );
  });

  it('should be a function', function() {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of Recipe', function() {
    expect(recipe).to.be.an.instanceof(Recipe);
  }); 

  // TODO get this to run -- issue with test export/import?
  it('should have an id', function() {
    console.log(recipe.id);
    expect(recipe.id).to.equal(testRecipeData[0].id);
  });  

  it.skip('should have an image', function() {
    expect(recipe.image).to.equal(testRecipeData[0].image);
  });  

  it.skip('should have ingredients', function() {
    expect(recipe.ingredients).to.deep.equal(testRecipeData[0].ingredients);
  });

  it.skip('should have instructions', function() {
    expect(recipe.instructions).to.deep.equal(testRecipeData[0].instructions);
  });

  it.skip('should have a name', function() {
    expect(recipe.name).to.equal(testRecipeData[0].name);
  });

  it.skip('should have tags', function() {
    expect(recipe.tags).to.deep.equal(testRecipeData[0].tags);
  });
});