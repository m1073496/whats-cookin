const chai = require('chai');
const expect = chai.expect;

const { RecipeData } = require('../data/recipes');
const RecipeRepository = require('../src/RecipeRepository');

describe('RecipeRepository', () => {

  let recipeRepository;

  beforeEach(() => {
    recipeRepository = new RecipeRepository()
  })

  it('should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
    expect(recipeRepository).to.exist;
  })

})
