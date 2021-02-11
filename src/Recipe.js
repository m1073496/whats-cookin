const { ingredientsData } = require('../data/ingredients');
class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.image = recipe.image;
    // this.ingredients = recipe.ingredients;
    this.ingredients = this.createIngredients(recipe.ingredients);
    this.instructions = recipe.instructions;
    this.name = recipe.name;
    this.tags = recipe.tags;
  }

  getIngredientIds() {
    const ingredientIds = this.ingredients.map(ingredient => {
      return ingredient.id;
    });

    return ingredientIds;
  }

  getIngredientAttribute(id, attribute) {
    const match = ingredientsData.find(ingredient => {
      return ingredient.id === id;
    });

    return match[attribute];
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

  

  // getTotalCost() {
  //   const ingredientPrices = this.getIngredientAttribute(estimatedCostInCents);
  //   const ingredientQuantities = this.ingredients.map(ingredient => {
  //     return ingredient.quantity;
  //   });

  //   // const prices = ingredientIds.map(ingredientId => {
  //   //   const match = ingredientsData.find(ingredient => {
  //   //     return ingredient.id === ingredientId;
  //   //   });
  //   //   return match.estimatedCostInCents;
  //   // });

  //   const totalCost = prices.reduce((total, price) => {
  //     return total += price;
  //   }, 0);

  //   return totalCost;
  // }
}

module.exports = Recipe;