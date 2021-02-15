const chai = require('chai');
const expect = chai.expect;

const User = require('../src/User');
const RecipeRepository = require('../src/RecipeRepository');
const Recipe = require('../src/Recipe');

const {
  testUsersData,
  testRecipeData
} = require('../data/test-data');

// const User = require('../src/User');
// const RecipeRepository = require('../src/RecipeRepository');
// const Recipe = require('../src/Recipe');

describe('User', function() {
  let user1;
  let user2;
  let recipeRepository;

  beforeEach(function() {
    user1 = new User(testUsersData[0]);
    user2 = new User(testUsersData[1]);
    recipeRepository = new RecipeRepository(testRecipeData);
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
    user2.updateFavorites(recipeRepository.recipes[0]);

    expect(user2.favoriteRecipes[0]).to.be.an.instanceOf(Recipe);
    expect(user2.favoriteRecipes.length).to.equal(1);
    expect(user2.favoriteRecipes[0]).to.deep.equal(recipeRepository.recipes[0]);

    user2.updateFavorites(recipeRepository.recipes[1]);
    expect(user2.favoriteRecipes.length).to.equal(2);
    expect(user2.favoriteRecipes[1]).to.deep.equal(recipeRepository.recipes[1]);
    expect(user2.favoriteRecipes).to.deep.equal([recipeRepository.recipes[0], recipeRepository.recipes[1]]);
  });

  it('should remove recipes from list of favorites', function() {
    user2.updateFavorites(recipeRepository.recipes[0]);
    user2.updateFavorites(recipeRepository.recipes[1]);
    user2.updateFavorites(recipeRepository.recipes[0]);

    expect(user2.favoriteRecipes.length).to.equal(1);
    expect(user2.favoriteRecipes[0]).to.deep.equal(recipeRepository.recipes[1]);
    expect(user2.favoriteRecipes).to.deep.equal([recipeRepository.recipes[1]]);
  });

  it('should add recipes to `recipes to cook` list', function() {
    user1.updateCookList(recipeRepository.recipes[0]);
    user1.updateCookList(recipeRepository.recipes[1]);

    expect(user1.recipesToCook.length).to.equal(2);
    expect(user1.recipesToCook[0]).to.deep.equal(recipeRepository[0]);
    expect(user1.favoriteRecipes[0]).to.be.an.instanceOf(Recipe);
  });

  it('should remove recipes from `recipes to cook` list', function() {
    user1.updateCookList(recipeRepository.recipes[0]);
    user1.updateCookList(recipeRepository.recipes[1]);
    user1.updateCookList(recipeRepository[1]);

    expect(user1.recipesToCook.length).to.equal(1);
    expect(user1.favoriteRecipes[0]).to.deep.equal(recipeRepository.recipes[0]);
    expect(user1.favoriteRecipes).to.deep.equal([recipeRepository.recipes[0]]);
  });

  it('should filter favorite recipes by tags', function() {
    user2.updateFavorites(recipeRepository.recipes[0]);
    user2.updateFavorites(recipeRepository.recipes[1]);
    let firstResult = user2.filterFavorites('sauce');
    let secondResult = user2.filterFavorites('side dish');

    expect(firstResult.length).to.equal(1);
    expect(firstResult).to.deep.equal(recipeRepository.recipes[1]);

    expect(secondResult.length).to.equal(2);
    expect(secondResult).to.deep.equal([recipeRepository.recipes[0], recipeRepository.recipes[1]]);
  });

  it('should filter favorite recipes by name/ingredient using a search term', function() {
    user1.updateFavorites(recipeRepository.recipes[0]);
    user1.updateFavorites(recipeRepository.recipes[2]);
    let firstResult = user1.filterFavorites('vegan lentil loaf');
    let secondResult = user1.filterFavorites('lentil');
    let thirdResult = user1.filterFavorites('s&p');

    expect(firstResult.length).to.equal(1);
    expect(firstResult).to.dep.equal(recipeRepository.recipes[0]);

    expect(secondResult.length).to.equal(1);
    expect(firstResult).to.dep.equal(recipeRepository.recipes[0]);

    expect(thirdResult.length).to.equal(2);
    expect(firstResult).to.dep.equal([recipeRepository.recipes[0], recipeRepository.recipes[2]])
  });
});
