const chai = require('chai');
const expect = chai.expect;

const { testIngredientsData } = require('../data/test-data.js');
const Ingredient = require('../src/Ingredient');

describe('Ingredient', function() {

  it('should be a function', function() {
    expect(Ingredient).to.be.a('function');
  });

  it('should create an instance of an Ingredient', function() {
    const ingredient = new Ingredient(testIngredientsData[5]);
    expect(ingredient).to.be.an.instanceOf(Ingredient);
  });

  it('should have an ID', function() {
    const ingredient = new Ingredient(testIngredientsData[0]);
    expect(ingredient.id).to.equal(9019);
  });

  it('should have a name', function() {
    const ingredient = new Ingredient(testIngredientsData[1]);
    expect(ingredient.name).to.equal('dry breadcrumbs');
  });

  it('should have an estimated cost in cents', function() {
    const ingredient = new Ingredient(testIngredientsData[2]);
    expect(ingredient.estimatedCostInCents).to.equal(903);
  });
});
