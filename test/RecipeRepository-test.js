const chai = require('chai');
const expect = chai.expect;

const { testRecipeData } = require('../data/test-data');
const RecipeRepository = require('../src/RecipeRepository');

describe('RecipeRepository', () => {
  let recipeRepository;

  beforeEach(() => {
    recipeRepository = new RecipeRepository(testRecipeData)
  });

  it('should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
    expect(recipeRepository).to.exist;
  });

  it('should filter tags using a search term', () => {
    expect(recipeRepository.filterByTag('side dish').length).to.equal(2)
  });

  it('should have no length when tag filter returns no results', () => {
    expect(recipeRepository.filterByTag('midnight snack').length).to.equal(0)
  });

  it('should filter ingredients using a search term', () => {
    expect(recipeRepository.filterByIngredient('onions').length).to.equal(2)

  });

  it.only('should have no length when ingredient filter returns no results', () => {
    expect(recipeRepository.filterByIngredient('chocolate').length).to.equal(0)
  });

});
