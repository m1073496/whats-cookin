const { ingredientsData } = require('../data/ingredients');
class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.name = recipe.name;
    this.tags = recipe.tags;
  }

  returnInstructions() {
    return this.instructions;
  }

  getIngredientIds() {
    const ingredientIds = this.ingredients.map(ingredient => {
      return ingredient.id;
    });

    return ingredientIds;
  }

  getIngredientNames() {
    const ingredientIds = this.getIngredientIds();

    const names = ingredientIds.map(ingredientId => {
      const match = ingredientsData.find(ingredient => {
        return ingredient.id === ingredientId
      });
      return match.name;
    });

    return names;
  }

  getIngredientsCost() {
    const ingredientIds = this.getIngredientIds();

    const prices = ingredientIds.map(ingredientId => {
      const match = ingredientsData.find(ingredient => {
        return ingredient.id === ingredientId
      });
      return match.estimatedCostInCents;
    });

    const totalCost = prices.reduce((total, price) => {
      return total += price;
    }, 0);

    return totalCost;
  }
}

module.exports = Recipe;