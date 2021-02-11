const { ingredientsData } = require('../data/ingredients');
class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.image = recipe.image;
    this.ingredients = this.createIngredients(recipe.ingredients);
    this.instructions = recipe.instructions;
    this.name = recipe.name;
    this.tags = recipe.tags;
  }

  createIngredients(ingredients) {
    const fancyIngredients = ingredients.map(ingredient => {
      const fancyIngredient = {
        id: ingredient.id,
        amount: ingredient.quantity.amount,
        unit: ingredient.quantity.unit,
      };
      fancyIngredient.name = this.getIngredientAttribute(
        fancyIngredient.id, 
        'name'
      ); 
      fancyIngredient.costPerUnit = this.getIngredientAttribute(
        fancyIngredient.id, 
        'estimatedCostInCents'
      );
      fancyIngredient.totalCostInCents = 
        fancyIngredient.amount * fancyIngredient.costPerUnit;

      return fancyIngredient;
    });

    return fancyIngredients;
  }

  getIngredientAttribute(id, attribute) {
    const match = ingredientsData.find(ingredient => {
      return ingredient.id === id;
    });

    return match[attribute];
  }

  getTotalCost() {
    let sum = 0;

    this.ingredients.forEach(ingredient => {
      sum += ingredient.amount * ingredient.costPerUnit;
    });

    return sum;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Recipe;
}