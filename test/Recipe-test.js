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

  it('should create ingredients with desired properties', function() {
    const sampleIngs = recipe.createIngredients(testRecipeData[0].ingredients);
    const sampleIng0 = sampleIngs[0];
    const sampleIng1 = sampleIngs[1];

    expect(sampleIng0.id).to.equal(9019);
    expect(sampleIng0.amount).to.equal(2);
    expect(sampleIng0.unit).to.equal('tablespoons');
    expect(sampleIng0.name).to.equal('unsweetened apple sauce');
    expect(sampleIng0.costPerUnit).to.equal(154);
    expect(sampleIng0.totalCostInCents).to.equal(308);

    expect(sampleIng1.id).to.equal(18079);
    expect(sampleIng1.amount).to.equal(1);
    expect(sampleIng1.unit).to.equal('cup');
    expect(sampleIng1.name).to.equal('dry breadcrumbs');
    expect(sampleIng1.costPerUnit).to.equal(167);
    expect(sampleIng1.totalCostInCents).to.equal(167);
  });

  it('should have all ingredients', function() {
    expect(recipe.ingredients.length).to.equal(
      testRecipeData[0].ingredients.length
    );
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

  it('should be able to get ingredient attributes', function() {
    const sampleIngs = recipe.createIngredients(testRecipeData[0].ingredients);
    const sampleIng0 = sampleIngs[0];
    const sampleIng1 = sampleIngs[1];

    const name0 = recipe.getIngredientAttribute(sampleIng0.id, 'name');
    const cost0 = recipe.getIngredientAttribute(sampleIng0.id, 'estimatedCostInCents');
    const name1 = recipe.getIngredientAttribute(sampleIng1.id, 'name');
    const cost1 = recipe.getIngredientAttribute(sampleIng1.id, 'estimatedCostInCents');

    expect(name0).to.equal('unsweetened apple sauce');
    expect(cost0).to.equal(154);
    expect(name1).to.equal('dry breadcrumbs');
    expect(cost1).to.equal(167);
  });

  it('should be able calculate the cost of its ingredients', function() {
    const total = recipe.getTotalCost();

    expect(total).to.equal(14836);
  });
});