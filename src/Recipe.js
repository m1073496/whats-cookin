// const { ingredientsData } = require('../data/ingredients');
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
    const formatIngredients = ingredients.map(ingredient => {
      const formatIngredient = {
        id: ingredient.id,
        amount: Math.round(ingredient.quantity.amount * 100) / 100,
        unit: ingredient.quantity.unit,
      };
      formatIngredient.name = this.getIngredientData(
        formatIngredient.id,
        'name'
      );
      formatIngredient.costPerUnit = this.getIngredientData(
        formatIngredient.id,
        'estimatedCostInCents'
      );
      formatIngredient.totalCostInCents =
        formatIngredient.amount * formatIngredient.costPerUnit;

      return formatIngredient;
    });

    return formatIngredients;
  }

  getIngredientData(id, attribute) {
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
