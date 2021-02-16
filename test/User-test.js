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

  });

  it('should remove ingredients from pantry', function() {

  });
  
});
