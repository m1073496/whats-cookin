const chai = require('chai');
const expect = chai.expect;

const Ingredient = require('../src/Ingredient');

describe('Ingredient', function() {

  it('should be a function', function() {
    const ingredient = new Ingredient();
    expect(ingredient).to.be.a('function');
  });

  it('should create an instance of an Ingredient', function() {
    const ingredient = new Ingredient();
    expect(ingredient).to.be.an.instanceOf(Ingredient);
  });





});
