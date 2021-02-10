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

  getIngredientAttribute(attribute) {
    const ingredientIds = this.getIngredientIds();

    const attributes = ingredientIds.map(ingredientId => {
      const match = ingredientsData.find(ingredient => {
        return ingredient.id === ingredientId
      });
      return match[attribute];
    });

    return attributes;
  }

  getTotalCost() {
    const ingredientPrices = this.getIngredientAttribute(estimatedCostInCents);
    const ingredientQuantities = this.ingredients(estimatedCostInCents);

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